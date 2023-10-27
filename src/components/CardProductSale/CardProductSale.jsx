import React, { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "./CardProductSale.module.css";
import { Link } from "react-router-dom";
import { cartStore } from "../../zustand/cartStore/cartStore";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import { favoriteStore } from '../../zustand/favoriteStore/favoriteStore';

const CardProductSale = ({ name, price, image, id,description,discount }) => {
  const [isFav, setIsFav] = useState(false); // para cambiar el estado de fav y no fav
  const [isFavDisabled, setIsFavDisabled] = useState(false); // para deshabilitar momentaneamente el boton de fav
  const { addProductToCart, setVisibility } = cartStore();
  const { isAuthenticated } = useAuth0();
  const { currentCustomer } = customerStore();
  const {favorites,addProductFavorite,deleteProductFavorite,updateLocalStorage} = favoriteStore() 

  const handlerIsFav = () => {          
    if (isFavDisabled) { //evita q el user haga click dos veces seguidas al fav sin dar tiempo de procesar en back
        return;
    }
    setIsFavDisabled(true);
    if(!isFav) { //si no esta en favoritos ya
        addProductFavorite(isAuthenticated,currentCustomer.id,{ name, description, id, image, price })                        
        setIsFav(true)
    } else {
        deleteProductFavorite(isAuthenticated,currentCustomer.id, id)  
        setIsFav(false)         
    }  
    // Habilitar el botón después de 1 seg
    setTimeout(() => {
        setIsFavDisabled(false);
    }, 1000);      
}

  const handlerCart = (e) => {
    e.stopPropagation();
    addProductToCart(isAuthenticated || false, currentCustomer.id, {
      name,
      id,
      image,
      price,
      discount
    });
    setVisibility(true);
  };

  const buttonStyle = {
    width: "300px",
    backgroundColor: "#FC6522",
    borderColor: "#ff6824",
    color: "white",
  };

  useEffect(()=>{
    updateLocalStorage(favorites)
    if(favorites.findIndex((elem)=>elem.id===id)!==-1) { //si esta en favoritos pintamos el corazon
        setIsFav(true)  
    } 
  },[favorites])

  return (
    <div className="card border-0">
      <div className={`card-body d-flex flex-column w-100 h-100 ${styles.cardProduct}`}>
        <div className="row">
          <div className="col-md-4">
            <Link style={{ textDecoration: "none" }} to={`/product/${id}`}>
              <img src={image} alt="image" className="img-fluid" />
            </Link>
          </div>
          <div className="col-md-8">
            <h1
              className={`mb-3 ${styles.title}`}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </h1>
            <h2 className={`mb-3 ${styles.price}`}>${price}</h2>

            <div className="d-flex align-items-center">
              <button
                className={`${styles.fav} ${isFav ? styles.favActive : ""}`}
                onClick={()=>handlerIsFav()}
              >
                <i
                  className={`bi ${
                    isFav ? "bi-suit-heart-fill" : "bi-suit-heart"
                  } ${styles.favIcon}`}
                ></i>
              </button>
              <hr className={styles.hr} />
              <Button onClick={(e) => handlerCart(e)} style={buttonStyle}>
                <i className="bi bi-cart me-3"></i>Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductSale;
