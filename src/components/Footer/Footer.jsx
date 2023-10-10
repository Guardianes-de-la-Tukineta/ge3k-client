import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div style={{ backgroundColor: "black", color: "white", fontSize: '0.9rem' }}>
      <Container fluid >
        <Row className="p-3 pb-4">
          <Col>
            <h5 className={styles.titleH5}>FIND US IN</h5>
            <img
              className={styles.map}
              src="https://almacenesgredos.es/wp-content/uploads/2021/04/mapa.jpg"
              alt="localizacion de la tienda"
            />
          </Col>
          <Col>
            <h5 className={styles.titleH5}>STORE LEGAL</h5>
            <p>Refund and return policies</p>
            <Link to="/legal" className={styles.footerLink}>
              <p>Terms & Conditions</p>
            </Link>
          </Col>
          <Col>
            <h5 className={styles.titleH5}>FIND</h5>
            <p>SEARCH</p>
            <h5 className={styles.titleH5}>SOCIAL MEDIA</h5> 

            <p>
              <i className="bi bi-instagram"></i> Instagram
            </p>
            <p>
              <i className="bi bi-facebook"></i> Facebook
            </p>
            <p>
              <i className="bi bi-envelope"></i> Mail
            </p>
          </Col>
          <Col>
            <h5 className={styles.titleH5}>ABOUT US</h5>
            <p>
            Are you looking for an unforgettable gift for someone special or for yourself?
            </p>
            <p>Do you want to showcase your fandom and passion?</p>
            <p>
            Are you tired of not finding items featuring your favorite characters in physical stores?
            </p>
            <p>Enjoy shopping at <strong>Ge3kHub.shop</strong>🤓!</p>
          </Col>
        </Row>
   
      </Container>
      <div className={`${styles.guardianes} container-fluid text-center`} >Developed with ❤️ by the Guardians of Tukineta</div>
    </div>
  );
}

export default Footer;
