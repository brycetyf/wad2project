import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CardActions,
    Typography,
    CardHeader,
    CardMedia,
    Button,
} from '@material-ui/core/';
import List from "./list";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    media: {
      height: 300,
    },
}))

const sendBooking = (
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

export default function RestaurantCards({
  restaurants,
  booking_date,
  booking_time,
  partner_name,
  partner_url,
}) {
    const classes = useStyles();
    //console.log(restaurants);

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {restaurants.map(restaurant => (
                    <Grid item xs={12} sm={6} md={4} key={restaurants.indexOf(restaurant)}>
                        <Card>
                            <CardMedia 
                              className={classes.media}
                              image={restaurant.images[0].url}
                              title={restaurant.name}
                              />

                            <CardContent>
                                <Typography variant="h4" gutterBottom component="h4"> 
                                    {restaurant.name}
                                </Typography>

                                <Typography variant="h5" gutterBottom component="h5">Address: </Typography>
                                <Typography variant="h6" gutterBottom component="h6">{restaurant.location.address.number} {restaurant.location.address.street}</Typography>

                                <Typography variant="body2" color="textSecondary" component="p">
                                  Contact Number: {restaurant.phoneNumber}
                                </Typography>
                            </CardContent>

                            <CardActions>
                              <Button size="small" variant="outlined" color="primary"
                                onClick={() =>
                                sendBooking(
                                  restaurant.name,
                                  restaurant.location.coordinates.longitude,
                                  restaurant.location.coordinates.latitude,
                                  restaurant.images[0].url,
                                  restaurant.phoneNumber,
                                  booking_date,
                                  booking_time,
                                  partner_name,
                                  partner_url
                                  )
                                }>
                                Book Now
                              </Button>
                            </CardActions>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}


// INITIAL RESTAURANT CARDS. DO NOT DELETE FOR THE TIME BEING



// import React, { Component } from "react";
// import CardDeck from "react-bootstrap/CardDeck";
// import Card from "react-bootstrap/Card";
// import List from "./list";
// import axios from "axios";

// class RestaurantCards extends Component {
//   constructor(props) {
//     super(props);
//     console.log(this.props.restaurant);
//   }



//   render() {
//     return (
//       <div>
//         <Card border="dark">
//           <Card.Img variant="top" src={this.props.restaurant.images[0].url} />
//           <Card.Body>
//             <Card.Title>{this.props.restaurant.name}</Card.Title>
//             <Card.Text>
//               <b>Rating: </b>
//               {this.props.restaurant.reviewScore}/10
//               <b>Address: </b>
//               {this.props.restaurant.location.address.number}{" "}
//               {this.props.restaurant.location.address.street}
//             </Card.Text>
//           </Card.Body>
//           <Card.Footer>
//             <small className="text-muted">
//               Contact: {this.props.restaurant.phoneNumber}
//             </small>
//             <button

//             >
//               BOOK NOW
//             </button>
//           </Card.Footer>
//         </Card>
//       </div>
//     );
//   }
// }

// export default RestaurantCards;

