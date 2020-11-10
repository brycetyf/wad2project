import React, { Component } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/Profile.css";
import axios from "axios";
import SchoolIcon from "@material-ui/icons/School";
import DescriptionIcon from "@material-ui/icons/Description";
import { Carousel } from "react-bootstrap";
import GradeIcon from "@material-ui/icons/Grade";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import SmallOutlinedChips from "./userTags";

class Profile extends Component {
  state = {
    user: [],
    userTags: "",
  };

  componentDidMount() {
    const unique_id = window.location.pathname.split("%")[0].split("/")[2];
    this.props.setLastViewed_profile(unique_id);
    axios
      .get(`http://127.0.0.1:5001/users/profile/${unique_id}`)
      .then((res) => {
        this.setState({ user: res.data });
        var json_tag = JSON.parse(res.data.userTags.replaceAll("'", '"'));
        this.setState({
          userTags: <SmallOutlinedChips tags={json_tag} />,
        });
      });
  }
  render() {
    let obj = this.state.user;
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
          <div className="profile__name">
            {obj.name}, {obj.age}
          </div>
          <div className="profile__description">
            <div className="profile__details">
              <HowToRegIcon />: {obj.ghostRating}
            </div>
            <div className="profile__details">
              <GradeIcon />: {obj.userRating}
            </div>
            <div className="profile__details">
              <SchoolIcon />: National University of Singapore
            </div>
            <div className="profile__details">
              <DescriptionIcon />: {obj.description}
            </div>
          </div>
        </div>
        {this.state.userTags}
      </div>
    );
  }
}

export default Profile;
