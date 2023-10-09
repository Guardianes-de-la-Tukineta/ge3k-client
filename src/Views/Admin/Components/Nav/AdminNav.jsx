import "./AdminNav.css";
import { Link } from "react-router-dom";
import logo from '../../../../Images/gray Ge3k Logo.svg'

export default function AdminNav({toggleState, handleLogOut}) {

  return (
    <>
      <div className={(toggleState)? 'navigation active' : 'navigation'}>
        <ul className="p-0">
          <li>
            <a href="">
              <span className="icon">
                  <img className='AdminLogo' src={logo} alt="" />
              </span>
              <span className="title fw-bolder">Ge3kHub</span>
            </a>
          </li>
          <li>
          <Link to='/admin'>
              <span className="icon">
              <i class="bi bi-file-bar-graph"></i>
              </span>
              <span className="title">Dashboard</span>
              </Link>
          </li>
          <li>
            <Link to='/admin/products'>
              <span className="icon">
              <i class="bi bi-shop"></i>
              </span>
              <span className="title">Product Management</span>
            </Link>
          </li>
          <li>
          <Link to='/admin/users'>
              <span className="icon">
              <i class="bi bi-people"></i>
              </span>
              <span className="title">User Management</span>
          </Link>
          </li>
         
          <li>
          <Link to='/admin/auth' onClick={handleLogOut}>
              <span className="icon">
              <i class="bi bi-box-arrow-right"></i>
              </span>
              <span className="title">Log Out</span>
              </Link>
          </li>
      
        </ul>
      </div>
    </>
  );
}
