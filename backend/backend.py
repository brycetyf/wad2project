from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/wad2project' #FOR WINDOW USERS
# application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/wad2project' #FOR MAC USERS
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
    user_indicated_interest = db.Column(db.BOOLEAN(),nullable=False)

    def __init__(self,unique_id, username, name, url, age, description, ghostRating,gender,user_indicated_interest):
        self.unique_id = unique_id
        self.username = username
        self.name = name
        self.url = url
        self.age = age
        self.description = description
        self.ghostRating = ghostRating
        self.gender = gender
        self.user_indicated_interest = user_indicated_interest

    def json(self):
        return {"unique_id":self.unique_id,
                "username": self.username, 
                "name": self.name,
                "url": self.url,
                "age": self.age, 
                "description": self.description, 
                "ghostRating": self.ghostRating,
                "gender":self.gender,
                "user_indicated_interest":self.user_indicated_interest}

class messages(db.Model):
    __tablename__ = 'messages'

    msgId = db.Column(db.INT(), primary_key=True,autoincrement=True)
    match_name = db.Column(db.VARCHAR(255), nullable=False)
    sent_by_user = db.Column(db.BOOLEAN(), nullable=False)
    match_date = db.Column(db.DATE, nullable=False)
    message = db.Column(db.VARCHAR(255), nullable=False)
    url = db.Column(db.VARCHAR(300), nullable=False)

    def __init__(self, msgId, match_name,sent_by_user, match_date, message,url):
        self.msgId = msgId
        self.match_name = match_name
        self.sent_by_user = sent_by_user
        self.match_date = match_date
        self.message = message
        self.url = url

    def json(self):
        return {"msgId": self.msgId,
                "match_name": self.match_name,
                "sent_by_user": self.sent_by_user,
                "match_date": self.match_date, 
                "message": self.message,
                "url":self.url}

###---- FOR CHAT PAGE --------
@application.route("/matched_users")
def get_conversations():
    return jsonify({"matched_users": [u.json() for u in matched_users.query.all()]})

###---- FOR CHATTING --------
@application.route("/send_message/match_name=<string:match_name>&message=<string:message>",methods=["GET"])
def send_message(match_name,message):
    # update database with the latest message from the user
    highest_msg_id = db.session.query(db.func.max(messages.msgId)).scalar() + 1

    new_message = messages(
        msgId=highest_msg_id,
        match_name=match_name,
        sent_by_user=1,
        message=message,
        match_date='2010-01-01',
        url=''
    )
    
    db.session.add(new_message)
    db.session.commit()
    return jsonify({"message":"successfully updated"})

@application.route("/chat")
def get_all():
    # don't think we will ever use this!! but can leave it here for now
    return jsonify({"chats": [chat.json() for chat in messages.query.all()]})

@application.route("/chat/<string:username>", methods=['GET'])
def find_match_chat(username):
    # get chat history from specific user
    chats=messages.query.filter_by(match_name=username)

    if chats:
        return jsonify({"chats": [chat.json() for chat in chats]})
    return jsonify({"message": "User not found."}), 404

###---- TO DISPLAY CARDS --------
@application.route("/users")
def find_all():
    return jsonify({"users": [user.json() for user in User.query.all()]})

@application.route("/users/<string:unique_id>", methods=['GET'])
def find_unviewed(unique_id):
    if unique_id:
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
