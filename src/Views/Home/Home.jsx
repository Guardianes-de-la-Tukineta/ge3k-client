import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../../zustand/useStore/useStore";
import { Link } from "react-router-dom";
import Silder from "../../components/Slider/Slider";
import Category from "../../components/Category/Category";
import CardProductSale from "../../components/CardProductSale/CardProductSale";
import Themes from "../../components/Theme/Themes";
import style from "../Home/Home.module.css";
import { cartStore } from "../../zustand/cartStore/cartStore";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import { favoriteStore } from "../../zustand/favoriteStore/favoriteStore";
import flecha from "../../Images/flechas_nuevas_naranje_y_gris_Mesa de trabajo 1.png";

const Home = () => {
  const { getAllProducts, getSales } = useStore(); //esto actua como nuestro dispatch, guardamos en la variable la action getSales
  const { sales } = useStore.getState(); // obtenemos del estado global la variable sales(productos en oferta)
  const { cart, syncByBack, getCartProducts } = cartStore();
  const { syncFavByBack, getFavorites, favorites, updateLocalStorage } =
    favoriteStore();
  const { user, isAuthenticated } = useAuth0(); // para saber si estoy logueado
  const { currentCustomer } = customerStore();

  const perPage = 3; // Cantidad de tarjetas por página
  const [paginado, setPaginado] = useState([0, perPage - 1]);

  //hooks
  useEffect(() => {
    if (isAuthenticated) {
      if ((cart.length > 0 || favorites.length > 0) && currentCustomer.email) {
        //el currentCustomer tarda un poco en cargar los datos del user
        const syncCompleted = localStorage.getItem("syncCompleted"); // Verificamos si la sincronización ya se ha completado 1 vez, para q no hagamos lo mismo muchas veces
        if (syncCompleted === "false") {
          console.log("syncronización");
          syncByBack(currentCustomer.id); // solicitamos la syncronizacion de cart
          syncFavByBack(currentCustomer.id); // solicitamos la syncronizacion de favoritos
          localStorage.setItem("syncCompleted", "true"); // Marcamos la sincronización como completada en localStorage
        }
      } else if (currentCustomer.email) {
        getCartProducts(currentCustomer.id); // para pedir al back el carrito del usuario
        getFavorites(currentCustomer.id); // para pedir al back los fav del usuario
      }
    } else {
      localStorage.setItem("syncCompleted", "false"); // Marcamos la sincronización como no completada en localStorage
    }
    updateLocalStorage(favorites);
    getAllProducts();
    getSales(); //al montar componente ejecutamos la action q modifica nuestro estado global
  }, [user, currentCustomer]);

  const handlePageChange = (direction) => {
    if (direction === "right") {
      const newEnd = paginado[1] + perPage;
      const newStart = paginado[0] + perPage;

      if (newEnd >= sales.length) {
        // Si llegamos al final, volvemos al principio
        setPaginado([0, perPage - 1]);
      } else {
        setPaginado([newStart, newEnd]);
      }
    } else {
      const newStart = paginado[0] - perPage;
      const newEnd = paginado[1] - perPage;

      if (newStart < 0) {
        // Si estamos al principio, volvemos al final
        const lastIndex = sales.length - 1;
        setPaginado([lastIndex - perPage + 1, lastIndex]);
      } else {
        setPaginado([newStart, newEnd]);
      }
    }
  };
  l;

  return (
    <div>
      <Silder />

      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "5rem 3rem",
          paddingBottom: "7rem",
        }}
      >
        <div className={style.containerTitle}>
          <h3 className={`card-title ${style.title}`}>
            <span className={style.coloredText}>Products</span> on sale
          </h3>
        </div>

        <div className={` ${style.carousel_container}`}>
          <img
            className={`position-absolute ${style.arrowLeft}`}
            src={flecha}
            alt=""
            onClick={() => handlePageChange("left")}
          />
          <div className={`row ${style.cards_carousel}`}>
            {sales.slice(paginado[0], paginado[1] + 1).map((product) => (
              <div
                className="col-md-4"
                style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}
                key={product.id}
              >
                <CardProductSale
                  image={product.image}
                  name={product.name}
                  rating={product.rating}
                  price={product.price}
                  id={product.id}
                  description={product.description}
                />
              </div>
            ))}
          </div>
          <div className={style.buttonRight}>
            <img
              className={`position-absolute ${style.arrowRight}`}
              src={flecha}
              alt=""
              onClick={() => handlePageChange("right")}
            />
          </div>
        </div>
      </div>
      <div>
        <Category />
      </div>

      <div>
        <Themes />
      </div>
    </div>
  );
};

export default Home;
