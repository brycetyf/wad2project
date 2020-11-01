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

if __name__ == '__main__':
    application.run(port=5002, debug=True)
