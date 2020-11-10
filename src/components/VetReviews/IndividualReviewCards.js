import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: "50%",
    marginTop: "50px",
    textAlign: "center",
    margin: "auto",
  },
});

export default function MediaCard({
  reviewer,
  review_content,
  comment_id,
  ApproveReject,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {reviewer}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {review_content}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "inline" }}>
        <Button
          size="small"
          color="primary"
          onClick={() => ApproveReject(comment_id, 1)}
        >
          Show
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => ApproveReject(comment_id, 0)}
        >
          Hide
        </Button>
      </CardActions>
    </Card>
  );
}
