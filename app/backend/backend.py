from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime
import ast

application = Flask(__name__)
CORS(application)
# application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/wad2project' #FOR WINDOW USERS
application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:3306/wad2project' #FOR MAC USERS
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
    match_time = db.Column(db.DATETIME(),nullable=False)

    def __init__(self, unique_id, name, message, lastonline,url,match_time):
        self.unique_id = unique_id
        self.name = name
        self.message = message
        self.lastonline = lastonline
        self.url = url
        self.match_time = match_time

    def json(self):
        return {"unique_id": self.unique_id, 
                "name": self.name, 
                "message": self.message, 
                "lastonline": self.lastonline,
                "url":self.url,
                "match_time":self.match_time}

class Reviews(db.Model):
    __tablename__ = 'reviewComments'

    comment_id = db.Column(db.INT(), primary_key=True)
    username = db.Column(db.VARCHAR(100), nullable=False)
    comments = db.Column(db.VARCHAR(8000), nullable=False)
    review_left_by = db.Column(db.VARCHAR(100),nullable=False)
    approved = db.Column(db.BOOLEAN(),nullable=False)

    def __init__(self, comment_id, username, comments,review_left_by,approved):
        self.comment_id = comment_id
        self.username = username
        self.comments = comments
        self.review_left_by = review_left_by
        self.approved = approved

    def json(self):
        return {"comment_id": self.comment_id, 
                "username": self.username, 
                "comments": self.comments,
                "review_left_by":self.review_left_by,
                "approved":self.approved}

class Reservations(db.Model):
    __tablename__ = 'user_bookings'

    res_id = db.Column(db.INT(),primary_key=True)
    res_name = db.Column(db.VARCHAR(300), primary_key=False)
    lon = db.Column(db.VARCHAR(255), nullable=False)
    lat = db.Column(db.VARCHAR(200), nullable=True)
    res_url = db.Column(db.VARCHAR(300), nullable=False)
    contact = db.Column(db.VARCHAR(12), nullable=False)
    booking_date = db.Column(db.VARCHAR(200), nullable=False)
    booking_time = db.Column(db.VARCHAR(200), nullable=False)
    booking_partner = db.Column(db.VARCHAR(300), nullable=False)
    booking_partner_url = db.Column(db.VARCHAR(300), nullable=False)
    review_left = db.Column(db.BOOLEAN(),nullable=True)

    def __init__(self, res_id,res_name, lon,lat, res_url, contact,booking_date,booking_time,booking_partner,booking_partner_url,review_left):
        self.red_id = res_id
        self.res_name = res_name
        self.lon = lon
        self.lat = lat
        self.res_url = res_url
        self.contact = contact
        self.booking_date = booking_date
        self.booking_time = booking_time
        self.booking_partner = booking_partner
        self.booking_partner_url = booking_partner_url
        self.review_left = review_left

    def json(self):
        return {'res_id':self.res_id,
                'res_name':self.res_name,
                'lon':self.lon,
                'lat':self.lat,
                'res_url':self.res_url,
                'contact':self.contact,
                'booking_date':self.booking_date,
                'booking_time':self.booking_time,
                'booking_partner':self.booking_partner,
                'booking_partner_url':self.booking_partner_url,
                'review_left':self.review_left}

class User(db.Model):
    __tablename__ = 'users'

    unique_id = db.Column(db.VARCHAR(1000), primary_key=True)
    username = db.Column(db.VARCHAR(100), nullable=False)
    name = db.Column(db.VARCHAR(255), nullable=False)
    url = db.Column(db.VARCHAR(300), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    description = db.Column(db.VARCHAR(999), nullable=False)
    gender = db.Column(db.VARCHAR(1),nullable=False)
    user_indicated_interest = db.Column(db.BOOLEAN(),nullable=False)
    reviewInstances = db.Column(db.INT(),nullable=True)
    userRating = db.Column(db.Integer,nullable=True)
    userTags = db.Column(db.VARCHAR(8000),nullable=True)
    matched_before = db.Column(db.BOOLEAN(),nullable=False)
    ghostRating = db.Column(db.INT(), nullable=False)
    school = db.Column(db.VARCHAR(100),nullable=False)

    def __init__(self,unique_id, username, name, url, age, description, ghostRating,gender,user_indicated_interest,reviewInstances,userRating,matched_before,userTags,school):
        self.unique_id = unique_id
        self.username = username
        self.name = name
        self.url = url
        self.age = age
        self.description = description
        self.ghostRating = ghostRating
        self.gender = gender
        self.user_indicated_interest = user_indicated_interest
        self.reviewInstances = reviewInstances
        self.userRating = userRating
        self.matched_before = matched_before
        self.userTags = userTags
        self.school = school

    def json(self):
        return {"unique_id":self.unique_id,
                "username": self.username, 
                "name": self.name,
                "url": self.url,
                "age": self.age, 
                "description": self.description, 
                "ghostRating": self.ghostRating,
                "gender":self.gender,
                "user_indicated_interest":self.user_indicated_interest,
                "reviewInstances":self.reviewInstances,
                "userRating":self.userRating,
                "matched_before":self.matched_before,
                "userTags":self.userTags,
                "school":self.school}

class Messages(db.Model):
    __tablename__ = 'messages'
    
    msgId = db.Column(db.INT(), primary_key=True,autoincrement=True)
    match_name = db.Column(db.VARCHAR(255), nullable=False)
    sent_by_user = db.Column(db.BOOLEAN(), nullable=False)
    match_date = db.Column(db.DATE, nullable=False)
    message = db.Column(db.VARCHAR(255), nullable=False)
    url = db.Column(db.VARCHAR(300), nullable=False)
    message_sent_datetime = db.Column(db.DATETIME(),nullable=False)

    def __init__(self, msgId, match_name,sent_by_user, match_date, message,url,message_sent_datetime):
        self.msgId = msgId
        self.match_name = match_name
        self.sent_by_user = sent_by_user
        self.match_date = match_date
        self.message = message
        self.url = url
        self.message_sent_datetime = message_sent_datetime

    def json(self):
        return {"msgId": self.msgId,
                "match_name": self.match_name,
                "sent_by_user": self.sent_by_user,
                "match_date": self.match_date, 
                "message": self.message,
                "url":self.url,
                "message_sent_datetime":self.message_sent_datetime}

###---- FOR RESERVATIONS ----
@application.route("/send_reservations/res_name=<string:res_name>&lon=<string:lon>&lat=<string:lat>&res_url=<path:res_url>&contact=<string:contact>&booking_date=<string:booking_date>&booking_time=<string:booking_time>&booking_partner=<string:booking_partner>&booking_partner_url=<path:booking_partner_url>",methods=["GET"])
def create_reservation(res_name,lon,lat,res_url,contact,booking_date,booking_time,booking_partner,booking_partner_url):
    try:
        highest_res_id = db.session.query(db.func.max(Reservations.res_id)).scalar() + 1
    except:
        highest_res_id = 0
    print(highest_res_id)
    new_reservation = Reservations(
        res_id = highest_res_id,
        res_name = res_name,
        lon = lon,
        lat = lat,
        res_url = res_url,
        contact = contact,
        booking_date = booking_date,
        booking_time = booking_time,
        booking_partner = booking_partner,
        booking_partner_url = booking_partner_url,
        review_left = 0
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

@application.route("/delete_reservation/<string:res_id>")
def delete_reservation(res_id):
    '''
    Displays all the conversations that the user can have based on matches 
    '''
    Reservations.query.filter_by(res_id=res_id).delete()
    db.session.commit()
    return jsonify({"reservation_data": "successfully deleted!"})

@application.route("/check_reservation/booking_date=<string:booking_date>&booking_time=<string:booking_time>")
def check_if_reservation_exists(booking_date,booking_time):
    '''
    Displays all the conversations that the user can have based on matches 
    '''
    search_result = Reservations.query.filter_by(booking_date=booking_date).filter_by(booking_time=booking_time).first()
    if search_result:
        return jsonify({"conflicting_booking": "true"})
    else:
        return jsonify({"conflicting_booking": "false"})


@application.route("/get_particular_reservation/<string:res_id>")
def get_particular_res(res_id):
    '''
    Displays all the conversations that the user can have based on matches 
    '''
    res = Reservations.query.filter_by(res_id=res_id)
    return jsonify({"reservation_data": [r.json() for r in res]})

###---- FOR CHAT PAGE --------
@application.route("/matched_users")
def get_conversations():
    '''
    Displays all the conversations that the user can have based on matches 
    '''
    matches = Matched_users.query.all() 
    for m in matches:
        # now we want to query out the latest message sent by the user 
        latest_entry = Messages.query.filter_by(match_name=m.name).order_by(Messages.message_sent_datetime.desc()).first()
        
        if latest_entry:
            m.message = latest_entry.message
            m.match_time = latest_entry.message_sent_datetime   
            
    db.session.commit()
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
        lastonline = 'New match',
        match_time = str(datetime.datetime.now().strftime("%y/%m/%d %H:%M:%S")),
        url = url
    )
    send_message(name,message='')

    db.session.add(new_match)
    db.session.commit()
    return jsonify({"message":"successfully updated match"})

###---- MESSAGE TABLE APIS --------
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
        url='',
        message_sent_datetime=str(datetime.datetime.now().strftime("%y/%m/%d %H:%M:%S"))
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

###---- USER TABLE APIS --------
@application.route("/users")
def find_all():
    profile_cards = User.query.filter_by(matched_before=False).all()
    return jsonify({"users": [user.json() for user in profile_cards]})

@application.route("/users/<string:unique_id>", methods=['GET'])
def find_unviewed(unique_id):
    profile_cards = User.query.filter_by(matched_before=False).all()
    if unique_id:
        return jsonify({"users": [user.json() for user in profile_cards if user.unique_id < unique_id] })
    return jsonify({"message": "error encountered"}), 404

@application.route("/users/profile/<string:unique_id_or_name>", methods=['GET'])
def find_user(unique_id_or_name):
    try:
        search_param = int(unique_id_or_name) #hack
        user=User.query.filter_by(unique_id=search_param).first()
    except:
        user=User.query.filter_by(username=unique_id_or_name).first()

    if user:
        return jsonify(user.json())
    return jsonify({"message": "User not found."}), 404

@application.route("/users/update/unique_id_or_name=<string:unique_id_or_name>&rating=<string:rating>&badges=<string:badges>&attendance=<string:attendance>&res_id=<string:res_id>", methods=['GET'])
def update_user_data(unique_id_or_name,rating,badges,attendance,res_id):
    
    try:
        search_param = int(unique_id_or_name) #hack
        user=User.query.filter_by(unique_id=search_param).first()
    except:
        user=User.query.filter_by(username=unique_id_or_name).first()
    
    ## Dealing with tags
    
    tags_array = badges.split(',')
    userTags_dict = user.userTags
    if (userTags_dict):
        userTags_dict = ast.literal_eval(userTags_dict)
        for tag in tags_array:
            if tag in userTags_dict:
                userTags_dict[tag] += 1
            else:
                userTags_dict[tag] = 1
    else:
        userTags_dict = {}
        for tag in tags_array:
            userTags_dict[tag] = 1

    userTags_dict = str(userTags_dict)    
    attendance = int(attendance)
    ## Dealing with the average attendance and user rating
    if (user.reviewInstances) is None:
        no_of_reviews = 0
        user_avg_rating = 0
        userRating = rating
        userGhostRating = attendance * 100
        no_of_reviews = 1
    else:
        no_of_reviews = int(user.reviewInstances)  
        total_score = int(user.userRating) * no_of_reviews
        total_att = int(user.ghostRating) * no_of_reviews
        no_of_reviews = no_of_reviews + 1
        userRating = (total_score + int(rating)) / (no_of_reviews)
        userGhostRating = (total_att+int(attendance*100)) / (no_of_reviews)


    user.userRating = int(round(float(userRating),0))
    user.ghostRating = int(round(float(userGhostRating),0))
    user.reviewInstances = no_of_reviews
    user.userTags = userTags_dict
    
    
    Res=Reservations.query.filter_by(res_id=res_id).first()
    Res.review_left = 1
    db.session.commit()
    return jsonify({"message": "Review was successfully made"}), 200


###--- REVIEW TABLE APIS ----
@application.route("/review/username=<string:username>&comments=<string:comments>&review_left_by=<string:review_left_by>",methods=["GET"])
def create_review(username,comments,review_left_by):
    '''
    Updates DB with user reviews
    '''
    try:
        highest_comment_id = db.session.query(db.func.max(Reviews.comment_id)).scalar() + 1
    except:
        highest_comment_id = 1

    new_review = Reviews(
        comment_id = int(highest_comment_id),
        username = username,
        comments = comments,
        review_left_by = review_left_by,
        approved = 0,
    )

    db.session.add(new_review)
    db.session.commit()
    return jsonify({"message":"successfully updated review"})

@application.route("/get_review/username=<string:username>")
def get_reviews(username):

    reviews = Reviews.query.filter_by(username=username).all()
    return jsonify({"reviews": [r.json() for r in reviews]})

@application.route("/approve_reject_review/comment_id=<string:comment_id>&status=<string:status>")
def approve_reject_review(comment_id,status):
    review = Reviews.query.filter_by(comment_id=comment_id).first()
    if status == "1":
        review.approved = 1
    else:
        review.approved = 0

    db.session.commit()
    return jsonify({"reviews": "successfully updated review approval status"})

if __name__ == '__main__':
    application.run(port=5001, debug=True)
