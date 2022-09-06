import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Store/CurrentUserContext";
import VisitsContext from "../../Store/VisitsContext";
import { Dropdown } from "react-bootstrap";

function NavBar() {
  const navigate = useNavigate();
  const visits_context = useContext(VisitsContext);
  const user_context = useContext(UserContext);

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
          <li>
            <Dropdown>
              <Dropdown.Toggle
                className="nav-link btn-dark border-0"
                id="dropdown-basic"
              >
                <i className="bi bi-person"></i>
                {" " + user_context.username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/EditProfilePage", { replace: true });
                  }}
                >
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/CovidTestHistoryPage", { replace: true });
                  }}
                >
                  Covid Test History
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    visits_context.storeUserVisits();
                    navigate("/VisitHistoryPage", { replace: true });
                  }}
                >
                  Visit History
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/">Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
