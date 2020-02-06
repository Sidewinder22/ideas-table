from flask import jsonify, json, request
from app.models import User, Idea
from app import db
from app import app

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
    return '<h1>IDeas Table Backed</h1>'

@app.route('/api/user/<number>', methods=['GET'])
def get_user(number):
    user = User.query.get(number)
    if user is None:
        return {}
    result = jsonify(
        id=user.id,
        username=user.username,
        email=user.email
    )
    return result, {'Content-Type': 'application/json'}

@app.route('/api/idea/<number>', methods=['GET'])
def get_idea(number):
    idea = Idea.query.get(number)
    if idea is None:
        return {}
    result = jsonify(
        id=idea.id,
        user_id=idea.user_id,
        title=idea.title,
        timestamp=idea.timestamp,
        category=idea.category,
        body=idea.body
    )
    return result, {'Content-Type': 'application/json'}

@app.route('/api/ideas', methods=['GET'])
def get_ideas():
    ideas = Idea.query.all()
    jsonStr = ''
    ideasList = []

    try:
        for idea in ideas:
            tempDict = {
                'id' : idea.id,
                'user_id' : idea.user_id,
                'title' : idea.title,
                'timestamp' : idea.timestamp,
                'category' : idea.category,
                'body' : idea.body
            }
            ideasList.append(tempDict)
        
        # Convert to json data
        jsonStr = json.dumps(ideasList)

    except Exception as err:
        print("Get ideas error: {0}".format(err))

    return jsonify(jsonStr)

@app.route('/api/idea/<number>', methods=['POST'])
def edit_idea(number):
    data = request.get_json()
    idea = Idea.query.get(number)

    if 'title' in data:
        idea.title = data['title']
    elif 'category' in data:
        idea.category = data['category']
    elif 'body' in data:
        idea.body = data['body']

    db.session.add(idea)
    db.session.commit()

    return jsonify(data)