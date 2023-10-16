import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

function SecionComponent() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="d-flex flex-row justify-content-between">
      {isAuthenticated ? <Logout /> : <Login />}

      {isAuthenticated ? (
        <Link
          to="/profile"
          className={`text-white fw-normal p-2 ${style.navLink}`}
        >
          {user.email_verified ? (
            <img
              src={user.picture}
              alt="Profile"
              className={`${style.roundedProfileImg}`}
            />
          ) : (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <i className={`bi bi-exclamation-diamond ${style.alertIcon}`} />
            </OverlayTrigger>
          )}
        </Link>
      ) : (
        <p>.</p>
      )}
    </div>
  );
}

export default SecionComponent;
