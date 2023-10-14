import React, { useEffect, useRef } from "react";
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

const Home = () => {
  const { getAllProducts, getSales } = useStore(); //esto actua como nuestro dispatch, guardamos en la variable la action getSales
  const { sales } = useStore.getState(); // obtenemos del estado global la variable sales(productos en oferta)
  const {cart,syncByBack,getCartProducts}=cartStore() 
  const { user, isAuthenticated } = useAuth0() // para saber si estoy logueado
  const {currentCustomer}=customerStore()
  const firstRender=useRef(true)

  //hooks
  useEffect(() => {    
    if(isAuthenticated){         
      if(cart.length>0 && firstRender.current && currentCustomer.email){    //el currentCustomer tarda un poco en cargar los datos del user    
        console.log('syncronización');
        syncByBack(currentCustomer.id) 
        firstRender.current=false  // cambiamos afalse para q solo se renderice una vez
      } else if(currentCustomer.email){
        getCartProducts(currentCustomer.id) // para pedir al back el carrito del usuario
      }
    }
    getAllProducts();
    getSales(); //al montar componente ejecutamos la action q modifica nuestro estado global
  }, [user,currentCustomer]);


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
    </div>
  );
};

export default Home;
