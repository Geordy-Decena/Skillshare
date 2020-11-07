import json
import urllib.request
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)

usernames = ["Ben", "GeordyIsABitch", "Yi Li"]
passwords = ["fkGeordy", "same", "theCarry"]


@app.route('/loginData', methods=['GET', 'POST'])
def login():
    data = request.get_json()
    email = data["email"])
    password=data["password"]
    return{
        'auth': 1
    }


@app.route('/registerData', methods=['GET', 'POST'])
def register():
