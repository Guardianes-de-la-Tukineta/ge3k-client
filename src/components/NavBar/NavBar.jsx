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

const NavBar = () => {
  const { setVisibility } = cartStore(); // llamamos de zustand cart

  const handlerCart = () => {
    setVisibility();
  };

  return (
    <>
      <Navbar
        expand="md"
        data-bs-theme="dark"
        className={`pt-3 pb-3 ${style.navbarContainer}`}
      >
        <Container fluid className="d-flex">
          <Link to="/">
            <Navbar.Brand>
              <img className={style.logo} src={logo} alt="ge3khub shop" />
            </Navbar.Brand>
          </Link>

          <div className="flex-grow-1 d-none d-md-block ">
            <SearchBar />
          </div>

          <Link to="/favorites">
            <div className={`p-2 ml-1`}>
              <i className="bi bi-heart-fill"></i>
            </div>
          </Link>

          <div onClick={handlerCart} className={`${style.divCart} p-2 ml-1`}>
            <i className="bi bi-cart-fill"></i>
          </div>
          {/* resumo el componente de inicio de secion y perfil */}
          <SecionComponent />
        </Container>

        <div className="flex-grow-1 d-md-none ">
          <SearchBar />
        </div>
      </Navbar>
      {/* { resumiendo el codigo en otro compnente} */}

      <FastBar />
    </>
  );
};

export default NavBar;
