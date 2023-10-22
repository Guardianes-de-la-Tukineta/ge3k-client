import React from "react";
import { Carousel } from "react-bootstrap";
import style from "./Slider.module.css";

const Silder = () => {
  return (
    <div className={`carousel-container ${style.carousel}`}>
      <Carousel>
        <Carousel.Item>
          <img src='https://res.cloudinary.com/dqoi2ez7t/image/upload/v1697650596/tbqgtgutkndjqmhblvjx.png' alt="slider1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src='https://res.cloudinary.com/dqoi2ez7t/image/upload/v1697652938/nunoyahufhm7njldfo8r.jpg' alt="slider1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src='https://res.cloudinary.com/dqoi2ez7t/image/upload/v1697652929/ny7yb231bsuwugtbjpph.jpg' alt="slider1" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Silder;
