from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

application = Flask(__name__)
# application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/wad2project' #FOR WINDOW USERS
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/wad2project' #FOR MAC USERS
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
CORS(application)

class matched_users(db.Model):
    __tablename__ = 'matched_users'

    unique_id = db.Column(db.INT(), primary_key=True)
    name = db.Column(db.VARCHAR(255), nullable=False)
    message = db.Column(db.VARCHAR(200), nullable=False)
    lastonline = db.Column(db.VARCHAR(255), nullable=False)
    url = db.Column(db.VARCHAR(300), nullable=False)

    def __init__(self, unique_id, name, message, lastonline,url):
        self.unique_id = unique_id
        self.name = name
        self.message = message
        self.lastonline = lastonline
        self.url = url

    def json(self):
        return {"unique_id": self.unique_id, 
                "name": self.name, 
                "message": self.message, 
                "lastonline": self.lastonline,
                "url":self.url}

@application.route("/matched_users")
def get_all():
    return jsonify({"matched_users": [u.json() for u in matched_users.query.all()]})

if __name__ == '__main__':
    application.run(port=5003, debug=True)
