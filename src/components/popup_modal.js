import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
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

export default function SimpleModal({
  modalTitle,
  modalBody,
  modalConfirmationButton,
  cancelDateFunction,
  res_id,
}) {
  console.log(res_id);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{modalTitle}</h2>
      <p id="simple-modal-description">{modalBody}</p>
      {modalConfirmationButton}
    </div>
  );

  const CompositeFunction = (res_id) => {
    handleClose();
    cancelDateFunction(res_id);
  };

  return (
    <div>
      {cancelDateFunction ? (
        <div>
          <Button
            variant="outlined"
            size="small"
            classes={{ label: "detail__button" }}
            onClick={handleOpen}
          >
            Cancel Date
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">{modalTitle}</h2>
              <p id="simple-modal-description">{modalBody}</p>
              <Link to={"/myProfile"}>
                <IconButton
                  type="button"
                  className="swipeButtons__right review__confirm__button"
                  onClick={() => CompositeFunction(res_id)}
                >
                  <DoneIcon fontSize="large" />
                </IconButton>
              </Link>
            </div>
          </Modal>
        </div>
      ) : (
        <div>
          <IconButton
            type="button"
            onClick={handleOpen}
            className="swipeButtons__right review__confirm__button"
          >
            <PersonAddIcon fontSize="large" />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
      )}
    </div>
  );
}
