from flask import jsonify
from flask import request
from app.models import User
from app import app

@app.route('/')
@app.route('/index')
def index():
    return '<h1>IDeas Table Backed</h1>'

@app.route('/api/user/<number>')
def example_data(number):
    u = User.query.get(number)
    result = jsonify(
        id=u.id,
        user=u.username,
        mail=u.email
    )
    return result, {'Content-Type': 'application/json'}