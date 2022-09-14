import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function StartPage() {
  return (
    <Container className="mt-5">
      <Row className="mt-5" />
      <Row className="mt-5" />
      <Row className="mt-5" />
      <Card style={{ width: "70rem" }} className="mx-auto border-0">
        <Row className="mt-5">
          <Col xs="2"></Col>
          <Col xs="3" className="ms-4">
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
            <Button variant="success" href="/LoginPage">
              Log in
            </Button>
          </Col>
          <Col xs="2">
            <Button variant="info" href="SignupPage">
              Sign Up
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default StartPage;
