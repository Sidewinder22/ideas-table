from flask import Flask
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return '<h1>IDeas Table Backed</h1>'

@app.route('/api/users')
def example_data():
    result = jsonify(
        id='1',
        user='Sidewin',
        mail='sidewin@example.com'
    )
    return result, {'Content-Type': 'application/json'}