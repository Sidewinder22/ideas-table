from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt import JWT
from config import Config

def authenticate(username, password):
    if not (username and password):
        return False

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return user
    
def identity(payload):
    user_id = payload['identity']
    return {"user_id": user_id}

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

jwt = JWT(app, authenticate, identity)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models
from app.models import User
