import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import "../../styles/SwipeButtons.css";
import "../../styles/ProfileCards.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const alreadyRemoved = [];
let charactersState = [];
var first_load = true;


const TinderCards = ({
  profiles,
  setLastViewed_cards,
  setLastViewed_profile,
  update_messages,
}) => {
  if (first_load) {
    charactersState = profiles;
    first_load = false;
  }

  const [characters, setCharacters] = useState(profiles);

  /* 
  FUNCTION FOR POP UP
  STILL NEED TO MAKE IT TRIGGER API CALL TO CREATE CONVERSATION
  */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* 
  FUNCTION FOR UPDATING BACKEND WITH MATCH
  */
  const update_backend_match = (unique_id, name, url) => {
    let encoded_url = encodeURIComponent(url);
    let api_url =
      `http://127.0.0.1:5001/successful_match/unique_id=${unique_id}&name=${name}&url=` +
      encoded_url;
    axios
      .get(api_url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => update_messages());
  };

  const childRefs = useMemo(
    () =>
      Array(profiles.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  const swiped = (direction, nameToDelete, unique_id, character) => {
    // console.log("removing: " + nameToDelete);
    // setLastDirection(direction);
    setLastViewed_profile(unique_id - 1);
    alreadyRemoved.push(nameToDelete);

    if (direction === "right" && character.user_indicated_interest === true) {
      console.log(character);
      handleShow();
      update_backend_match(character.unique_id, character.name, character.url);
      // TRIGGER THE API CALL TO CREATE THE MATCH HERE
    }
  };

  const swipe = (dir, user_indicated_interest) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
    setLastViewed_cards();
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = profiles.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {characters.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) =>
              swiped(dir, character.name, character.unique_id, character)
            }
            onCardLeftScreen={() =>
              outOfFrame(character.name, character.unique_id)
            }
          >
            <Link
              to={`/profile/${character.unique_id}`}
              className="profile__link"
              cursor="pointer"
            >
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <div className="card__description">
                  <div className="main__details">
                    {character.name}, {character.age}
                  </div>
                  <div className="description">{character.description}</div>
                </div>
              </div>
            </Link>
          </TinderCard>
        ))}
      </div>
      <div className="swipeButtons">
        <IconButton
          onClick={() => swipe("left")}
          className="swipeButtons__left"
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <IconButton
          onClick={() => swipe("right")}
          className="swipeButtons__right"
        >
          <FavoriteIcon fontSize="large" />
        </IconButton>
      </div>
      <Modal show={show} onHide={handleClose} className="popup__body">
        <Modal.Body className="popup__content">
          Woohoo, it's a match!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="popup__button"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            className="popup__button"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TinderCards;
