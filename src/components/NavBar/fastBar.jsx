import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from "../../zustand/customerStore/customerStore";
import { useEffect, useState } from "react";

const FastBar = () => {   
  const { currentCustomer } = customerStore();
  const { isAuthenticated } = useAuth0(); // para saber si estoy logueado
  const[disabled,setIsDisabled]=useState(false)//para deshabilitar los botones y links si el user no ha llenado los datos
  
  useEffect(()=>{
    console.log(currentCustomer.name);
    if(!currentCustomer.name && isAuthenticated) {      
      setIsDisabled(true) // deshabilitamos
    }else{
      setIsDisabled(false)
    }
  },[currentCustomer.name,isAuthenticated])

  return (
    <Navbar expand="md" data-bs-theme="dark" className={`d-none d-md-block ${style.navigation}`}>
      {
        !disabled && (
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`${style.itemMenuContaianer} w-100 justify-content-between`}
            >
              <Link to="/category/T-shirts">
                {" "}
                <span>T-shirts</span>
              </Link>
              <Link to="/category/Mugs">
                {" "}
                <span>Mugs</span>
              </Link>
              <Link to="/category/PC-Accesories">
                {" "}
                <span>PC Accesories</span>
              </Link>
              <Link to="/category/Collectible-figures">
                {" "}
                <span>Collectible figures</span>
              </Link>
              <Link to="/thematic/Video-Games">
                {" "}
                <span>Video Games Based</span>
              </Link>
              <Link to="/thematic/Programming">
                {" "}
                <span>Programming</span>
              </Link>
              <Link to="/thematic/Anime">
                {" "}
                <span>Anime Based</span>
              </Link>
              <Link to="/thematic/Gaming">
                {" "}
                <span>Gaming</span>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

        )
      }
    </Navbar>
  );
};

export default FastBar;
