import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function LocationSelector({ updateLocation }) {
  const classes = useStyles();
  const [location, setLocation] = React.useState("Central");

  const handleChange = (event) => {
    console.log(event.target.value);
    setLocation(event.target.value);
    updateLocation(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          onChange={handleChange}
        >
          <MenuItem value={"central"}>Central</MenuItem>
          <MenuItem value={"north"}>North</MenuItem>
          <MenuItem value={"south"}>South</MenuItem>
          <MenuItem value={"east"}>East</MenuItem>
          <MenuItem value={"west"}>West</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
