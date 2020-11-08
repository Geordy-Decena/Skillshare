import json
import urllib.request
from flask_cors import CORS
from flask import Flask, request

# RESET AFTER!!
activeIndex = -1
matchedIndex = -1
userCount = 0
userList = []
testUserCount = 4
testUserList = []
SelectedSkill = "None"


class user:

    def __init__(self, email, password):
        self.email = email
        self.password = password
        self.learn = []
        self.teach = []
        self.skillLearnCount = 0
        self.skillTeachCount = 0

    def learnSkillArr(self):
        allSkills = []
        for i in range(self.skillLearnCount):
            allSkills.append(self.learn[i][0])
        return allSkills

    def learnSkillLvlArr(self):
        allLvls = []
        for i in range(self.skillLearnCount):
            # print(i)
            # print(userList[activeIndex].learn[i][1])
            allLvls.append(self.learn[i][1])
        return allLvls

    def teachSkillArr(self):
        allSkills = []
        for i in range(self.skillTeachCount):
            allSkills.append(self.teach[i][0])
        return allSkills

    def teachSkillLvlArr(self):
        allLvls = []
        for i in range(self.skillTeachCount):
            allLvls.append(self.teach[i][1])
        return allLvls


testEmail = ["john@gmail.com", "doe@gmail.com",
             "Shirley@gmail.com", "lol@gmail.com"]
testPassword = ["1234", "abcd", "easyAs", "lol"]
testLSkills = [["Geography", 7], ["History", 3],
               ["Biology", 1], ["JavaScript", 4]]
testTSkills = [["History", 5], ["React", 3], ["Physics", 6], ["Chemistry", 8]]

for i in range(testUserCount):
    testUserList.append(user(testEmail[i], testPassword[i]))
    testUserList[i].learn.append(testLSkills[i])
    testUserList[i].teach.append(testTSkills[i])
    testUserList[i].skillLearnCount += 1
    testUserList[i].skillTeachCount += 1

app = Flask(__name__)


@app.route('/loginData', methods=['GET', 'POST'])
def loginData():
    global activeIndex
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    if(indexOfEmail(email) != -1 and userList[indexOfEmail(email)].password == password):
        activeIndex = indexOfEmail(email)
        return{'auth': str(1)}
    else:
        return{
            'auth': str(0)
        }


@app.route('/registerData', methods=['GET', 'POST'])
def registerData():
    global userCount
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    if(indexOfEmail(email) != -1):
        return{'auth': str(0)}
    else:
        userList.append(user(email, password))
        userCount += 1
        return{'auth': str(1)}


@app.route('/userDataLearn', methods=['GET', 'POST'])
def userDataLearn():
    global activeIndex
    data = request.get_json()
    skill = data["skill"]
    level = data["level"]
    userList[activeIndex].learn.append([skill, level])
    userList[activeIndex].skillLearnCount += 1
    print("ACTIVE USER IS")
    print(activeIndex)
    print(userList[activeIndex].email)
    print(userList[activeIndex].learn[0][0])
    return{
        'levels': userList[activeIndex].learnSkillLvlArr(),
        'skills': userList[activeIndex].learnSkillArr()
    }


@app.route('/userDataTeach', methods=['GET', 'POST'])
def userDataTeach():
    global activeIndex
    data = request.get_json()
    skill = data["skill"]
    level = data["level"]
    userList[activeIndex].teach.append([skill, level])
    userList[activeIndex].skillTeachCount += 1
    return{
        'levels': userList[activeIndex].teachSkillLvlArr(),
        'skills': userList[activeIndex].teachSkillArr()
    }


@app.route('/computeMatch', methods=['GET', 'POST'])
def computeMatch():
    global activeIndex
    global matchedIndex
    global SelectedSkill
    matchedIndex = -1

    #match = "not found"
    #didWork = False
    data = request.get_json()
    skillToLearn = data["skill"]

    skillToTeach = "DID NOT WORK"
    #level = data["level"]
    # DOESNT CHECK IF MATCH WANT TO LEARN WHAT THE USER CAN TEACH
    for i in range(testUserCount):
        if(indexOfTeach(testUserList[i], skillToLearn) != -1):
            matchedIndex = i
            common = list(set(userList[activeIndex].teachSkillArr()).intersection(
                testUserList[i].learnSkillArr()))
            skillToTeach = common[0]

    matchUser = testUserList[matchedIndex].email
    # if(matchedIndex != -1):
    #didWork = True
    #matchUser = testUserList[matchedIndex].email

    print("Yah it ran")
    print(testUserList[matchedIndex].email)
    SelectedSkill = skillToLearn

    return{
        # 'found': str(didWork),
        'user': userList[activeIndex].email,
        'userSkillLevel': userList[activeIndex].learn[indexOfLearn(userList[activeIndex], skillToLearn)][1],
        'matchedUser': matchUser,
        'matchedUserSkill': skillToTeach,
        'matchedUserSkillLevel': testUserList[matchedIndex].learn[indexOfLearn(testUserList[matchedIndex], skillToTeach)][1]

    }


# Figure out how to hold ratings for a user's skill
@app.route('/userRatings', methods=['GET', 'POST'])
def userRatings():
    global userCount
    data = request.get_json()
    rating = data["rating"]
    userList[activeIndex].learn[indexOfLearn(userList[activeIndex], SelectedSkill)][1] = (
        userList[activeIndex].learn[indexOfLearn(userList[activeIndex], SelectedSkill)][1] + rating)/2


@app.route('/userName', methods=['GET', 'POST'])
def userName():
    return{
        'match': userList[matchedIndex]
    }


@app.route('/sendLearnData', methods=['GET', 'POST'])
def sendLearnData():
    return{
        'levels': userList[activeIndex].learnSkillLvlArr(),
        'skills': userList[activeIndex].learnSkillArr()
    }


@app.route('/sendTeachData', methods=['GET', 'POST'])
def sendTeachData():
    return{
        'levels': userList[activeIndex].teachSkillLvlArr(),
        'skills': userList[activeIndex].teachSkillArr()
    }


def indexOfEmail(email):
    global userCount
    for i in range(userCount):
        if(userList[i].email == email):
            return i

    return -1


def indexOfTeach(usar, skill):
    for i in range(usar.skillTeachCount):
        if(usar.teach[i][0] == skill):
            return i

    return -1


def indexOfLearn(usar, skill):
    for i in range(usar.skillLearnCount):
        if(usar.learn[i][0] == skill):
            return i

    return -1