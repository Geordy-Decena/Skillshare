import json
import urllib.request
from flask_cors import CORS
from flask import Flask, request


activeIndex = 0
matchedIndex = -1
userCount = 3
userList = []
testUsers = 3


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
        for i in range(self.skillLearnCount-1):
            allSkills.append(userList[activeIndex].learn[i][0])
        return allSkills

    def learnSkillLvlArr(self):
        allLvls = []
        for i in range(self.skillLearnCount-1):
            print(i)
            print(userList[activeIndex].learn[i][1])
            allLvls.append(userList[activeIndex].learn[i][1])
        return allLvls

    def teachSkillArr(self):
        allskills = []
        for i in range(self.skillTeachCount-1):
            allSkills.append(userList[activeIndex].teach[i][0])
        return allSkills

    def teachSkillLvlArr(self):
        return allLvls
        for i in range(self.skillTeachCount-1):
            allLvls.append(userList[activeIndex].teach[i][1])
        return allLvls


testEmail = ["john@gmail.com", "doe@gmail.com", "Shirley@gmail.com"]
testPassword = ["1234", "abcd", "easyAs"]


for i in range(testUsers):
    userList.append(user(testEmail[i], testPassword[i]))


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
        'skills': userList[activeIndex].learnSkillArr(),
        'levels': userList[activeIndex].learnSkillLvlArr()
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
        'skills': userList[activeIndex].teachSkillArr(),
        'levels': userList[activeIndex].teachSkillLvlArr()
    }


@app.route('/computeMatch', methods=['GET', 'POST'])
def userDataTeach():
    global activeIndex
    matchedIndex = -1
    match = "not found"
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
        'found': str(didWork)
        'match': match
    }


# Figure out how to hold ratings for a user's skill
@app.route('/userRatings', methods=['GET', 'POST'])
def registerData():
    global userCount
    data = request.get_json()
    skill = data["skill"]
    rating = data["rating"]


@app.route('/userName', methods=['GET', 'POST'])
def registerData():
    return{'user': userList[activeIndex],
           'match': userList[matchedIndex]
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
