# Ideas Table - Backend

Flask backend for Ideas Table web application.

# Commands
### Create environment
```bash
$ python3 -m venv venv  // Create Venv
$ (venv) source venv/bin/activate
$ (venv) pip install -r requirements.txt
```

### Create Database
```bash
$ flask shell
>>> from app import db
>>> db.create_all()
```

### Run backend app
```bash
$ (vevn) export FLASK_APP=app.py
$ flask run
```

### Database migrations
```bash
$ (venv) flask db migrate -m "users table"
$ (venv) flask db upgrade
```

### REST POST
```bash
$ curl -X POST -H 'Content-Type: application/json' http://127.0.0.1:5000/api/idea/1 -d '{"title": "New Title"}'
```
