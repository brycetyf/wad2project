import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SimpleModal from "../popup_modal";
import CardActions from "@material-ui/core/CardActions";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "15px",
    alignItems: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    flex: "1 0 auto",
    width: "100%",
    minWidth: 300,
    maxHeight: 220,
    minHeight: 200,
    margin: "auto",
  },
  avatar: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
}));

const cancelDate = (res_id) => {
  axios.get(`http://127.0.0.1:5001/delete_reservation/${res_id}`);
};

export default function ReservationCard({
  res_id,
  res_name,
  res_url,
  contact,
  booking_date,
  booking_time,
  booking_partner,
  partner_url,
  dateid,
  upcoming,
  reviewer_name,
  vocab,
}) {
  const classes = useStyles();
  const theme = useTheme();
  // console.log(vocab);
  return (
    <div>
      {
        // check if it is a pass date
        upcoming ? (
          <div>
            <Card className={classes.root}>
              <CardContent>
                <CardMedia
                  className={classes.cover}
                  image={res_url}
                  title={res_name}
                />
                <Typography variant="h6" gutterBottom component="h6">
                  {res_name}
                </Typography>

                <Typography variant="body1" className={classes.avatar}>
                  Your Date: &nbsp;&nbsp;
                  <Link to={`/profile/${booking_partner}`}>
                    <Avatar src={partner_url} alt={booking_partner} />
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;{booking_partner}
                </Typography>
                <Typography variant="body1">
                  Booking Details: {booking_time}hrs on {booking_date}
                </Typography>
                <Typography variant="body1">
                  Restaurant Contact: {contact}
                </Typography>

                <div
                  style={{
                    paddingTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link to={`/DateDetails/${dateid}`}>
                    <Button
                      variant="outlined"
                      size="small"
                      classes={{ label: "detail__button" }}
                      style={{ marginRight: "10px" }}
                    >
                      More Details
                    </Button>
                  </Link>
                  <SimpleModal
                    modalTitle={"Oh? 🤔"}
                    modalBody={`By clicking the button below, you are confirming that you want to cancel this reservation.`}
                    cancelDateFunction={cancelDate}
                    res_id={res_id}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <Card className={classes.root}>
              <CardContent>
                <Link to={`/profile/${booking_partner}`}>
                  <CardMedia className={classes.cover} image={partner_url} />
                </Link>
                <Typography variant="h5" color="textPrimary">
                  {booking_partner}
                </Typography>

                <Typography variant="body1" color="textPrimary">
                  {booking_date}
                </Typography>

                <Typography component="body1" variant="body1">
                  {res_name}
                </Typography>

                <div
                  style={{
                    paddingTop: "10px",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to={`/Review/${booking_partner}/${res_id}/${reviewer_name}`}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      classes={{ label: "detail__button" }}
                    >
                      Leave a review
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }
    </div>
  );
}
