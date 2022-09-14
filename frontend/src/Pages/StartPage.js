import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Row } from "react-bootstrap";

function StartPage() {
  return (
    <>
      <Container className="mt-5">
        <Row className="mt-5" />
        <Row className="mt-5" />
        <Row className="mt-5" />
        <Row className="mt-5">
          <Col xs="2"></Col>
          <Col xs="3" className="ms-4 ">
            <img src={require("../Icons/logo.png")} alt="hello" />
          </Col>
          <Col xs="4">
            Λίγα λόγια για την εφαρμογή, χάρτες κλπ τι μπορείς να κάνεις. Λίγα
            λόγια για την εφαρμογή, χάρτες κλπ τι μπορείς να κάνεις. Λίγα λόγια
            για την εφαρμογή, χάρτες κλπ τι μπορείς να κάνεις. Λίγα λόγια για
            την εφαρμογή, χάρτες κλπ τι μπορείς να κάνεις. Λίγα λόγια για την
            εφαρμογή, χάρτες κλπ τι μπορείς να κάνεις. Λίγα λόγια για την
            εφαρμογή, χάρτες κλπ τι μπορείς να κάνεις. Λίγα λόγια για την
            εφαρμογή, χάρτες κλπ τι μπορείς να κάνεις.
          </Col>
        </Row>
        <Row className="mt-2 ">
          <Col xs="2"></Col>
          <Col xs="1" className="ms-5">
            <Button variant="success">Log in</Button>
          </Col>
          <Col xs="1">
            <Button variant="info">Sign Up</Button>
          </Col>
        </Row>
      </Container>
      {/* <Container>
        <Row className="justify-content-center">
          <Col sm="2">
            <img
              src={require("../Icons/logo-removebg-preview.png")}
              alt="hello"
            />
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default StartPage;
