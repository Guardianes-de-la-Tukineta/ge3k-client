import React, { useEffect } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";

function Details() {
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(getCountryDetail(id));
  // }, [id, dispatch]);

  // const productDetail = useSelector((state) => state.detail);
  const buttonStyle = {
    backgroundColor: "#ff6824",
    borderColor: "#ff6824",
    color: "black", // Cambia el color del texto a blanco o el color deseado
    paddingRight: "22px",
    paddingBottom: "2px",
    paddingTop: "2px",
    marginRight: "20px",
  };

  return (
    <Container className={styles.productDetailsConteiner}>
      <Row>
        <Col>
          <img
            className={styles.image}
            src="https://ih1.redbubble.net/image.4982464450.2728/ssrco,pullover,womens,101010:01c5ca27c6,front,tall_three_quarter,750x1000-bg,f8f8f8.u2.jpg"
            alt="pullover,womens"
          />
        </Col>
        <Col>
          <h1 className={styles.title}>Pullover Grils geek</h1>
          <h2 className={styles.oldPrice}>Price $ 58.300</h2>
          <h2 className={styles.price}>Off $ 39.999</h2>
          <h2 className={styles.stock}>In stock: 9</h2>
          <h2 className={styles.info}>ID: {id}</h2>
          <h2 className={styles.info}>Category: Pullovers</h2>
          <h2 className={styles.info}>Theme: Coders</h2>
          <Button style={buttonStyle}>
            <i
              className="bi bi-cart4"
              style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
            ></i>{" "}
            Add to card
          </Button>
          <i
            className="bi bi-heart"
            style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
          ></i>
          {/* <i
            className="bi bi-heart-fill"
            style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
          ></i> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Details;
