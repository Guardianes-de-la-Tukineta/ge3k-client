import React from "react";
import { Carousel } from "react-bootstrap";
import style from "./Slider.module.css";


const Silder = () => {
  return (
    <div className={`carousel-container ${style.carousel}`}>
      <Carousel >
        <Carousel.Item>
          <img src="https://res.cloudinary.com/dqoi2ez7t/image/upload/v1698114925/rz18d8et0qlvllbatcpi.png" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://res.cloudinary.com/dqoi2ez7t/image/upload/v1698115082/scc45u33scq4tefitqt1.png" />
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://res.cloudinary.com/dqoi2ez7t/image/upload/v1698115081/jk8gwnc4dhkqtwy6fmdz.png" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Silder;
