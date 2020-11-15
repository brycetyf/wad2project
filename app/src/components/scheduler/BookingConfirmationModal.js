import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core/";
import axios from "axios";
import { Link } from "react-router-dom"; 

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
    padding: theme.spacing(2),
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
}));

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

function BookingConfirmationModal({
  partner_name,
  restaurant,
  booking_date,
  booking_time,
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
    <div>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Book Now
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h3 id="simple-modal-title">Date With {partner_name}</h3>
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
            {restaurant.location.address.number}{" "}
            {restaurant.location.address.street}
          </p>
          <div style={{ textAlign: "center", margin: "auto" }}>
            <Button onClick={handleClose} color="primary">
              Go Back
            </Button>
            <Link to="/">
              <Button
                onClick={() => {
                  {
                    handleClose();
                  }
                  {
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
                    );
                  }
                }}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookingConfirmationModal;
