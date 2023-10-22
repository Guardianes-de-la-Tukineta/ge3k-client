import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../zustand/useStore/useStore";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Silder from "../../components/Slider/Slider";
import Category from "../../components/Category/Category";
import CardProductSale from "../../components/CardProductSale/CardProductSale";
import Themes from "../../components/Theme/Themes";
import style from "../Home/Home.module.css";
import { cartStore } from "../../zustand/cartStore/cartStore";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import whatsApp from "../../Images/124034.png";
import { favoriteStore } from "../../zustand/favoriteStore/favoriteStore";

const Home = () => {
  const { getAllProducts, getSales } = useStore(); //esto actua como nuestro dispatch, guardamos en la variable la action getSales
  const { sales } = useStore.getState(); // obtenemos del estado global la variable sales(productos en oferta)
  const { cart, syncByBack, getCartProducts } = cartStore();
  const {syncFavByBack,getFavorites,favorites,updateLocalStorage}=favoriteStore()
  const { user, isAuthenticated } = useAuth0(); // para saber si estoy logueado
  const { currentCustomer } = customerStore();
 
  //hooks
  useEffect(() => {
    if (isAuthenticated) {      
      if ((cart.length > 0 || favorites.length>0) && currentCustomer.email) {     //el currentCustomer tarda un poco en cargar los datos del user   
        const syncCompleted = localStorage.getItem('syncCompleted'); // Verificamos si la sincronización ya se ha completado 1 vez, para q no hagamos lo mismo muchas veces
        if(syncCompleted==='false'){
          console.log("syncronización");
          syncByBack(currentCustomer.id); // solicitamos la syncronizacion de cart
          syncFavByBack(currentCustomer.id) // solicitamos la syncronizacion de favoritos      
          localStorage.setItem('syncCompleted', 'true');  // Marcamos la sincronización como completada en localStorage
        }
      } else if (currentCustomer.email) {
        getCartProducts(currentCustomer.id); // para pedir al back el carrito del usuario
        getFavorites(currentCustomer.id); // para pedir al back los fav del usuario
      }
    } else {
      localStorage.setItem('syncCompleted', 'false');  // Marcamos la sincronización como no completada en localStorage
    } 
    updateLocalStorage(favorites)
    getAllProducts();
    getSales(); //al montar componente ejecutamos la action q modifica nuestro estado global
  }, [user, currentCustomer]);

  const groupedSales = [];
  for (let i = 0; i < sales.length; i += 3) {
    groupedSales.push(sales.slice(i, i + 3));
  } // agrupa los productos en tres para mostrar tres tarjetas por vista del carrusel

  return (
    <div>
      <Silder />

      <div className="p-3">
        <div>
          <h1 className={`card-title ${style.title}`}>
            <span className={style.coloredText}>Products</span> on sale
          </h1>
        </div>

        <div className={style.carousel_container}>
          <Carousel>
            {groupedSales.map((group, index) => (
              <Carousel.Item key={index}>
                <div className={"row"}>
                  {group.map((product) => (
                    <div key={product.id} className="col-md-4">
                      <CardProductSale
                        image={product.image}
                        name={product.name}
                        rating={product.rating}
                        price={product.price}
                        id={product.id}
                      />
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      <div>
        <Category />
      </div>

      <div>
        <Themes />
      </div>
      <div className={style.whatsappButton}>
        <a
          href="https://wa.me/573182101430"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsApp} alt="WhatsApp" />
        </a>
      </div>
    </div>
  );
};

export default Home;
