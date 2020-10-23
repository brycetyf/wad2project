import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/Profile.css";
import axios from "axios";

class Profile extends Component {
  state = {
    user: [],
  };

  componentDidMount() {
    const partner_username = window.location.pathname
      .split("%")[0]
      .split("/")[2];
    axios
      .get(`http://127.0.0.1:5001/users/${partner_username}`)
      .then((res) => this.setState({ user: res.data }));
    console.log(this.state);
  }
  render() {
    return (
      <div className="profile">
        <AliceCarousel disableButtonsControls>
          <img
            src={this.state.user.url}
            alt={this.state.user.name}
            className="sliderimg"
          />
        </AliceCarousel>
      </div>
    );
  }
}

export default Profile;
