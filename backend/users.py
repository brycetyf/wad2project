from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/wad2project' # TO BE CHANGED
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
CORS(application)


class User(db.Model):
    __tablename__ = 'users'

    username = db.Column(db.VARCHAR(100), primary_key=True)
    name = db.Column(db.VARCHAR(255), nullable=False)
    url = db.Column(db.VARCHAR(300), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    description = db.Column(db.VARCHAR(999), nullable=False)
    ghostRating = db.Column(db.Integer, nullable=False)

    def __init__(self, username, name, url, age, description, ghostRating):
        self.username = username
        self.name = name
        self.url = url
        self.age = age
        self.description = description
        self.ghostRating = ghostRating

    def json(self):
        return {"username": self.username, "name": self.name, "url": self.url, "age": self.age, "description": self.description, "ghostRating": self.ghostRating}


@application.route("/users")
def get_all():
    return jsonify({"users": [user.json() for user in User.query.all()]})


@application.route("/users/<string:username>", methods=['GET'])
def find_user(username):
    user=User.query.filter_by(username=username).first()

    if user:
        return jsonify(user.json())
    return jsonify({"message": "User not found."}), 404

if __name__ == '__main__':
    application.run(port=5001, debug=True)
