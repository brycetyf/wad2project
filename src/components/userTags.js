import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    color: "black",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function SmallOutlinedChips({ tags }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {Object.entries(tags).map(([key, value]) => (
        <Chip
          variant="outlined"
          avatar={<Avatar>{value}</Avatar>}
          label={key}
        ></Chip>
      ))}
    </div>
  );
}
