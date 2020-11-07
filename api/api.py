from flask import Flask

app = Flask(__name__)


@app.route('/api', methods=['GET'])
def api():
    return {
        # sends data to react
    }
