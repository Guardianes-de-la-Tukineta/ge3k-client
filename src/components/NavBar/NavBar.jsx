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
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import Swal from "sweetalert2";

const NavBar = () => {
  const { setVisibility, cart } = cartStore(); // llamamos de zustand cart
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const { currentCustomer } = customerStore();

  const handlerCart = () => {
    if (cart.length === 0) {
      if (!isAuthenticated) {
        // El usuario no está autenticado
        Swal.fire({
          title: "You have no items in your shopping cart!",
          text: "Check out our products and select the one you like the most..",
          icon: "warning",
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (Object.keys(currentCustomer).length === 0) {
        // El usuario está autenticado pero no tiene perfil
        Swal.fire({
          title: "You have no items in your shopping cart!",
          text: "Check out our products and select the one you like the most..",
          icon: "warning",
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        // El carrito está vacío, pero el usuario está autenticado y tiene perfil
        navigate("/PurchaseOrder");
      }
    } else {
      setVisibility();
    }
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

          <div
            className="d-flex align-items-center"
            style={{ marginRight: "0.45rem" }}
          >
            <Link to="/favorites">
              <div className={`p-2 ml-1`}>
                <i className="bi bi-heart-fill" style={{ fontSize: "1.2rem" }}>
                  {" "}
                </i>
              </div>
            </Link>

            <div onClick={handlerCart} className={`${style.divCart} p-2 ml-1`}>
              <i className="bi bi-cart-fill" style={{ fontSize: "1.2rem" }}></i>
            </div>
            {/* resumo el componente de inicio de secion y perfil */}
            <SecionComponent />
          </div>
        </Container>

        <div className="w-100 d-flex align-items-center justify-content-between d-md-none">
          <SearchBar />
          <MenuMobile />
        </div>
      </Navbar>
      {/* { resumiendo el codigo en otro compnente} */}

      <FastBar />
    </>
  );
};

export default NavBar;
