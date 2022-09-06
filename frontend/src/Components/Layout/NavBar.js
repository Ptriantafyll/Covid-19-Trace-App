import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import VisitsContext from "../../Store/VisitsContext";

function NavBar() {
  const navigate = useNavigate();
  const visits_context = useContext(VisitsContext);

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
          <li className="nav-item">
            <div
              role="button"
              className="nav-link"
              onClick={() => {
                navigate("/UserCovidTestSubmitPage", { replace: true });
              }}
            >
              Submit Covid Test
            </div>
          </li>
          <li>
            <div
              role="button"
              className="nav-link"
              onClick={() => {
                visits_context.storeVisits();
                navigate("/CovidCaseStatsPage", { replace: true });
              }}
            >
              Covid Case Contact
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
