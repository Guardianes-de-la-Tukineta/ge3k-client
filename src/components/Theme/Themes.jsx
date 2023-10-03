import React from "react";
import { Link } from "react-router-dom";
import game from "../../Images/vidio games.jpg";
import anime_themes from "../../Images/anime_themes.jpg";
import programming from "../../Images/programmer.jpg";
import gaming from "../../Images/gamming.jpg";

const Themes = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Link style={{ textDecoration: "none" }} to="/thematic/:nameThematic">
        <h1
          className="card-title"
          style={{
            color: "#FC6522",
            marginBottom: "25px",
          }}
        >
          Themes
        </h1>
      </Link>

      <div
        className="row align-items-center justify-content-center"
        style={{ marginBottom: "50px" }}
      >
        <div className="col-md-3">
          <div className="text-center">
            <div className="card-body">
              <img
                src={game}
                alt="game"
                className="rounded-circle"
                style={{ width: "250px", height: "250px" }}
              />
              <h5 className="card-title">Video Game</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="text-center">
            <div className="card-body">
              <img
                src={anime_themes}
                alt="anime_themes"
                className="rounded-circle"
                style={{ width: "250px", height: "250px" }}
              />
              <h5 className="card-title">Anime</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="text-center">
            <div className="card-body">
              <img
                src={programming}
                alt="programming"
                className="rounded-circle"
                style={{ width: "250px", height: "250px" }}
              />
              <h5 className="card-title">Programming</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="text-center">
            <div className="card-body">
              <img
                src={gaming}
                alt="gaming"
                className="rounded-circle"
                style={{ width: "250px", height: "250px" }}
              />
              <h5 className="card-title">Gaming</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
