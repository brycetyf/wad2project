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

const alreadyRemoved = [];
let charactersState = [];
var first_load = true;

const TinderCards = ({
  profiles,
  setLastViewed_cards,
  setLastViewed_profile,
}) => {
  if (first_load) {
    charactersState = profiles;
    first_load = false;
  }

  const [characters, setCharacters] = useState(profiles);

  /* 
  SHOW MODAL POP UP WHEN THE USER GETS A MATCH 

  code for MODAL
  */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const matched_popup = (user_indicated_interest) => {
    if (user_indicated_interest) {
      handleShow();
    }
  };
  /* 
  SHOW MODAL POP UP WHEN THE USER GETS A MATCH 
  */
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

  const swiped = (
    direction,
    nameToDelete,
    unique_id,
    user_indicated_interest
  ) => {
    // console.log("removing: " + nameToDelete);
    // setLastDirection(direction);
    setLastViewed_profile(unique_id - 1);
    alreadyRemoved.push(nameToDelete);
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
              swiped(
                dir,
                character.name,
                character.unique_id,
                character.user_indicated_interest
              )
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TinderCards;
