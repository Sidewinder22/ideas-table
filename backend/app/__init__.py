from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from flask_jwt import JWT
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

# jwt = JWT(app, a)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models