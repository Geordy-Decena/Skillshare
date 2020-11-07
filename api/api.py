from flask import Flask, request

import db
from flask import Flask
app = Flask(__name__)

from flask_cors import CORS
import urllib.request

@app.route('/loginData', methods=['GET', 'POST'])
def loginData():
    data = request.json
    print(data)
    return{
        'user_info' : str(data)
    }


