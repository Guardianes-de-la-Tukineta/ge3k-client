import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer style={{ backgroundColor: "black", color: "white" }}>
      <Container>
        <Row>
          <Col>
            <h5 className={styles.titleH5}>FIND US IN</h5>
            <img
              className={styles.map}
              src="https://almacenesgredos.es/wp-content/uploads/2021/04/mapa.jpg"
              alt=""
            />
          </Col>
          <Col>
            <h5 className={styles.titleH5}>STORE LEGAL</h5>
            <p>Refund and return policies</p>
            <p>Terminos y condiciones</p>
            {/* <h5>MICUENTA</h5>
            <p>Loguin</p>
            <p>Detalles de mi cuenta</p>
            <p>Recuperar Password </p>
            <p>Mis pedidos</p>
            <p>Mis direcciones</p> */}
          </Col>
          <Col>
            <h5 className={styles.titleH5}>FIND</h5>
            <p>SEARCH</p>
            <h5>Bustanos en redes</h5>
            <p>
              <i class="bi bi-instagram"></i> Instagram
            </p>
            <p>
              <i class="bi bi-facebook"></i> Facebook
            </p>
            <p>
              <i class="bi bi-envelope"></i> Mail
            </p>
          </Col>
          <Col>
            <h5 className={styles.titleH5}>ABOUT US</h5>
            <p>
              ¿Estas buscando un regalo inolvidable para alguien especial o para
              ti mismo?
            </p>
            <p>¿Quieres demostrar tu fanatismo y pasión ?</p>
            <p>
              ¿Estas cansado de no encontrar los artículos de tus personajes
              favoritos en las tiendas físicas?
            </p>
            <p>Disfruta comprando!!!</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
