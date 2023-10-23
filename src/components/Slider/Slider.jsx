import React from "react";
import { Carousel } from "react-bootstrap";
import style from "./Slider.module.css";
import halloween from '../../Images/happy Geek.svg'
import blackfriday from '../../Images/blackfriday.svg'
import christmas from '../../Images/christmas.svg'

const Silder = () => {
  return (
    <div className={`carousel-container ${style.carousel}`}>
      <Carousel >
        <Carousel.Item>
          <img src={halloween} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={blackfriday} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={christmas} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Silder;
