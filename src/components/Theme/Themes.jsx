import React from "react";
import { Link } from "react-router-dom";
import Dc from "../../Images/DC_Comics_logo.png";
import Marvel from "../../Images/Marvel-Comics-logo.png";
import HarryPotter from "../../Images/harry potter.png";
import DragonBall from "../../Images/DragonBall.png";
import StarWars from "../../Images/Star_Wars_Logo.svg.png";
import GameOfThrones from "../../Images/descarga1.png";
import StrangerThings from "../../Images/Stranger-Things-logo.png";

const Themes = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Link style={{ textDecoration: "none" }} to="/thematic/:nameThematic">
        <h1
          className="card-title"
          style={{
            color: "#FC6522",
            marginBottom: "30px",
          }}
        >
          Themes
        </h1>
      </Link>
      <div className="row align-items-center d-flex justify-content-between">
        <img
          src={Dc}
          alt="dc"
          className="img-fluid"
          style={{ maxWidth: "250px" }}
        />
        <img
          src={Marvel}
          alt="marvel"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
        <img
          src={HarryPotter}
          alt="harrypotter"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
        <img
          src={DragonBall}
          alt="dragonBall"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
        <img
          src={StarWars}
          alt="StarWars"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
        <img
          src={GameOfThrones}
          alt="GameOfThrones"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
        <img
          src={StrangerThings}
          alt="StrangerThings"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
      </div>
    </div>
  );
};

export default Themes;
