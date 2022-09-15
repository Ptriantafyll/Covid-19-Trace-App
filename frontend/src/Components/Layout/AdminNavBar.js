import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import VisitsContext from "../../Store/VisitsContext";
import UserContext from "../../Store/UserContext";
import POIContext from "../../Store/POIContext";
import "../../Icons/logo.png";

function AdminNavBar(props) {
  const navigate = useNavigate();
  const visits_context = useContext(VisitsContext);
  const user_context = useContext(UserContext);
  const poi_context = useContext(POIContext);

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

        <Nav className="navbar-nav">
          <Nav.Link
            role="button"
            onClick={() => {
              navigate("/AdminHomePage", { replace: true });
            }}
          >
            <i className="bi bi-house-door" />
            Home Page
          </Nav.Link>
          <Nav.Link
            role="button"
            onClick={() => {
              user_context.storeUsers();
              visits_context.storeAllVisits();
              poi_context.storePOIs();
              navigate("/StatisticsPage", { replace: true });
            }}
          >
            <i className="bi bi-file-bar-graph" />
            Statistics
          </Nav.Link>
          {/* <NavDropdown
            id="nav-dropdown-dark"
            title={
              <>
                <i className="bi bi-file-bar-graph" />
                Statistics
              </>
            }
            menuVariant="dark"
          >
            <NavDropdown.Item
              onClick={() => {
                user_context.storeUsers();
                visits_context.storeAllVisits();
                poi_context.storePOIs();
                navigate("/StatisticsPage", { replace: true });
              }}
            >
              All statistics
            </NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link className="nav-link" href="/">
            Log Out
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminNavBar;
