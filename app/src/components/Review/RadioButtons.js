import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function FormControlLabelPlacement({
  partner_name,
  updateAttendence,
}) {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    updateAttendence(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={{ color: "black" }}>
        Did {partner_name} show up for your date?<span style={{ color: "red" }}>*</span>
      </FormLabel>
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value="top"
          control={
            <Radio
              checked={selectedValue === "b"} // 0 means never show up
              onChange={handleChange}
              value="b"
              name="radio-button-demo"
              inputProps={{ "aria-label": "B" }}
            />
          }
          label="No"
          labelPlacement="start"
        />
        <FormControlLabel
          value="start"
          control={
            <GreenRadio
              checked={selectedValue === "c"} // 1 means show up
              onChange={handleChange}
              value="c"
              name="radio-button-demo"
              inputProps={{ "aria-label": "C" }}
            />
          }
          label="Yes"
          labelPlacement="start"
        />
      </RadioGroup>
    </FormControl>
  );
}
