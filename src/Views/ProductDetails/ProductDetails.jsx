import React, { useEffect } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useStore } from "../../zustand/useStore/useStore";
import { Link } from "react-router-dom";
import { cartStore } from "../../zustand/cartStore/cartStore";

//HP el componente de llama ProductDetails  ya que podemos tener otros details ej, RatingDetails
function ProductDetails() {
  const { id } = useParams();
  const { getProductsDetails, productDetails, deletePorductDetail } = useStore(); // Utiliza el hook useStore para acceder al estado y a la función getProductsDetails
  const {addProductToCart}=cartStore() //cart store de zustand
  
  useEffect(() => {
    getProductsDetails(id);

    return (() => {
      deletePorductDetail(id)
    })
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

  //handlers
  const handlerAddToCart = ()=>{
    addProductToCart(productDetails)
  }
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
          {productDetails.discount === null ? (
            <h2 className={styles.Price}>Price ${productDetails.price}</h2>
          ) : (
            <>
              <h2 className={styles.oldPrice}>
                Price U$S {productDetails.price}
              </h2>
              <h2 className={styles.price}>Off ${productDetails.price - productDetails.price * (productDetails.discount / 100)}</h2>
            </>
          )}
          <h2 className={styles.stock}>In stock: {productDetails.stock} </h2>
          {/* <h2 className={styles.info}>ID: {id}</h2> */}

          <h2 className={styles.info}>
            Category:{" "}
            <Link
              to={"/category/" + productDetails.categoryName}
              className={styles.detailsLink}
            >
              {productDetails.categoryName}
            </Link>
          </h2>

          <h2 className={styles.info}>
            Thematic:{" "}
            <Link
              to={"/thematic/" + productDetails.themeName}
              className={styles.detailsLink}
            >
              {productDetails.themeName}
            </Link>
          </h2>

          <Button onClick={()=>handlerAddToCart()} style={buttonStyle}>
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
