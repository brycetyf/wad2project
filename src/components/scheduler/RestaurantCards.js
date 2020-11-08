import React, { Component } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import List from "./list";
import axios from "axios";

class RestaurantCards extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.restaurant);
  }

  sendBooking = (
    res_name,
    lon,
    lat,
    res_url,
    contact,
    booking_date,
    booking_time,
    booking_partner,
    booking_partner_url
  ) => {
    let url = `http://127.0.0.1:5001/send_reservations/res_name=${res_name}&lon=${lon}&lat=${lat}&res_url=${res_url}&contact=${contact}&booking_date=${booking_date}&booking_time=${booking_time}&booking_partner=${booking_partner}&booking_partner_url=${booking_partner_url}`;
    console.log(url);
    axios.get(url).then((res) => {
      console.log("reservation success!");
    });
  };

  render() {
    return (
      <div>
        <Card border="dark">
          <Card.Img variant="top" src={this.props.restaurant.images[0].url} />
          <Card.Body>
            <Card.Title>{this.props.restaurant.name}</Card.Title>
            <Card.Text>
              <b>Rating: </b>
              {this.props.restaurant.reviewScore}/10
              <b>Address: </b>
              {this.props.restaurant.location.address.number}{" "}
              {this.props.restaurant.location.address.street}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Contact: {this.props.restaurant.phoneNumber}
            </small>
            <button
              onClick={() =>
                this.sendBooking(
                  this.props.restaurant.name,
                  this.props.restaurant.location.coordinates.longitude,
                  this.props.restaurant.location.coordinates.latitude,
                  this.props.restaurant.images[0].url,
                  this.props.restaurant.phoneNumber,
                  this.props.booking_date,
                  this.props.booking_time,
                  this.props.partner_name,
                  this.props.partner_url
                )
              }
            >
              BOOK NOW
            </button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default RestaurantCards;
