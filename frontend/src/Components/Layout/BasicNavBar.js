import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Nav, Navbar } from "react-bootstrap";

function BasicNavBar() {
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
          My app name
        </Navbar.Brand>

        <Nav>
          <Nav.Link className="nav-link" href="/LoginPage">
            Log In
          </Nav.Link>
          <Nav.Link className="nav-link" href="/SignupPage">
            Sign Up
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BasicNavBar;
