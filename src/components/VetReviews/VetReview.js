import React, { Component } from "react";
import axios from "axios";
import MediaCard from "./IndividualReviewCards";

// assume that the user is bryce

class VetReview extends Component {
  state = {
    veto_review: [],
    pass_review: [],
  };

  componentDidMount() {
    this.fetchReviews();
    this.interval = setInterval(() => {
      this.fetchReviews();
      console.log(this.state);
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  ApproveReject = (comment_id, status) => {
    axios.get(
      `http://127.0.0.1:5001/approve_reject_review/comment_id=${comment_id}&status=${status}`
    );
  };

  fetchReviews = () => {
    axios.get("http://127.0.0.1:5001/get_review/username=bryce").then((res) => {
      let veto_review = [];
      let pass_review = [];
      res.data.reviews.map((r) => {
        if (r.approved == true) {
          pass_review.push(r);
        } else {
          veto_review.push(r);
        }
      });
      this.setState({
        veto_review: veto_review,
        pass_review: pass_review,
      });
    });
  };
  render() {
    return (
      <div>
        {this.state.pass_review.length > 0 && (
          <div>
            <h3 className="upcomingDates">Approved Reviews</h3>
          </div>
        )}
        <div>
          {this.state.pass_review.map((r, index) => (
            <MediaCard
              reviewer={r.review_left_by}
              review_content={r.comments}
              comment_id={r.comment_id}
              ApproveReject={this.ApproveReject}
              key={index}
            />
          ))}
        </div>
        {this.state.veto_review.length > 0 && (
          <div>
            <hr/>
            <h3 className="upcomingDates">Hidden Reviews</h3>
          </div>
        )}
        <div>
          {this.state.veto_review.map((r, index) => (
            <MediaCard
              reviewer={r.review_left_by}
              review_content={r.comments}
              comment_id={r.comment_id}
              ApproveReject={this.ApproveReject}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default VetReview;
