import json
import urllib.request
from flask_cors import CORS
from flask import Flask, request


class user:
    learn = []
    teach = []
    skillLearnCount = 0
    skillTeachCount = 0

    def __init__(self, email, password):
        self.email = email
        self.password = password


activeIndex = 0
userCount = 0
userList = []
testUsers = 3

testEmail = ["john@gmail.com", "doe@gmail.com", "Shirley@gmail.com"]
testPassword = ["1234", "abcd", "easyAs", "lolsame"]


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
    userList[activeIndex].learn[userList[activeIndex].skillLearnCount].append([
        skill, level])
    userList[activeIndex].skillLearnCount += 1
    return{
        'skills': }


@app.route('/userDataTeach', methods=['GET', 'POST'])
def userDataTeach():
    global activeIndex
    data = request.get_json()
    skill = data["skill"]
    level = data["level"]
    userList[activeIndex].teach[userList[activeIndex].skillLearnCount].append([
        skill, level])
    userList[activeIndex].skillLearnCount += 1
    return


def indexOfEmail(email):
    global userCount
    for i in range(userCount):
        if(userList[i].email == email):
            return i

    return -1
