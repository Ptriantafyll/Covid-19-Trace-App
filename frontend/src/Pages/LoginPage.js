import LoginForm from "../Components/Forms/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Store/UserContext";
import { Card, Col, Container, Row } from "react-bootstrap";

function LoginPage() {
  const navigate = useNavigate();
  const BaseURL = "http://localhost:8000/"; // api url
  const user_context = useContext(UserContext);

  function userLoginHandler(userdata) {
    // console.log(userdata);

    //TODO: να βάλω μία if για να τσεκάρει αν μπαίνει ο admin ή απλός user
    axios
      .post(BaseURL + "user/login", {
        username: userdata.username,
        email: userdata.email,
        password: userdata.password,
      })
      .then((response) => {
        // console.log(response.data.id);
        // console.log(userdata.username);
        // store username and user id
        user_context.keepUser(userdata.username, response.data.id);
        user_context.keepUsername(userdata.username);
        if (userdata.username === "Admin") {
          navigate("/AdminHomePage", { replace: true });
        } else {
          navigate("/UserHomePage", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <Container fluid className="mt-5">
      <Row className="my-2 justify-content-center">
        <Col xs="1">
          {/* <div className="text-center"> */}
          <img
            // className="bg-warning"
            width={170}
            height={170}
            src={require("../Icons/logo.png")}
            alt="hello"
          />
          {/* </div> */}
        </Col>
        <Col xs="2">
          <p className="ms-5">
            random text random text random text random text random text random
            text random text random text random text random text random text
            random text random text random text
          </p>
        </Col>
      </Row>

      <Card style={{ width: "23rem" }} className="shadow bg-cyan mx-auto">
        <h2 className="mt-3 text-center">Log in</h2>

        <LoginForm onUserLogin={userLoginHandler} />
      </Card>
      <Row className="justify-content-center mt-3">
        <Col className="text-center">
          Do you not have an account? <a href="/SignupPage">sign up</a>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
