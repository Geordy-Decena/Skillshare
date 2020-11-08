import json
import urllib.request
from flask_cors import CORS
from flask import Flask, request

# RESET AFTER!!
activeIndex = 2
matchedIndex = 1
userCount = 4
userList = []


class user:
    learn = []
    teach = []
    skillLearnCount = 0
    skillTeachCount = 0

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def learnSkillArr(self):
        allSkills = []
        for i in range(self.skillLearnCount):
            allSkills.append(userList[activeIndex].learn[i][0])
        return allSkills

    def learnSkillLvlArr(self):
        allLvls = []
        for i in range(self.skillLearnCount):
            # print(i)
            # print(userList[activeIndex].learn[i][1])
            allLvls.append(userList[activeIndex].learn[i][1])
        return allLvls

    def teachSkillArr(self):
        allSkills = []
        for i in range(self.skillTeachCount):
            allSkills.append(userList[activeIndex].teach[i][0])
        return allSkills

    def teachSkillLvlArr(self):
        allLvls = []
        for i in range(self.skillTeachCount):
            allLvls.append(userList[activeIndex].teach[i][1])
        return allLvls


testEmail = ["john@gmail.com", "doe@gmail.com",
             "Shirley@gmail.com", "lol@gmail.com"]
testPassword = ["1234", "abcd", "easyAs", "lol"]
testLSkills = [["Geography", 7], ["Soccer", 3],
               ["Biology", 1], ["JavaScript", 4]]
testTSkills = [["History", 5], ["React", 3], ["Physics", 6], ["Chemistry", 8]]

for i in range(userCount):
    userList.append(user(testEmail[i], testPassword[i]))
    userList[i].learn.append(testLSkills[i])
    userList[i].teach.append(testTSkills[i])

app = Flask(__name__)


@app.route('/loginData', methods=['GET', 'POST'])
def loginData():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    if(indexOfEmail(email) != -1 and userList[indexOfEmail(email)].password == password):
        activeIndex = indexOfEmail(email)
        print(activeIndex)
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
        print(userList[0].email)

        return{'auth': str(1)}


@app.route('/userDataLearn', methods=['GET', 'POST'])
def userDataLearn():
    global activeIndex
    data = request.get_json()
    skill = data["skill"]
    level = data["level"]
    userList[activeIndex].learn.append([skill, level])
    userList[activeIndex].skillLearnCount += 1
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
    matchedIndex = -1
    match = "not found"
    didWork = False
    list(set(a).intersection(b))
    data = request.get_json()
    skillToLearn = data["skill"]
    #level = data["level"]
    # DOESNT CHECK IF MATCH WANT TO LEARN WHAT THE USER CAN TEACH
    for i in range(userCount):
        if(i != activeIndex and indexOfTeach(userList[i], skillToLearn) != -1):
            matchedIndex = i

    if(matchedIndex != -1):
        match = userList[matchIndex]

    return{
        'found': str(didWork),
        'match': match
    }


# Figure out how to hold ratings for a user's skill
@app.route('/userRatings', methods=['GET', 'POST'])
def userRatings():
    global userCount
    data = request.get_json()
    skill = data["skill"]
    rating = data["rating"]


@app.route('/userName', methods=['GET', 'POST'])
def userName():
    return{
        'user': userList[activeIndex],
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
        if(usar.teach[i] == skill):
            return i

    return -1


def indexOfLearn(usar, skill):
    for i in range(usar.skillLearnCount):
        if(usar.learn[i] == skill):
            return i

    return -1