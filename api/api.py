import json
import urllib.request
from flask_cors import CORS
from flask import Flask, request

import db
from flask import Flask
app = Flask(__name__)

emails = ["Ben", "GeordyIsABitch", "Yi Li"]
passwords = ["fkGeordy", "same", "theCarry"]


@app.route('/loginData', methods=['GET', 'POST'])
def login():
    data = request.get_json()
    email = data["email"]
    password=data["password"]
    if(email in emails and passwords[emails.index(email)] == password):
        return{'auth': str(1)}
    else:
        return{
            'auth': str(0)
        }


@app.route('/registerData', methods=['GET', 'POST'])
def register():
