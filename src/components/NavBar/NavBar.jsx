import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import logo from "../../Images/logoBlanco.svg";
import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import { cartStore } from "../../zustand/cartStore/cartStore";
import FastBar from "./fastBar";
import SecionComponent from "./SecionComponent";
import MenuMobile from "../MenuMobile/MenuMobile";
import { customerStore } from "../../zustand/customerStore/customerStore";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { setVisibility } = cartStore(); // llamamos de zustand cart
  const { currentCustomer } = customerStore();
  const { isAuthenticated } = useAuth0(); // para saber si estoy logueado
  const[disabled,setIsDisabled]=useState(false)//para deshabilitar los botones y links si el user no ha llenado los datos

  const handlerCart = () => {
    setVisibility();
  };

  useEffect(()=>{
    if(!currentCustomer.name && isAuthenticated) {
      setIsDisabled(true) // deshabilitamos
    }else{
      setIsDisabled(false)
    }
  },[currentCustomer.name,isAuthenticated])

  return (
    <>
      <Navbar
        expand="md"
        data-bs-theme="dark"
        className={`pt-3 pb-3 ${style.navbarContainer}`}
      >
        <Container fluid className="d-flex">
          <Link disabled to="/">
            <Navbar.Brand>
              <img className={`${style.logo}`} src={logo} alt="ge3khub shop" />
            </Navbar.Brand>
          </Link>

          <div className="flex-grow-1 d-none d-md-block ">
            {
              !disabled && <SearchBar/>
            }
            
          </div>
          <div className="d-flex align-items-center" style={{marginRight:'0.45rem'}}>
            {
              !disabled && 
              <>
                <Link to='/favorites'>
                  <div className={`p-2 ml-1`}>
                    <i className="bi bi-heart-fill" style={{fontSize:'1.2rem'}}>  </i>
                  </div>
                </Link>

                <div onClick={handlerCart} className={`${style.divCart} p-2 ml-1`}>
                  <i className="bi bi-cart-fill"  style={{fontSize:'1.2rem'}}></i>
                </div>
              </>
            }
          {/* resumo el componente de inicio de secion y perfil */}
          <SecionComponent />
          </div>

     
        </Container>

        <div className="w-100 d-flex align-items-center justify-content-between d-md-none">
    
          <SearchBar />
          <MenuMobile/>
        </div>
      </Navbar>
      {/* { resumiendo el codigo en otro compnente} */}

      <FastBar />
    </>
  );
};

export default NavBar;
