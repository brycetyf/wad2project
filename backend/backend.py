from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime

application = Flask(__name__)
CORS(application)
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/wad2project' #FOR WINDOW USERS
# application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/wad2project' #FOR MAC USERS
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(application)


class Matched_users(db.Model):
    __tablename__ = 'matched_users'

    unique_id = db.Column(db.INT(), primary_key=True)
    name = db.Column(db.VARCHAR(255), nullable=False)
    message = db.Column(db.VARCHAR(200), nullable=True)
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


class Reservations(db.Model):
    __tablename__ = 'user_bookings'

    res_name = db.Column(db.VARCHAR(300), primary_key=True)
    lon = db.Column(db.VARCHAR(255), nullable=False)
    lat = db.Column(db.VARCHAR(200), nullable=True)
    res_url = db.Column(db.VARCHAR(300), nullable=False)
    contact = db.Column(db.VARCHAR(12), nullable=False)
    booking_date = db.Column(db.VARCHAR(200), nullable=False)
    booking_time = db.Column(db.VARCHAR(200), nullable=False)
    booking_partner = db.Column(db.VARCHAR(300), nullable=False)
    booking_partner_url = db.Column(db.VARCHAR(300), nullable=False)

    def __init__(self, res_name, lon,lat, res_url, contact,booking_date,booking_time,booking_partner,booking_partner_url):
        self.res_name = res_name
        self.lon = lon
        self.lat = lat
        self.res_url = res_url
        self.contact = contact
        self.booking_date = booking_date
        self.booking_time = booking_time
        self.booking_partner = booking_partner
        self.booking_partner_url = booking_partner_url

    def json(self):
        return {'res_name':self.res_name,
                'lon':self.lon,
                'lat':self.lat,
                'res_url':self.res_url,
                'contact':self.contact,
                'booking_date':self.booking_date,
                'booking_time':self.booking_time,
                'booking_partner':self.booking_partner,
                'booking_partner_url':self.booking_partner_url}

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

class Messages(db.Model):
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

###---- FOR RESERVATIONS ----
@application.route("/send_reservations/res_name=<string:res_name>&lon=<string:lon>&lat=<string:lat>&res_url=<path:res_url>&contact=<string:contact>&booking_date=<string:booking_date>&booking_time=<string:booking_time>&booking_partner=<string:booking_partner>&booking_partner_url=<path:booking_partner_url>",methods=["GET"])
def create_reservation(res_name,lon,lat,res_url,contact,booking_date,booking_time,booking_partner,booking_partner_url):
    new_reservation = Reservations(
        res_name = res_name,
        lon = lon,
        lat = lat,
        res_url = res_url,
        contact = contact,
        booking_date = booking_date,
        booking_time = booking_time,
        booking_partner = booking_partner,
        booking_partner_url = booking_partner_url
    )

    db.session.add(new_reservation)
    db.session.commit()
    return jsonify({"message":"successfully made reservation"})

@application.route("/get_reservations")
def get_reservations():
    '''
    Displays all the conversations that the user can have based on matches 
    '''
    return jsonify({"reservation_data": [u.json() for u in Reservations.query.all()]})

###---- FOR CHAT PAGE --------
@application.route("/matched_users")
def get_conversations():
    '''
    Displays all the conversations that the user can have based on matches 
    '''
    return jsonify({"matched_users": [u.json() for u in Matched_users.query.all()]})

###---- API endpoint to update backend that a match has been done --------
@application.route("/successful_match/unique_id=<string:unique_id>&name=<string:name>&url=<path:url>",methods=["GET"])
def create_match(unique_id,name,url):
    '''
    Updates data based after the user has successfully obtained the matches
    '''
    new_match = Matched_users(
        unique_id = int(unique_id),
        name = name,
        message = 'No messages sent yet',
        lastonline = '1 minute ago',
        url = url
    )
    send_message(name,message='')

    db.session.add(new_match)
    db.session.commit()
    return jsonify({"message":"successfully updated match"})


###---- FOR CHATTING --------
@application.route("/send_message/match_name=<string:match_name>&message=<string:message>",methods=["GET"])
def send_message(match_name,message):
    # update database with the latest message from the user
    '''
    API endpoint to send message 
    '''
    try:
        highest_msg_id = db.session.query(db.func.max(Messages.msgId)).scalar() + 1
    except:
        highest_msg_id = 1

    new_message = Messages(
        msgId=highest_msg_id,
        match_name=match_name,
        sent_by_user=1,
        message=message,
        match_date=str(datetime.datetime.now()),
        url=''
    )
    
    db.session.add(new_message)
    db.session.commit()
    return jsonify({"message":"message sent successfully"})

@application.route("/chat")
def get_all():
    # don't think we will ever use this!! but can leave it here for now
    return jsonify({"chats": [chat.json() for chat in Messages.query.all()]})

@application.route("/chat/<string:username>", methods=['GET'])
def find_match_chat(username):
    '''
    To display the chat history for a particular user
    '''
    chats=Messages.query.filter_by(match_name=username)

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

@application.route("/users/profile/<string:unique_id_or_name>", methods=['GET'])
def find_user(unique_id_or_name):
    try:
        search_param = int(unique_id_or_name) #hack
        user=User.query.filter_by(unique_id=search_param).first()
    except:
        print('hello')
        user=User.query.filter_by(username=unique_id_or_name).first()

    if user:
        return jsonify(user.json())
    return jsonify({"message": "User not found."}), 404

if __name__ == '__main__':
    application.run(port=5001, debug=True)
