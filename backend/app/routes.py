from flask import jsonify, json, request
from app.models import User, Idea
from app import db
from app import app

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
    return '<h1>IDeas Table Backed</h1>'

@app.route('/api/users/<number>', methods=['GET'])
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

@app.route('/api/ideas/<number>', methods=['GET'])
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

@app.route('/api/ideas/<number>', methods=['POST'])
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

@app.route('/api/ideas', methods=['GET'])
def get_ideas():
    ideas = Idea.query.all()
    jsonStr = ''
    ideasList = []

    try:
        for idea in ideas:
            tempDict = create_idea_dictionary(idea)
            ideasList.append(tempDict)
        
        # Convert to json data
        jsonStr = json.dumps(ideasList)

    except Exception as err:
        print("Get ideas error: {0}".format(err))

    return jsonify(jsonStr)

@app.route('/api/ideas', methods=['POST'])
def create_idea():
    data = request.get_json()
    idea_user_id = 1
    idea_title = 'New Idea'

    if 'user_id' in data:
        idea_user_id = data['user_id']
    if 'title' in data:
        idea_title = data['title']

    idea = Idea(
        user_id = idea_user_id,
        title = idea_title,
        category = '',
        body = '')

    db.session.add(idea)
    db.session.commit()

    return convert_idea_to_json(idea)

@app.route('/api/ideas/<number>', methods=['DELETE'])
def delete_idea(number):
    Idea.query.filter_by(id=number).delete()
    db.session.commit()

    return {}

########### Free Functions ############
def convert_idea_to_json(idea):
    ideaJson = ''
    try:
        ideaDict = create_idea_dictionary(idea)
        ideaJson = json.dumps(ideaDict)

    except Exception as err:
        print("Get create_idea error: {0}".format(err))

    return jsonify(ideaJson)

def create_idea_dictionary(idea):
    return {
        'id' : idea.id,
        'user_id' : idea.user_id,
        'title' : idea.title,
        'timestamp' : idea.timestamp,
        'category' : idea.category,
        'body' : idea.body
    }

