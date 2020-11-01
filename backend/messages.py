from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

application = Flask(__name__)
# application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/wad2project'
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/wad2project'
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
CORS(application)


class messages(db.Model):
    __tablename__ = 'messages'

    msgId = db.Column(db.INT(), primary_key=True)
    match_name = db.Column(db.VARCHAR(255), nullable=False)
    sentByUser = db.Column(db.BOOLEAN(), nullable=False)
    matchDate = db.Column(db.DATE, nullable=False)
    message = db.Column(db.VARCHAR(255), nullable=False)

    def __init__(self, msgId, match_name,sentByUser, matchDate, message):
        self.msgId = msgId
        self.match_name = match_name
        self.sentByUser = sentByUser
        self.matchDate = matchDate
        self.message = message


    def json(self):
        return {"msgId": self.msgId,
                "match_name": self.match_name,
                "sentByUser": self.sentByUser,
                "matchDate": self.matchDate, 
                "message": self.message}


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


if __name__ == '__main__':
    application.run(port=5002, debug=True)
