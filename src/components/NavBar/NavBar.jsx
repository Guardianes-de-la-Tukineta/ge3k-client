import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css'
import logo from '../../Images/logoBlanco.svg'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar expand="md" data-bs-theme="dark" className={`pt-3 pb-3 ${style.navbarContainer}`}>
      
      <Container fluid className='d-flex'>
        
        <Link to='/'> <Navbar.Brand href="#"><img className={style.logo} src={logo} alt="ge3khub shop" /></Navbar.Brand></Link>
          
          <div className="flex-grow-1 d-none d-md-block "><SearchBar /></div>
          
          <div className='p-2 ml-1'><i className="bi bi-heart-fill"></i></div>
          
          <div className='p-2 ml-1'><i className="bi bi-cart-fill"></i></div>
          
          <div className="d-flex flex-row justify-content-between">
              <Nav.Link href="#" className='text-white fw-normal p-2'>Log In</Nav.Link>
              <Nav.Link href="#" className='text-white fw-normal p-2'>Sign Up</Nav.Link>
        </div>
      
      </Container>
      
      <div className="flex-grow-1 d-md-none "><SearchBar /></div>
    </Navbar>
  );
}

export default NavBar;