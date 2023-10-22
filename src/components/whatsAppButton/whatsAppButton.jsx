import React from "react";
import whatsApp from "../../Images/124034.png";
import style from "./whatsAppButton.module.css";

const WhatsAppButton = () => {
  return (
    <div className={style.whatsappButton}>
      <a
        href="https://wa.me/573182101430"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={whatsApp} alt="WhatsApp" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
