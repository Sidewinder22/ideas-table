from flask import jsonify
from app import app

@app.route('/')
@app.route('/index')
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