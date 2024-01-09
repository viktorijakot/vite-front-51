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
              <a className="nav-link" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                Posts
              </a>
              <a className="nav-link" href="#">
                About
              </a>
              {!isUserLoggedIn && (
                <a className="nav-link" href="#">
                  Login
                </a>
              )}
              {isUserLoggedIn && (
                <>
                  <a className="nav-link" href="#" onClick={logout}>
                    Logout
                  </a>
                  <a className="nav-link disabled" href="#">
                    {email}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
