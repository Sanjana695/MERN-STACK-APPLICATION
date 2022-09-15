import React from "react";
import Zoom from "react-reveal/Zoom";
import homeScreen from "../images/homeScreen.jpeg";
import "../style/index.css";

function Home() {
  return (
    <div className="imageContainer">
      {/* <img src={homeScreen} alt="homeScreen.jpeg" /> */}
      <div className="text-center textContainer">
        <Zoom>
          <p className="pt-5">WELCOME</p>
          <h1>TO THE MERN STACK APPLICATION</h1>
        </Zoom>
      </div>
    </div>
  );
}
export default Home;
