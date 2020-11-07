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

app = Flask(__name__)

emails = ["Ben", "GeordyIsABitch", "Yi Li"]
passwords = ["fkGeordy", "same", "theCarry"]


@app.route('/loginData', methods=['GET', 'POST'])
def loginData():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    if(email in emails and passwords[emails.index(email)] == password):
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
    if(email in emails):
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
    userList.learn[userList[activeIndex].skillLearnCount].append([
        skill, level])
    userList[activeIndex].skillLearnCount += 1
    return{}
