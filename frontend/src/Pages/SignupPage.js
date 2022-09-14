import SignupForm from "../Components/Forms/SignupForm";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";

function SignupPage() {
  const navigate = useNavigate();
  const BaseURL = "http://localhost:8000/"; // api url

  function userSignupHandler(newuserdata) {
    console.log(newuserdata);
    axios
      .post(BaseURL + "user/signup", {
        username: newuserdata.username,
        email: newuserdata.email,
        password: newuserdata.password,
      })
      .then((response) => {
        console.log(response);
        navigate("/LoginPage", { replace: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <Container fluid="md" className="mt-5">
      <Card style={{ width: "23rem" }} className="shadow mx-auto">
        <h2 className="mt-3 text-center">Sign Up</h2>
        <SignupForm onUserSignUp={userSignupHandler} />
      </Card>
      <Row className="justify-content-center mt-3">
        <Col className="text-center">
          Do you have an account? <a href="/LoginPage">log in</a>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
