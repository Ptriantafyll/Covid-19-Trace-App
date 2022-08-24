import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Logo
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/LoginPage">
              Log In
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/SignupPage">
              Sign Up
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/UserHomePage">
              UserHomePage
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
