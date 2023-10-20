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
import ReactStars from 'react-stars';

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
    color: "black", 
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    gap:'5px',
    paddingRight:"15px",
    fontWeight:"500",
    borderRadius:"10px",
    height:'44px'


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
        <Row className="mt-4 mb-4">
          <Col>
            <img
              className={styles.image}
              src={productDetails.image}
              alt={productDetails.name}
            />
          </Col>
          <Col className={styles.dataProduct}>
            <div className={styles.dataContainer}>
            <h1 className={styles.title}>{productDetails.name}</h1>
            <h3 className={styles.stock}>{productDetails.description}</h3>
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
            </div>
               <div className={styles.buttonSection}>
            <Button onClick={() => handlerAddToCart()} style={buttonStyle}>
              <i
                className="bi bi-cart4"
                style={{ color: "black", fontSize: "1.2rem", padding: "5px" }}
              ></i>{" "}

             <span>Add to cart</span> 
            </Button >
            {/* HP muestro el corazon que corresponda si es favorito o no */}
            <button style={{ border: "none", backgroundColor: "transparent" }} onClick={() => handlerIsFav()}>
              {
                !isFav ? <i style={{ color: "red", fontSize: "1.4rem"}} className="bi bi-suit-heart "></i>
                  : <i style={{ color: "red", fontSize: "1.4rem"}} className="bi bi-suit-heart-fill"></i> //para traer el icono de corazon lleno o vació
              }
            </button>
            </div>
          </Col>
        </Row>
      )}
      <hr></hr>
      <div className="d-flex row">
        <div className="col-md-6">
          <h2>calificaciones</h2>
              promedio estrellas
              <ReactStars
      count={5}
      // Asegúrate de tener una función ratingChanged para manejar el cambio de valoración
      size={24}
      color2={'#ffd700'}
    />

        </div>

        <div className="col-md-6">
          <h2>Principales comentarios </h2>
          <div className="media">
            <img src="imagen-usuario.jpg" className="mr-3" alt="..." style={{ width: "64px", height: "64px"}}/>
            <div className="media-body">
              <h5 className="mt-0">Nombre de Usuario</h5>
              Comentario del usuario. Puedes incluir texto, enlaces, etc.
            </div>
          </div><div className="media">
            <img src="imagen-usuario.jpg" className="mr-3" alt="..." style={{ width: "64px", height: "64px"}}/>
            <div className="media-body">
              <h5 className="mt-0">Nombre de Usuario</h5>
              Comentario del usuario. Puedes incluir texto, enlaces, etc.
            </div>
          </div>
          <div className="media">
            <img src="imagen-usuario.jpg" className="mr-3" alt="..." style={{ width: "64px", height: "64px"}}/>
            <div className="media-body">
              <h5 className="mt-0">Nombre de Usuario</h5>
              Comentario del usuario. Puedes incluir texto, enlaces, etc.
            </div>
          </div>
      </div>

      </div>
    </Container>
  );
}

export default ProductDetails;
