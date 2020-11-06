import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    maxWidth: 600,
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
    maxWidth: 200,
    height: 200,
    marginLeft: 0,
  },
  avatar: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
}));

export default function ReservationCard({
  res_name,
  res_url,
  contact,
  booking_date,
  booking_time,
  booking_partner,
  partner_url,
}) {
  const classes = useStyles();
  const theme = useTheme();
  console.log(partner_url);
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={res_url} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {res_name}
          </Typography>
          <Typography variant="subtitle1" className={classes.avatar}>
            Your Date: &nbsp;&nbsp;
            <Link to={`/profile/${booking_partner}`}>
              <Avatar src={partner_url} alt={booking_partner} />
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;{booking_partner}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Booking Details: {booking_time}hrs on {booking_date}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Restaurant Contact: {contact}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
