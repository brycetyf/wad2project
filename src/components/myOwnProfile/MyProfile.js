import React, { Component } from "react";
import PropTypes from "prop-types";
import SchoolIcon from "@material-ui/icons/School";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import DescriptionIcon from "@material-ui/icons/Description";
import Avatar from "@material-ui/core/Avatar";
import "../../styles/myProfile.css";
import axios from "axios";
import ReservationCard from "./UpcomingReservations";
import Circle from "react-circle";

class MyProfile extends Component {
  state = {
    upcomingDates: [],
    AvatarImages: [],
    pastDates: [],
    statistics: {
      number_of_swipes: 20,
      matches: 2,
      ghost_rating: 0,
      rating: 5,
    },
    user_data: {
      name: "Bryce Tan",
      age: "23",
      school: "Singapore Management University",
      desc: "Just send it",
    },
  };

  componentDidMount() {
    let upcoming_arr = [];
    let past_arr = [];
    axios.get("http://127.0.0.1:5001/get_reservations").then((res) => {
      res.data.reservation_data.map((event) => {
        // console.log(event.booking_time);
        var parts = event.booking_date.split("-");
        var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
        var today = new Date();
        var current_hour = parseInt(
          today.toLocaleTimeString("en-GB").split(":")[0]
        );
        var booking_time = parseInt(event.booking_time.split(":")[0]);
        mydate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        // console.log(mydate.setHours(0, 0, 0, 0), today.setHours(0, 0, 0, 0));

        if (mydate < today) {
          past_arr.push(event);
        } else if (mydate === today) {
          console.log(booking_time, current_hour);
          if (booking_time > current_hour) {
            upcoming_arr.push(event);
          } else {
            past_arr.push(event);
          }
        } else {
          upcoming_arr.push(event);
        }
      });
      this.setState({
        upcomingDates: upcoming_arr,
        pastDates: past_arr,
      });
    });
  }

  render() {
    return (
      <div className="profile">
        <Avatar
          src={require("../../images/bryce.jpg")}
          alt="bryce"
          style={{
            height: 180,
            width: 180,
            margin: "auto",
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        <div className="profile__area">
          <div className="profile__name">
            {this.state.user_data.name}, {this.state.user_data.age}
          </div>
          <div className="profile__description">
            <div className="profile__details">
              <MoodBadIcon />: 0
            </div>
            <div className="profile__details">
              <SchoolIcon />: {this.state.user_data.school}
            </div>
            <div className="profile__details">
              <DescriptionIcon />: {this.state.user_data.desc}
            </div>
          </div>
        </div>

        {this.state.upcomingDates.length > 0 && (
          <div>
            <hr style={{ paddingTop: "20px" }} />
            <h3 className="upcomingDates">Upcoming Dates</h3>
            <br />
          </div>
        )}
        <div>
          {this.state.upcomingDates.map((date, index) => (
            <ReservationCard
              res_name={date.res_name}
              res_url={date.res_url}
              contact={date.contact}
              booking_date={date.booking_date}
              booking_time={date.booking_time}
              booking_partner={date.booking_partner}
              partner_url={date.booking_partner_url}
              dateid={date.res_id}
              upcoming={true}
              key={index}
            />
          ))}
        </div>
        {this.state.pastDates.length > 0 && (
          <div>
            <hr style={{ paddingTop: "20px" }} />
            <h3 className="upcomingDates">Past Dates</h3>
            <br />
          </div>
        )}
        <div>
          {this.state.pastDates.map((date, index) => (
            <ReservationCard
              res_name={date.res_name}
              res_url={date.res_url}
              contact={date.contact}
              booking_date={date.booking_date}
              booking_time={date.booking_time}
              booking_partner={date.booking_partner}
              partner_url={date.booking_partner_url}
              dateid={date.res_id}
              upcoming={false}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MyProfile;
