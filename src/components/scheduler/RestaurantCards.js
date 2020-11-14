import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
} from "@material-ui/core/";
import axios from "axios";
import BookingConfirmationModal from "./BookingConfirmationModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    height: 300,
  },
  fullHeightCard: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
  },
  MainGrid: {
    alignItems: "stretch",
  },
  SubGrid: {
    display: "flex",
  },
}));

const convert_price_rating = (tagGroups) => {
  console.log(tagGroups[0].type);
  if (tagGroups[0].type !== "PRICE") {
    var price_rating = tagGroups[1].tags[0].name;
  } else {
    var price_rating = tagGroups[0].tags[0].name;
  }
  if (price_rating == "price average") {
    return (
      <span>
        <span style={{ color: "black" }}>$$</span>
        <span style={{ color: "grey" }}>$</span>
      </span>
    );
  } else if (price_rating == "price upscale") {
    return (
      <span>
        <span style={{ color: "black" }}>$$$</span>
      </span>
    );
  } else {
    return (
      <span>
        <span style={{ color: "black" }}>$</span>
        <span style={{ color: "grey" }}>$$</span>
        {/* <span>{price_rating}</span> */}
      </span>
    );
  }
};

//Updating Backend With the Booking details
// API call using axios
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

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.MainGrid}
      >
        {restaurants
          .sort((a, b) => b.reviewScore.localeCompare(a.reviewScore))
          .map((restaurant, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              className={classes.SubGrid}
            >
              <Card className={classes.fullHeightCard}>
                <CardMedia
                  className={classes.card}
                  image={restaurant.images[0].url}
                  title={restaurant.name}
                />

                <CardContent>
                  <Typography variant="h6" gutterBottom component="h6">
                    {restaurant.name}
                  </Typography>

                  <Typography variant="body1" gutterBottom component="body1">
                    Rating: {restaurant.reviewScore} / 6
                  </Typography>
                  <br />
                  <Typography variant="body1" gutterBottom component="body1">
                    Price: {convert_price_rating(restaurant.tagGroups)}
                  </Typography>
                  <br />
                  <Typography variant="body1" gutterBottom component="body1">
                    Address: {restaurant.location.address.number}{" "}
                    {restaurant.location.address.street}
                  </Typography>
                  <br />
                  <Typography variant="body1" component="p">
                    Contact: {restaurant.phoneNumber}
                  </Typography>
                </CardContent>

                <CardActions style={{ marginLeft: "5px", marginBottom: "5px" }}>
                  <BookingConfirmationModal
                    partner_name={partner_name}
                    restaurant={restaurant}
                    booking_date={booking_date}
                    booking_time={booking_time}
                    partner_url={partner_url}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
