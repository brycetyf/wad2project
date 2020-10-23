import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import "../../styles/SwipeButtons.css";
import "../../styles/TinderCards.css";

const alreadyRemoved = [];
let charactersState = [];
var first_load = true;

const TinderCards = ({ profiles }) => {
  console.log("OK AXIOS DONE AND WE ARE HERE");

  if (first_load) {
    charactersState = profiles;
    first_load = false;
  }

  const [characters, setCharacters] = useState(profiles);
  const [lastDirection, setLastDirection] = useState();
  console.log(characters);
  const childRefs = useMemo(
    () =>
      Array(profiles.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.name !== name
    );
    setCharacters(charactersState);
  };

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
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
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
          >
            <Link to={`/profile/${character.username}`}>
              <div
                style={{ backgroundImage: "url(" + character.url + ")" }}
                className="card"
              >
                <div>
                  <p>
                    {character.name}, {character.age}
                  </p>
                  <p>{character.description}</p>
                  {character.ghost_rating}
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
    </div>
  );
};

export default TinderCards;
