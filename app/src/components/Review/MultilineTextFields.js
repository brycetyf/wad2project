import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "100%",
    },
  },
}));

export default function MultilineTextFields({ updateTextReview }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <div>
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          rows={4}
          placeholder="Share your thoughts here"
          variant="outlined"
          onChange={(e) => updateTextReview(e)}
        />
      </div>
    </form>
  );
}
