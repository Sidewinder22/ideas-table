from datetime import datetime
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    ideas = db.relationship('Idea', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Idea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(128))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    body = db.Column(db.Text)

    #category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    #category = db.relationship('Category', backref='ideas', lazy='dynamic')

    def __repr__(self):
        return '<Idea {}>'.format(self.title)

#class Category(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    name = db.Column(db.String(64), index=True, unique=True)

#    def __repr__(self):
#        return '<Category {}>'.format(self.name)
