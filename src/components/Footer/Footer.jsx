import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../Images/logoBlanco.svg";
import SearchBar from "../SearchBar/SearchBar";
function Footer() {
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          fontSize: "0.9rem",
          padding: "2rem",
          color: "rgb(185, 185, 185)",
        }}
      >
        <Container fluid>
          <Row className="p-3 pb-4">
            <Col className="col-12 col-lg-3">
              <h5 className={styles.titleH5}>FIND US IN</h5>
              <Link
                to="https://www.google.com/maps/place/Geekstore2012/@-34.6060354,-58.3963625,21z/data=!4m6!3m5!1s0x95bccaea234fd05f:0xfdc07c392063ba12!8m2!3d-34.606075!4d-58.396247!16s%2Fg%2F11h7s4g625?entry=ttu"
                className={styles.footerLink}
              >
                <img
                  className={styles.map}
                  src="https://almacenesgredos.es/wp-content/uploads/2021/04/mapa.jpg"
                  alt="localizacion de la tienda"
                />
              </Link>
            </Col>
            <Col className="col-12  col-lg-3">
              <h5 className={styles.titleH5}>STORE LEGAL</h5>
              {/* <p>Refund and return policies</p> */}
              <Link to="/legal" className={styles.footerLink}>
                <p>Terms & Conditions</p>
              </Link>

              <h5 className={styles.titleH5}>CONTACT</h5>
              <Link to="/send-email" className={styles.footerLink}>
                <p>Contact Us </p>
              </Link>
            </Col>
            <Col className="col-12 col-lg-3">
              <h5 className={styles.titleH5}>FIND</h5>
              {/* <p>SEARCH</p> */}
              <div className={styles.SearchBar}>
                <SearchBar />
              </div>
              <h5 className={styles.titleH5}>SOCIAL MEDIA</h5>
              <p>
                <Link
                  to="https://www.instagram.com/geek_shop.mv/"
                  className={styles.footerLink}
                >
                  <i className="bi bi-instagram"></i> Instagram
                  {/* <i className="bi bi-envelope"></i> Mail */}
                </Link>
              </p>
              <p>
                <Link
                  to="https://www.facebook.com/profile.php?id=61552486067675"
                  className={styles.footerLink}
                >
                  <i className="bi bi-facebook"></i> Facebook
                  {/* <i className="bi bi-envelope"></i> Mail */}
                </Link>
              </p>
              <p>
                <Link to="/send-email" className={styles.footerLink}>
                  <i className="bi bi-envelope"></i> Mail
                </Link>
              </p>
            </Col>
            <Col className="col-12 col-lg-3">
              <h5 className={styles.titleH5}>ABOUT US</h5>
              <p>
                Are you looking for an unforgettable gift for someone special or
                for yourself?
              </p>
              <p>Do you want to showcase your fandom and passion?</p>
              <p>
                Are you tired of not finding items featuring your favorite
                characters in physical stores?
              </p>
              <p>
                Enjoy shopping at{" "}
                <Link to="/team" className={styles.footerLink}>
                  <strong>Ge3kHub.shop</strong>🤓!
                </Link>
              </p>
            </Col>
          </Row>

          <div className="d-flex align-center justify-content-center">
            <img className={styles.logo} src={logo} alt="ge3khub shop" />
          </div>
        </Container>
      </div>
      <Link to="/team" className={styles.footerLink}>
        <div className={`${styles.guardianes} container-fluid text-center`}>
          Developed with ❤️ by the <strong>Guardians of Tukineta</strong>
        </div>
      </Link>
    </>
  );
}

export default Footer;
