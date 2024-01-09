import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Header({ isUserLoggedIn, email, logout }) {
  //to do propTYPES validation
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
              <Link className="nav-link" to="/home">
                Home
              </Link>
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
              <Link className="nav-link" to="/about">
                About
              </Link>
              {!isUserLoggedIn && (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
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

Header.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

export default Header;
