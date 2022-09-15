import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function StartPage() {
  return (
    <Container className="mt-5">
      <Row className="mt-5" />
      <Row className="mt-5" />
      <Row className="mt-5" />
      <Card style={{ width: "40rem" }} className="mx-auto border-0">
        <Row className="mt-5 ">
          <h1 className="text-center text-primary">
            <i className="bi bi-virus2" />
            Viral Map
          </h1>
        </Row>
        <Row className="justify-content-center">
          <Col xs="5">
            <img src={require("../Icons/logo.png")} alt="hello" />
          </Col>
          <Col xs="6">
            {/* Η πανδημία του SARS CoV-2 έχει προκαλέσει ριζικές αλλαγές στην
            καθημερινότητα όλων μας τα τελευταία χρόνια. Με το Viral Map έχετε
            τη δυνατότητα να δείτε αν έχετε έρθει σε επαφή με κάποιο κρούσμα
            κατά τις εξόδους σας, καθώς και να δηλώσετε αν είστε νοσείτε από
            Covid-19, ώστε να ενημερώνονται και οι υπόλοιποι χρήστες αυτόματα. */}
            The SARS CoV-2 pandemic has caused radical changes in our everyday
            lives for the past few years. With Viral Map you have the ability to
            see if you have been in contact with a case during your exits, as
            well as to declare if you are ill from Covid-19, so that other users
            are also automatically informed. <br />
            If you are sick, don't forget to consult your doctor, stay safe and
            stay at home.
          </Col>
        </Row>
        <Row className="mt-2 ">
          <Col xs="1"></Col>
          <Col xs="2">
            <Button variant="success" href="/LoginPage">
              Log in
            </Button>
          </Col>
          <Col xs="3">
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
