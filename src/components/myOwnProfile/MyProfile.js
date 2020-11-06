import React, { Component } from "react";
import PropTypes from "prop-types";
import SchoolIcon from "@material-ui/icons/School";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import DescriptionIcon from "@material-ui/icons/Description";
import Avatar from "@material-ui/core/Avatar";
import "../../styles/myProfile.css";

class MyProfile extends Component {
  state = {
    upcomingDates: [
      {
        date: "2020-12-31",
        venue: "SMU",
        with_who: "Natalie",
        latitude: 1.279094,
        longitude: 103.854576,
        
      },
    ],
    statistics: {
      number_of_swipes: 20,
      matches: 2,
      ghost_rating: 0,
      rating: 5,
    },
  };

  render() {
    return (
      <div className="profile">
        <Avatar
          src={require("./dp/dp.png")}
          alt="jisoo1"
          style={{
            height: 180,
            width: 180,
            margin: "auto",
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        <div
          className="profile__area"
          style={{ background: "lightgrey", width: "100%" }}
        >
          <div className="profile__name">Kim Jisoo, 24</div>
          <div className="profile__description">
            <div className="profile__details">
              <MoodBadIcon />: 0
            </div>
            <div className="profile__details">
              <SchoolIcon />: YG
            </div>
            <div className="profile__details">
              <DescriptionIcon />: Blackpink Jisoo
            </div>
          </div>
        </div>

        <div className="upcomingDates">Placeholder: Dates inc</div>
      </div>
    );
  }
}

export default MyProfile;
