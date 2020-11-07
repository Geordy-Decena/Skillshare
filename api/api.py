from flask import Flask, request

app = Flask(__name__)

from flask_cors import CORS
import urllib.request

@app.route('/loginData', methods=['GET', 'POST'])
def login():
    data = request
    return{
        'test': str(data),
    }
