import React, { Component } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/Profile.css";
import axios from "axios";
import SchoolIcon from "@material-ui/icons/School";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import DescriptionIcon from "@material-ui/icons/Description";
import { Carousel } from "react-bootstrap";

class Profile extends Component {
  state = {
    user: [],
  };

  componentDidMount() {
    const unique_id = window.location.pathname.split("%")[0].split("/")[2];
    console.log(unique_id);
    axios
      .get(`http://127.0.0.1:5001/users/profile/${unique_id}`)
      .then((res) => this.setState({ user: res.data }));
  }
  render() {
    let obj = this.state.user;
    console.log(obj);

    {
      /* <Carousel controls={false} indicators={false}>
          <Carousel.Item>
            <img src={obj.url} alt={obj.name} className="sliderimg" />
          </Carousel.Item>
        </Carousel> */
    }
    return (
      <div className="profile" id={obj.unique_id}>
        <Carousel controls={true} indicators={true}>
          <Carousel.Item>
            <img src={obj.url} alt={obj.name} className="sliderimg" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={obj.url} alt={obj.name} className="sliderimg" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={obj.url} alt={obj.name} className="sliderimg" />
          </Carousel.Item>
        </Carousel>
        <div className="profile__area">
          <p className="profile__name">
            {obj.name}, {obj.age}
          </p>
          <div className="profile__description">
            <div className="profile__details">
              <MoodBadIcon />: {obj.ghostRating}
            </div>
            <div className="profile__details">
              <SchoolIcon />: National University of Singapore
            </div>
            <div className="profile__details">
              <DescriptionIcon />: {obj.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
