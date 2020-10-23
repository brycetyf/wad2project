from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:5002/wad2project' # TO BE CHANGED
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
CORS(application)


class Chat(db.Model):
    __tablename__ = 'chat'

    msgId = db.Column(db.INT(), primary_key=True)
    fromWho = db.Column(db.VARCHAR(255), nullable=False)
    matchDate = db.Column(db.DATE, nullable=False)
    message = db.Column(db.VARCHAR(255), nullable=False)

    def __init__(self, msgId, fromWho, matchDate, message):
        self.msgId = msgId
        self.fromWho = fromWho
        self.matchDate = matchDate
        self.message = message


    def json(self):
        return {"msgId": self.msgId, "fromWho": self.fromWho, "matchDate": self.matchDate, "message": self.message}


@application.route("/chat")
def get_all():
    return jsonify({"chats": [chat.json() for chat in Chat.query.all()]})


@application.route("/chat/<string:username>", methods=['GET'])
def find_match_chat(username):
    chats=Chat.query.filter_by(fromWho=username)

    if chats:
        return jsonify({"chats": [chat.json() for chat in chats]})
    return jsonify({"message": "User not found."}), 404

if __name__ == '__main__':
    application.run(port=5002, debug=True)
