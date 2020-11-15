import React from "react";

function Gif(gif_arr) {
  const gif_num = [Math.floor(Math.random() * 19)];
  return (
    <div>
      <h3>Ghost Me Not wishes you all the best</h3>
      <img src={gif_arr.gif_arr.data[gif_num].images.fixed_height.url} />
    </div>
  );
}

export default Gif;
