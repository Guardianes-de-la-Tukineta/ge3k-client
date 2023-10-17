import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useStore } from "../../zustand/useStore/useStore";
import { Link } from "react-router-dom";
import { cartStore } from "../../zustand/cartStore/cartStore";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import Spinner from "react-bootstrap/Spinner";
import { favoriteStore } from "../../zustand/favoriteStore/favoriteStore";

//HP el componente de llama ProductDetails  ya que podemos tener otros details ej, RatingDetails
function ProductDetails() {
  const { id } = useParams();
  const { getProductsDetails, productDetails, deletePorductDetail } =
    useStore(); // Utiliza el hook useStore para acceder al estado y a la función getProductsDetails
  const { addProductToCart } = cartStore(); //cart store de zustand
  const { isAuthenticated } = useAuth0(); // para saber si estoy logueado
  const { currentCustomer } = customerStore();
  const { favorites, addProductFavorite, deleteProductFavorite, updateLocalStorage } = favoriteStore()
  const [isFav, setIsFav] = useState(false); // para cambiar el estado de fav y no fav
  const [isFavDisabled, setIsFavDisabled] = useState(false); // para deshabilitar momentaneamente el boton de fav


  useEffect(() => {
    const fetchData = async() => {     
      await getProductsDetails(id); // Obtiene los nuevos detalles del producto      
    };    
    fetchData();    
    return ()=>{
      deletePorductDetail() //limpiar el deteail cuando se desmonta el componente
    }
  }, [id]);

  useEffect(() => { // la info de productDetails se demora unos segundos, por eso cuando le llegue la info se renderiza el corazon
    updateLocalStorage(favorites) 
    if (productDetails.id && favorites.findIndex((elem) => elem.id === productDetails.id) !== -1) { //si esta en favoritos pintamos el corazon       
      setIsFav(true)
    } 
  }, [favorites,productDetails]);
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

  //handlers
  const handlerAddToCart = () => {
    addProductToCart(
      isAuthenticated || false,
      currentCustomer.id,
      productDetails
    );
  };
  const handlerIsFav = () => {
    if (isFavDisabled) { //evita q el user haga click dos veces seguidas al fav sin dar tiempo de procesar en back
      return;
    }
    setIsFavDisabled(true);
    if (!isFav) { //si no esta en favoritos ya      
      addProductFavorite(isAuthenticated, currentCustomer.id, productDetails)
      setIsFav(true)
    } else {
      deleteProductFavorite(isAuthenticated, currentCustomer.id, productDetails.id)
      setIsFav(false)
    }
    // Habilitar el botón después de 1 seg
    setTimeout(() => {
      setIsFavDisabled(false);
    }, 1000);
  }
  return (
    <Container className={styles.productDetailsConteiner}>
      {!productDetails.image ? ( //controlo que el estado ya tenga la propiedad imagen
        <Row style={{ padding: "100px", justifyContent: "center" }}>
          <Spinner
            style={{ padding: "100px" }}
            animation="border"
            variant="dark"
          />
        </Row>
      ) : (
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
                <h2 className={styles.price}>
                  Off $
                  {productDetails.price -
                    productDetails.price * (productDetails.discount / 100)}
                </h2>
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

            <Button onClick={() => handlerAddToCart()} style={buttonStyle}>
              <i
                className="bi bi-cart4"
                style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
              ></i>{" "}
              Add to card
            </Button >
            {/* HP muestro el corazon que corresponda si es favorito o no */}
            <button style={{ border: "none", backgroundColor: "transparent" }} onClick={() => handlerIsFav()}>
              {
                !isFav ? <i style={{ color: "red", fontSize: "1.2rem", padding: "5px" }} className="bi bi-suit-heart "></i>
                  : <i style={{ color: "red", fontSize: "1.2rem", padding: "5px" }} className="bi bi-suit-heart-fill"></i> //para traer el icono de corazon lleno o vació
              }
            </button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductDetails;
