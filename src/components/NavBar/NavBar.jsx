import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import logo from "../../Images/logoBlanco.svg";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login/Login";
import Logout from "../Login/Logout";

const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
    <Navbar
      expand="md"
      data-bs-theme="dark"
      className={`pt-3 pb-3 ${style.navbarContainer}`}
    >
      <Container fluid className="d-flex">
        <Link to="/">
          {" "}
          <Navbar.Brand href="#">
            <img className={style.logo} src={logo} alt="ge3khub shop" />
          </Navbar.Brand>
        </Link>

        <div className="flex-grow-1 d-none d-md-block ">
          <SearchBar />
        </div>

        <div className="p-2 ml-1">
          <i className="bi bi-heart-fill"></i>
        </div>

        <div className="p-2 ml-1">
          <i className="bi bi-cart-fill"></i>
        </div>

        <div className="d-flex flex-row justify-content-between">
          {/* <Nav.Link href="/login" className="text-white fw-normal p-2">
            Log In
          </Nav.Link> */}
          {isAuthenticated ? <Logout /> : <Login />}

          {isAuthenticated ? (
            <Nav.Link href="/profile" className="text-white fw-normal p-2">
              Profile
            </Nav.Link>
          ) : (
            <p>.</p>
          )}
        </div>
      </Container>

      <div className="flex-grow-1 d-md-none ">
        <SearchBar />
      </div>
    </Navbar>

<Navbar expand="md" data-bs-theme="dark" className={style.navigation}>
<Container>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className={`${style.itemMenuContaianer} w-100 justify-content-between`}>
      <Link to='/category/T-shirts'> <span >T-shirts</span></Link>
      <Link to='/category/Mugs'> <span >Mugs</span></Link>
      <Link to='/category/PC-Accesories'> <span>PC Accesories</span></Link>
      <Link to='/category/Collectible-figures'> <span >Collectible figures</span></Link>
      <Link to='/thematic/Video-Games'> <span >Video Games Based</span></Link>
      <Link to='/thematic/Programming'> <span >Programming</span></Link>
      <Link to='/thematic/Anime'> <span >Anime Based</span></Link>
      <Link to='/thematic/Gaming'> <span >Gaming</span></Link>
      </Nav>
    </Navbar.Collapse>
</Container>
</Navbar>
</>
  );
};

export default NavBar;

