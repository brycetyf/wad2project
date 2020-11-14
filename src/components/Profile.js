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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class Profile extends Component {
  state = {
    user: [],
    userTags: "",
    userReviews: [],
  };

  componentDidMount() {
    const unique_id = window.location.pathname.split("%")[0].split("/")[2];
    this.props.setLastViewed_profile(unique_id);
    axios
      .get(`http://127.0.0.1:5001/users/profile/${unique_id}`)
      .then((res) => {
        this.setState({ user: res.data });
        if (res.data.userTags != null) {
          var json_tag = JSON.parse(res.data.userTags.replaceAll("'", '"'));
          this.setState({
            userTags: <SmallOutlinedChips tags={json_tag} />,
          });
        }
        this.fetchReviews(res.data.username);
      });
  }
  fetchReviews = (username) => {
    axios
      .get(`http://127.0.0.1:5001/get_review/username=${username}`)
      .then((res) => {
        let temp_review_arr = [];
        res.data.reviews
          .filter((r) => r.approved === true)
          .map((r) => {
            temp_review_arr.push(r);
          });
        this.setState({
          userReviews: temp_review_arr,
        });
      });
  };
  render() {
    let obj = this.state.user;
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="profile" id={obj.unique_id}>
        <Carousel {...settings}>
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
        <div>{this.state.userTags}</div>
        {this.state.userReviews.length > 0 && (
          <div>
            <hr style={{ paddingTop: "20px" }} />
            <h3 className="upcomingDates">What others have said</h3>
            <br />
          </div>
        )}
        <div>
          {this.state.userReviews.map((review, index) => (
            <Card
              style={{
                maxWidth: "50%",
                marginTop: "50px",
                textAlign: "center",
                margin: "auto",
              }}
              key={index}
            >
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {review.comments}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
