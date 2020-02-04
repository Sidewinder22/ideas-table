# Ideas Table - Backend

Flask

# Commands
$ python3 -m venv venv  // Create Venv

$ (venv) source venv/bin/activate

$ (venv) pip install Flask

$ (venv) pip install -U flask-cors

$ (venv) pip install sqlalchemy

$ (venv) pip install flask-migrate

$ (venv) pip install python-dotenv

### DataBase
$ (venv) flask db migrate -m "users table"
$ (venv) flask db upgrade

### Run
$ (vevn) export FLASK_APP=app.py
$ flask run
$ (flask shell) db.create_all()
