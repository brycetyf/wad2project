import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";

function TinderCards() {
  const [people, setPeople] = useState([
    {
      name: "steve jobs",
      url:
        "https://i.pinimg.com/originals/34/4a/9a/344a9a3f937b64d43cdd75554617297d.jpg",
    },
    {
      name: "mark zuckerberg",
      url:
        "https://i0.wp.com/www.usmagazine.com/wp-content/uploads/2020/07/Mark-Zuckerberg-Spooks-the-Internet-With-Too-Much-Sunscreen-on-His-Face-in-Hawaii-01.jpg?crop=557px%2C82px%2C896px%2C471px&resize=1200%2C630&ssl=1&quality=86&strip=all",
    },
  ]);

  //Spread operator
  // setPeople([...people,'x','y'])

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
