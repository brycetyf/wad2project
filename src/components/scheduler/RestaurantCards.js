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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
} from '@material-ui/core/';
import axios from "axios";



const useStyles = makeStyles(theme => ({
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
}))


//Updating Backend With the Booking details
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
                              <Button size="small" variant="contained" color="primary"
                                onClick={handleClickOpen}>
                                Book Now
                              </Button>

                              <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title" style={{ backgroundColor: 'grey' }}>{"Please check Booking Details before confirming!"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description" style={{ marginTop: 15 }}>
                                    <img src={restaurant.images[0].url} width="100%" height="70%"/>
                                    <br></br>
                                    <br />
                                    <Typography component="div">
                                      <Box color="text.primary">
                                        <h5 style={{ fontWeight: "bold" }}>Date with {partner_name}</h5>
                                        <br />
                                        <h5>Restaurant Name:</h5>
                                        <h6 style={{ textDecorationLine: 'underline' }}>{restaurant.name}</h6>
                                        <br />
                                        <h5>Address:</h5>
                                        <h6 style={{ textDecorationLine: 'underline' }}>{restaurant.location.address.number} {restaurant.location.address.street}</h6>
                                        <br />
                                        <h5>Date:</h5>
                                        <h6 style={{ textDecorationLine: 'underline' }}>{booking_date}</h6>
                                        <br />
                                        <h5>Time:</h5>
                                        <h6 style={{ textDecorationLine: 'underline' }}>{booking_time}</h6>
                                        <br />
                                      </Box>
                                    </Typography>
                                     
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
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
                                </DialogActions>
                              </Dialog>
                            </CardActions>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}