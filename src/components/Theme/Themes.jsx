import React from "react";
import { Link } from "react-router-dom";
import game from "../../Images/vidio games.jpg";
import anime_themes from "../../Images/anime_themes.jpg";
import programming from "../../Images/programmer.jpg";
import gaming from "../../Images/gamming.jpg";
import style from './Themes.module.css'

const Themes = () => {

  const gameImgUrl = 'https://res.cloudinary.com/dqoi2ez7t/image/upload/v1696480611/p5a4hscqi1prpncnn4f4.jpg'
  return (
    <div className={`${style.containerDiv}`}style={{ backgroundColor:'#f2f2f2', padding:'5rem 3rem', paddingBottom:'4rem'}}>
        <h3
          className={`card-title ${style.title}`}
        >
          Themes
        </h3>
   

      <div
        className={`row align-items-center justify-content-center ${style.containerCards}`}
        style={{ marginBottom: "50px" }}
      >
       <div className={`${style.cardContainer} col-xl-3 col-12 col-sm-6`}>
       <Link to="/thematic/Video-Games" ><div >
            <div className="card-body" style={{display:'flex', justifyContent:'center', flexDirection: 'column',alignItems: 'center' }}>
            <div  className="rounded-circle" style={{ width: "250px", height: "250px", overflow:"hidden"}}> 
              <img
                src='https://res.cloudinary.com/dqoi2ez7t/image/upload/v1698103683/ecekgpimtju6coozirot.png'
                alt="game"
                className={style.imgHovered}
              />
                  </div>
              <h5 className={style.titleThema} >Video Game</h5>
            </div>
          </div></Link>
        </div>


        <div className={`${style.cardContainer} col-xl-3 col-12 col-sm-6`}>
        <Link to="/thematic/Programming"><div className="text-center">
            <div className="card-body" style={{display:'flex', justifyContent:'center', flexDirection: 'column',alignItems: 'center' }}>
              <div  className="rounded-circle" style={{ width: "250px", height: "250px", overflow:"hidden"}}> 
              <img
                src='https://icon-library.com/images/programming-code-icon/programming-code-icon-15.jpg'
                alt="programming"

                className={style.imgHovered}
              /></div>
              <h5 className={style.titleThema} >Programming</h5>
            </div>
          </div></Link>
        </div>


        <div className={`${style.cardContainer} col-xl-3 col-12 col-sm-6`}>
        <Link to="/thematic/Anime">
          <div className="text-center">
            <div className="card-body" style={{display:'flex', justifyContent:'center', flexDirection: 'column',alignItems: 'center' }}>
              
            <div  className="rounded-circle" style={{ width: "250px", height: "250px", overflow:"hidden"}}> 
              <img
                src='https://res.cloudinary.com/dqoi2ez7t/image/upload/v1698103868/jqnzvstuoloyq3pnbuhk.jpg'
                alt="anime_themes"
                className={style.imgHovered}

              />
              </div>
              <h5 className={style.titleThema} >Anime</h5>
            </div>
          </div></Link>
        </div>

        

        <div className={`${style.cardContainer} col-xl-3 col-12 col-sm-6`}>
        <Link to="/thematic/Gaming" >
          <div className="text-center">
            <div className="card-body" style={{display:'flex', justifyContent:'center', flexDirection: 'column',alignItems: 'center' }}>
            <div  className="rounded-circle" style={{ width: "250px", height: "250px", overflow:"hidden"}}> 
              <img
                src='https://res.cloudinary.com/dqoi2ez7t/image/upload/v1698104946/xfk9yokdv1fcfgtficxe.png'
                alt="gaming"

                className={style.imgHovered}
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
