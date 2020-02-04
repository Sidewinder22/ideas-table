from flask import jsonify
from app.models import User
from app import app

@app.route('/')
@app.route('/index')
def index():
    return '<h1>IDeas Table Backed</h1>'

@app.route('/api/user/1')
def example_data():
    u = User.query.get(1)
    result = jsonify(
        # id='1',
        # user='Sidewin',
        # mail='sidewin@example.com'
        id=u.id,
        user=u.username,
        mail=u.email
    )
    return result, {'Content-Type': 'application/json'}