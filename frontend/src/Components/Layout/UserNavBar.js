import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Store/UserContext";
import VisitsContext from "../../Store/VisitsContext";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function UserNavBar() {
  const navigate = useNavigate();
  const visits_context = useContext(VisitsContext);
  const user_context = useContext(UserContext);

  return (
    <Navbar expand="sm" bg="dark" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            width={30}
            height={30}
            src={require("../../Icons/logo.png")}
            alt="hello"
          />
          Viral Map
        </Navbar.Brand>
        <Nav>
          <Nav.Link
            className="nav-link"
            onClick={() => {
              navigate("/UserHomePage", { replace: true });
            }}
          >
            <i className="bi bi-house-door" />
            Home Page
          </Nav.Link>
          <Nav.Link
            role="button"
            className="nav-link"
            onClick={() => {
              navigate("/UserCovidTestSubmitPage", { replace: true });
            }}
          >
            <i className="bi bi-virus" />
            Submit Covid Test
          </Nav.Link>
          <Nav.Link
            role="button"
            className="nav-link"
            onClick={() => {
              visits_context.storeVisits();
              navigate("/CovidCaseStatsPage", { replace: true });
            }}
          >
            <i className="bi bi-virus2" />
            Covid Case Contact
          </Nav.Link>

          <Nav.Item>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={
                <>
                  <i className="bi bi-person" />
                  {user_context.username}
                </>
              }
              menuVariant="dark"
              drop="start"
            >
              <NavDropdown.Item
                onClick={() => {
                  navigate("/EditProfilePage", { replace: true });
                }}
              >
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/CovidTestHistoryPage", { replace: true });
                }}
              >
                Covid Test History
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  visits_context.storeUserVisits(() => {
                    navigate("/VisitHistoryPage", { replace: true });
                  });
                }}
              >
                Visit History
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default UserNavBar;
