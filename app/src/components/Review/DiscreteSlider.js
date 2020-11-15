import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80",
    textAlign: "center",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const funny_label_zero = [
  "Thank God it's over",
  "Never again",
  "Possibly the worst ever",
  "It was a nightmare",
  "I'd rather date Donald TRUMP",
];
const funny_label_max = [
  "I think I found the one",
  "Apple of my eye",
  "Best Date Ever",
  "More more more!",
  "10/10 would...",
];
const marks = [
  {
    value: 0,
    label: funny_label_zero[Math.floor(Math.random() * 4)],
  },
  {
    value: 100,
    label: funny_label_max[Math.floor(Math.random() * 4)],
  },
];

export default function DiscreteSlider({ updateRating }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="track-false-slider" gutterBottom>
        Rate your date experience
      </Typography>
      <Slider
        track={false}
        defaultValue={50}
        aria-labelledby="track-false-slider"
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        onChangeCommitted={(e, value) => updateRating(e, value)}
      />
    </div>
  );
}
