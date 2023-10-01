import React, { useEffect } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useStore } from "../../zustand/useStore/useStore";
import { Link } from "react-router-dom";

//HP el componente de llama ProductDetails  ya que podemos tener otros details ej, RatingDetails
function ProductDetails() {
  const { id } = useParams();

  const { getProductsDetails, productDetails } = useStore(); // Utiliza el hook useStore para acceder al estado y a la función getProductsDetails

  useEffect(() => {
    getProductsDetails(id);
  }, [id]);

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

  const isFav = (id) => {
    // el segundo parametro es el user, hay que ovtenerlo del localstorage
    // const userId =localstorage,user.id TUKITUKI
    return id == "TUKI" || id == "tuki";
  }; //esto por ahora hace cualquier mentira

  return (
    <Container className={styles.productDetailsConteiner}>
      <Row>
        <Col>
          <img
            className={styles.image}
            src={productDetails.image}
            alt={productDetails.name}
          />
        </Col>
        <Col>
          <h1 className={styles.title}>{productDetails.name}</h1>
          <h2 className={styles.stock}>{productDetails.description}</h2>
          {/* HP. muestro el descuento solo si el producto lo tiene */}
          {productDetails.discount === 0 ? (
            <h2 className={styles.Price}>Price U$S {productDetails.price}</h2>
          ) : (
            <>
              <h2 className={styles.oldPrice}>
                Price U$S {productDetails.price}
              </h2>
              <h2 className={styles.price}>Off {productDetails.discount}</h2>
            </>
          )}
          <h2 className={styles.stock}>In stock: {productDetails.stock} </h2>
          {/* <h2 className={styles.info}>ID: {id}</h2> */}

          <h2 className={styles.info}>
            Category:{" "}
            <Link
              to={"/Category/" + productDetails.Category}
              className={styles.detailsLink}
            >
              {productDetails.Category}
            </Link>
          </h2>

          <h2 className={styles.info}>
            Thematic:{" "}
            <Link
              to={"/thematic/" + productDetails.Theme}
              className={styles.detailsLink}
            >
              {productDetails.Theme}
            </Link>
          </h2>

          <Button style={buttonStyle}>
            <i
              className="bi bi-cart4"
              style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
            ></i>{" "}
            Add to card
          </Button>
          {/* HP muestro el corazon que corresponda si es favorito o no */}
          {isFav(id) ? (
            <i
              className="bi bi-heart-fill"
              style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
            ></i>
          ) : (
            <i
              className="bi bi-heart"
              style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
            ></i>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;