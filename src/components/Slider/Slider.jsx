import React from "react";
import { Carousel } from "react-bootstrap";
import slider1 from "../../Images/SLIDER_02.jpg";
import slider2 from "../../Images/SLIDER_01.5.jpg";
import slider3 from "../../Images/SLIDER_02.5.jpg";
import style from "./Slider.module.css";

const Silder = () => {
  return (
    <div className={`carousel-container ${style.carousel}`}>
      <Carousel>
        <Carousel.Item>
          <img src={slider1} alt="slider1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={slider2} alt="slider1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={slider3} alt="slider1" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Silder;
