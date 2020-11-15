import React, { Component, useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DiscreteSlider from "./DiscreteSlider";
import MultilineTextFields from "./MultilineTextFields";
import MultipleSelect from "./MultipleSelect";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import SimpleModal from "../popup_modal";
import RadioButtons from "./RadioButtons";
import "../../styles/Review.css";
import { Link } from "react-router-dom";

class Review extends Component {
  state = {
    user: [],
    rating_value: 49,
    text_review: "",
    badges: [],
    res_id: 0,
    confirmation_button: (
      <Link to={"/myProfile"}>
        <IconButton
          type="button"
          className="swipeButtons__right review__confirm__button"
          onClick={() => {
            this.compositeFunction(
              this.state.user.username,
              this.state.rating_value,
              this.state.text_review,
              this.state.badges,
              this.state.attendance,
              this.state.res_id
            );
          }}
        >
          <DoneIcon fontSize="large" />
        </IconButton>
      </Link>
    ),
  };

  compositeFunction = (username, rating, review, badges, attendance) => {
    this.sendReview(username, review);
    this.editUserData(username, rating, badges, attendance);
  };

  editUserData = (username, rating, badges, attendance) => {
    if (badges.length == 0) {
      var serialiseBadges = " ";
    } else {
      var serialiseBadges = badges.toString();
    }
    axios.get(
      `http://127.0.0.1:5001/users/update/unique_id_or_name=${username}&rating=${rating}&badges=${serialiseBadges}&attendance=${attendance}&res_id=${this.state.res_id}`
    );
  };

  sendReview = (username, review) => {
    axios.get(
      `http://127.0.0.1:5001/review/username=${username}&comments=${review}&review_left_by=${this.state.reviewer_name}`
    );
  };
  updateRating = (e, value) => {
    this.setState({
      rating_value: value,
    });
  };

  updateTextReview = (e) => {
    this.setState({
      text_review: e.target.value,
    });
  };

  updateBadges = (e) => {
    this.setState({
      badges: e,
    });
  };
  updateAttendence = (e) => {
    if (e === "b") {
      this.setState({
        attendance: 0,
      });
    } else {
      this.setState({
        attendance: 1,
      });
    }
  };
  componentDidMount() {
    const date_name = window.location.pathname.split("/")[2];
    this.setState({
      res_id: window.location.pathname.split("/")[3],
      reviewer_name: window.location.pathname.split("/")[4].replace("%20", " "),
    });

    axios
      .get(`http://127.0.0.1:5001/users/profile/${date_name}`)
      .then((res) => this.setState({ user: res.data }));
  }

  render() {
    return (
      <div>
        <div className="profile__area">
          <div className="profile__name">You are leaving a review for </div>
          <Avatar
            src={this.state.user.url}
            alt={this.state.user.username}
            style={{
              height: 180,
              width: 180,
              margin: "auto",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <div className="profile__name">
            {this.state.user.name}, {this.state.user.age}
          </div>
        </div>
        <div className="attendance__input">
          <RadioButtons
            partner_name={this.state.user.username}
            updateAttendence={this.updateAttendence}
          />
        </div>
        <div className="rating__slider">
          <DiscreteSlider updateRating={this.updateRating} />
        </div>
        <br />
        <div className="review__input">
          <Typography>
            Let others know how {this.state.user.username} was
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <MultilineTextFields updateTextReview={this.updateTextReview} />
        </div>
        <br />
        <div className="review__badges">
          <Typography>
            Award some badges to {this.state.user.username}
          </Typography>
          <MultipleSelect updateBadges={this.updateBadges} />
        </div>
        <br />
        <div className="confirm__button">
          {this.state.text_review != "" &&
          this.state.rating_value >= 0 &&
          this.state.attendance >= 0 ? (
            <SimpleModal
              modalTitle={"Hey there!"}
              modalBody={`By clicking the button below, you are confirming that you are leaving a review for ${this.state.user.username}. If this was a mistake, click outside of the box to continue editing.`}
              modalConfirmationButton={this.state.confirmation_button}
            />
          ) : (
            <SimpleModal
              modalTitle={"Oops!"}
              modalBody={`Please ensured that you've filled up the compulsory fields. ${this.state.user.username} will appreciate you for doing so. It also helps to make Ghost-Me-Not better!`}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Review;
