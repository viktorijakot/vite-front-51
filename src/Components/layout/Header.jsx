// import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";

function Header() {
  //to do propTYPES validation
  const { isUserLoggedIn, logout, userEmail: email } = useAuthContext();
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
              {isUserLoggedIn && (
                <>
                  <NavLink className="nav-link" to="/posts">
                    Posts
                  </NavLink>
                  <NavLink className="nav-link" to="/add-post">
                    Add Post
                  </NavLink>
                </>
              )}
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
              {!isUserLoggedIn && (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
              {isUserLoggedIn && (
                <>
                  <Link className="nav-link" to="#" onClick={logout}>
                    Logout
                  </Link>
                  <Link className="nav-link disabled" to="#">
                    {email}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

// Header.propTypes = {
//   isUserLoggedIn: PropTypes.bool.isRequired,
//   email: PropTypes.string,
//   logout: PropTypes.func.isRequired,
// };

export default Header;
