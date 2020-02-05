from flask import jsonify
from flask import request
from app.models import User, Idea
from app import app

@app.route('/')
@app.route('/index')
def index():
    return '<h1>IDeas Table Backed</h1>'

@app.route('/api/user/<number>')
def get_user(number):
    user = User.query.get(number)
    result = jsonify(
        id=user.id,
        username=user.username,
        email=user.email
    )
    return result, {'Content-Type': 'application/json'}

@app.route('/api/idea/<number>')
def get_idea(number):
    idea = Idea.query.get(number)
    result = jsonify(
        id=idea.id,
        user_id=idea.user_id,
        title=idea.title,
        timestamp=idea.timestamp,
        category=idea.category,
        body=idea.body
    )
    return result, {'Content-Type': 'application/json'}