import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import styles from './MenuMobile.module.css'

function MenuMobile() {
  return (
    <div div className="d-md-none ">
        <Navbar expand='md' className={styles.burgerButton} >
          <Container fluid >
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
              className={styles.bodyContainer}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body >
                <Nav className={styles.linkContainer}>
                <Link to="/">
              {" "}
              <span>Home</span>
            </Link>
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
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </div>
  );
}

export default MenuMobile;