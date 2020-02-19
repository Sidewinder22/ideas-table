from flask import jsonify, json, request, session
from flask_jwt import jwt_required, current_identity
from app.models import User, Idea
from app import db
from app import app

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
    return '<h1>IDeas Table</h1>'

@app.route('/api/user', methods=['GET'])
@jwt_required()
def get_user():
    username = request.args.get('username')
    user = User.query.filter_by(username=username).first()
    return create_user_json(user)

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()

    if User.query.filter_by(username=data['username']).first():
        response = {"response": "Username already used"}
    elif User.query.filter_by(email=data['email']).first():
        response = {"response": "Email already used"}
    else:
        user = User(username=data['username'],
            email=data['email'])
        user.set_password(data['password'])

        db.session.add(user)
        db.session.commit()

        response = {"response": "ok"}

    result = json.dumps(response)
    return jsonify(result)

@app.route('/api/users/<number>', methods=['GET'])
@jwt_required()
def get_users(number):
    user = User.query.get(number)
    return create_user_json(user)

@app.route('/api/users/<number>', methods=['DELETE'])
@jwt_required()
def delete_user(number):
    User.query.filter_by(id=number).delete()
    db.session.commit()

    try:
        idDict = {'id': number}
        result = json.dumps(idDict)
    except Exception as err:
        print("Get delete_idea error: {0}".format(err))

    return jsonify(result)

@app.route('/api/ideas/<number>', methods=['GET'])
@jwt_required()
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
@jwt_required()
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
@jwt_required()
def get_ideas():
    category = request.args.get('category')

    ideas = []
    if category:
        ideas = Idea.query.filter_by(category = category)
    else:
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

@app.route('/api/categories', methods=['GET'])
@jwt_required()
def get_categories():
    ideas = Idea.query.all()
    jsonStr = ''
    categorySet = set()

    try:
        for idea in ideas:
            categorySet.add(idea.category)

        tempDict = {}
        tempList = []
        for element in categorySet:
            tempList.append(element)

        tempDict['categories'] = tempList
        jsonStr = json.dumps(tempList)

    except Exception as err:
        print("Get categories error: {0}".format(err))

    return jsonify(jsonStr)

@app.route('/api/ideas', methods=['POST'])
@jwt_required()
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
@jwt_required()
def delete_idea(number):
    Idea.query.filter_by(id=number).delete()
    db.session.commit()

    try:
        idDict = {'id': number}
        result = json.dumps(idDict)
    except Exception as err:
        print("Get delete_idea error: {0}".format(err))

    return jsonify(result)

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

def create_user_json(user):
    if user is None:
            return {}
    result = jsonify(
        id=user.id,
        username=user.username,
        email=user.email
    )
    return result, {'Content-Type': 'application/json'}

