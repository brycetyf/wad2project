import React, { Component } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import List from "./list";

class RestaurantCards extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.restaurant);
  }

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
            <button>BOOK NOW</button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default RestaurantCards;
