import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark" className="pt-3 pb-3">
      <Container fluid className="d-flex">
        <Navbar.Brand href="#">GE3KHUB.shop</Navbar.Brand>

        <div className="flex-grow-1 d-none d-md-block ">
          <SearchBar />
        </div>

        <div className="p-2 ml-1">
          {/* <i class="bi bi-heart-fill"></i> */} fav
        </div>

        <div className="p-2 ml-1">
          {/* <i class="bi bi-cart-fill"></i> */} car
        </div>

        <div className="d-flex flex-row justify-content-between">
          <Nav.Link href="#" className="text-white fw-normal p-2">
            Log In
          </Nav.Link>
          <Nav.Link href="#" className="text-white fw-normal p-2">
            Sign Up
          </Nav.Link>
        </div>
      </Container>

      <div className="flex-grow-1 d-md-none ">
        <SearchBar />
      </div>
    </Navbar>
  );
};

export default NavBar;
