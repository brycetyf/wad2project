from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

application = Flask(__name__)
# application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/wad2project' # TO BE CHANGED
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/wad2project' # FOR MAC USERS

application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
CORS(application)


class User(db.Model):
    __tablename__ = 'users'

    unique_id = db.Column(db.VARCHAR(1000), primary_key=True)
    username = db.Column(db.VARCHAR(100), nullable=False)
    name = db.Column(db.VARCHAR(255), nullable=False)
    url = db.Column(db.VARCHAR(300), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    description = db.Column(db.VARCHAR(999), nullable=False)
    ghostRating = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.VARCHAR(1),nullable=False)

    def __init__(self,unique_id, username, name, url, age, description, ghostRating,gender):
        self.unique_id = unique_id
        self.username = username
        self.name = name
        self.url = url
        self.age = age
        self.description = description
        self.ghostRating = ghostRating
        self.gender = gender

    def json(self):
        return {"unique_id":self.unique_id,
                "username": self.username, 
                "name": self.name,
                "url": self.url,
                "age": self.age, 
                "description": self.description, 
                "ghostRating": self.ghostRating,
                "gender":self.gender}

@application.route("/users")
def find_all():
    return jsonify({"users": [user.json() for user in User.query.all()]})

@application.route("/users/<string:unique_id>", methods=['GET'])
def get_all(unique_id):
    if unique_id:
        print(unique_id)
        return jsonify({"users": [user.json() for user in User.query.all() if user.unique_id < unique_id] })
    return jsonify({"message": "error encountered"}), 404

@application.route("/users/profile/<string:unique_id>", methods=['GET'])
def find_user(unique_id):
    user=User.query.filter_by(unique_id=unique_id).first()

    if user:
        return jsonify(user.json())
    return jsonify({"message": "User not found."}), 404


if __name__ == '__main__':
    application.run(port=5001, debug=True)
