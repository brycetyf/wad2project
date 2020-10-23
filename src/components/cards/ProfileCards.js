import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import "../../styles/SwipeButtons.css";
import "../../styles/TinderCards.css";
import axios from "axios";

const db = [
  {
    name: "Steve Jobs",
    url:
      "https://i.pinimg.com/originals/34/4a/9a/344a9a3f937b64d43cdd75554617297d.jpg",
    age: "42",
    description: "People don't know what they want",
    ghost_rating: "0/5",
    username: "steve123",
  },
  {
    name: "Bill Gates",
    url:
      "https://www.thegrandreport.com/wp-content/uploads/2016/02/image-558.jpeg",
    age: "55",
    description: "Lmao",
    ghost_rating: "5/5",
    username: "bill123",
  },
  {
    name: "Elon Musk",
    url:
      "data:image/jpeg;base64,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",
    age: "32",
    description: "Taking TSLA private at 420.69",
    ghost_rating: "4.20/5",
    username: "elon123",
  },
  {
    name: "Mark Zuckerberg",
    url:
      "https://i0.wp.com/www.usmagazine.com/wp-content/uploads/2020/07/Mark-Zuckerberg-Spooks-the-Internet-With-Too-Much-Sunscreen-on-His-Face-in-Hawaii-01.jpg?crop=557px%2C82px%2C896px%2C471px&resize=1200%2C630&ssl=1&quality=86&strip=all",
    age: "35",
    description: "I am a clown",
    ghost_rating: "3.62/5",
    username: "mark123",
  },
];

const TinderCards = ({ profiles }) => {
  console.log("OK AXIOS DONE AND WE ARE HERE");
  console.log(db);
  const alreadyRemoved = [];
  let charactersState = db;
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState(); //do not remove huhu

  const childRefs = useMemo(
    () =>
      Array(db.length)
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
      const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
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
