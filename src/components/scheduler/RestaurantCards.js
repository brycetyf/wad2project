import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    CardMedia,
    Button,
    Modal,
} from '@material-ui/core/';
import axios from "axios";


function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    media: {
      height: 300,
    },
    fullHeightCard: {
      height: "100%",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "0px solid #000",
      boxShadow: theme.shadows[0],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center",
    },
}))


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
    //console.log(restaurants);

    const [modalStyle] = React.useState(getModalStyle);

    //For Dialog Box
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };



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
                        <Card className={classes.fullHeightCard}>
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
                                onClick={handleClickOpen}>
                                Book Now
                              </Button>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                              >
                                <div style={modalStyle} className={classes.paper}>
                                  <h5 id="simple-modal-title">Please Check Booking Details Before Confirming!</h5>
                                  <h2 id="simple-modal-title">Date With {partner_name}</h2>
                                  <p id="simple-modal-description">
                                    <br />
                                    <b>Restaurant Name</b>
                                    <br />
                                    {restaurant.name}
                                    <br />
                                    <b>Date</b>
                                    <br />
                                    {booking_date}
                                    <br />
                                    <b>Time</b>
                                    <br />
                                    {booking_time}
                                    <br />
                                    <b>Address</b>
                                    <br />
                                    {restaurant.location.address.number} {restaurant.location.address.street}
                                  </p>

                                  <Button onClick={handleClose} color="primary">
                                    Go Back
                                  </Button>
                                  <Button onClick={() => {
                                    {handleClose()};
                                    {sendBooking(
                                      restaurant.name,
                                      restaurant.location.coordinates.longitude,
                                      restaurant.location.coordinates.latitude,
                                      restaurant.images[0].url,
                                      restaurant.phoneNumber,
                                      booking_date,
                                      booking_time,
                                      partner_name,
                                      partner_url
                                    )}
                                  }} color="primary" autoFocus>
                                    Confirm Booking
                                  </Button>

                                </div>
                              </Modal>
                            </CardActions>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}