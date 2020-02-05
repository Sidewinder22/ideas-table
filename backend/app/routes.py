from flask import jsonify, json, request
from app.models import User, Idea
from app import app

@app.route('/')
@app.route('/index')
def index():
    return '<h1>IDeas Table Backed</h1>'

@app.route('/api/user/<number>')
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

@app.route('/api/idea/<number>')
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

@app.route('/api/ideas')
def get_ideas():
    ideas = Idea.query.all()
    # jsonStr = ''
    ideasList = []

    for i in ideas:
        print(i.title)

    try:
        # ideasList = []

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
        #jsonStr = json.dumps(ideasList)

    except Exception as err:
        print("Get ideas error: {0}".format(err))

    # return jsonify(jsonStr)
    return jsonify(ideasList)