import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/Profile.css";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

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
    return (
      <div className="profile" id={obj.unique_id}>
        <Carousel controls={false} indicators={false}>
          <Carousel.Item>
            <img src={obj.url} alt={obj.name} className="sliderimg" />
          </Carousel.Item>
        </Carousel>
        <div class='container'>
          {obj.name}
          {obj.description}
          {obj.ghostRating}
          {obj.age}
        </div>
      </div>
    );
  }
}

export default Profile;
