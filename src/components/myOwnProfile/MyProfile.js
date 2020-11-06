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
    axios.get("http://127.0.0.1:5001/get_reservations").then((res) => {
      this.setState({
        upcomingDates: res.data.reservation_data,
      });
    });
  }

  render() {
    return (
      <div className="profile">
        <Avatar
          src={require("./dp/bryce.jpg")}
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
            <hr />
            <h3 className="upcomingDates">Upcoming dates</h3>
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
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MyProfile;
