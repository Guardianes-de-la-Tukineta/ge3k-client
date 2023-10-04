import React from "react";
import { Link } from "react-router-dom";
import game from "../../Images/vidio games.jpg";
import anime_themes from "../../Images/anime_themes.jpg";
import programming from "../../Images/programmer.jpg";
import gaming from "../../Images/gamming.jpg";
import style from './Themes.module.css'

const Themes = () => {
  return (
    <div style={{ padding: "20px" }}>
        <h1
          className="card-title"
          style={{
            color: "#FC6522",
            marginBottom: "25px",
          }}
        >
          Themes
        </h1>
   

      <div
        className="row align-items-center justify-content-center"
        style={{ marginBottom: "50px" }}
      >
       <div className={`${style.cardContainer} col-md-3`}>
       <Link to="/thematic/Video-Games" ><div >
            <div className="card-body" style={{display:'flex', justifyContent:'center', flexDirection: 'column',alignItems: 'center' }}>
            <div  className="rounded-circle" style={{ width: "250px", height: "250px", overflow:"hidden"}}> 
              <img
                src={game}
                alt="game"
                style={{ height: "250px"}}
              />
                  </div>
              <h5 className={style.titleThema} >Video Game</h5>
            </div>
          </div></Link>
        </div>

        <div className={`${style.cardContainer} col-md-3`}>
        <Link to="/thematic/Anime">
          <div className="text-center">
            <div className="card-body" style={{display:'flex', justifyContent:'center', flexDirection: 'column',alignItems: 'center' }}>
              
            <div  className="rounded-circle" style={{ width: "250px", height: "250px", overflow:"hidden" }}> 
              <img
                src={anime_themes}
                alt="anime_themes"
                style={{ height: "300px"}}

              />
              </div>
              <h5 className={style.titleThema} >Anime</h5>
            </div>
          </div></Link>
        </div>

        <div className={`${style.cardContainer} col-md-3`}>
        <Link to="/thematic/Programming"><div className="text-center">
            <div className="card-body" style={{display:'flex', justifyContent:'center', flexDirection: 'column',alignItems: 'center' }}>
              <div  className="rounded-circle" style={{ width: "250px", height: "250px", overflow:"hidden" }}> <img
                src={programming}
                alt="programming"
                style={{ height: "300px"}}
    
              /></div>
              <h5 className={style.titleThema} >Programming</h5>
            </div>
          </div></Link>
        </div>

        <div className={`${style.cardContainer} col-md-3`}>
        <Link to="/thematic/Gaming" >
          <div className="text-center">
            <div className="card-body" style={{display:'flex', justifyContent:'center', flexDirection: 'column',alignItems: 'center' }}>
            <div  className="rounded-circle" style={{ width: "250px", height: "250px", overflow:"hidden" }}> 
              <img
                src={gaming}
                alt="gaming"

                style={{ height: "300px"}}
              /></div>
              <h5 className={style.titleThema} >Gaming</h5>
            </div>
          </div></Link>
        </div>
      </div>
    </div>
  );
};

export default Themes;
