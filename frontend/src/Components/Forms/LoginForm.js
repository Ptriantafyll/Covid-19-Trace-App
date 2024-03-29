import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Row } from "react-bootstrap";

function LoginForm(props) {
  const usernameloginref = useRef();
  const passwordloginref = useRef();

  function loginHandler(event) {
    event.preventDefault();

    const enterdusername = usernameloginref.current.value;
    const enteredpassword = passwordloginref.current.value;

    const userdata = {
      username: enterdusername,
      password: enteredpassword,
    };

    props.onUserLogin(userdata);
  }

  return (
    <Form onSubmit={loginHandler}>
      <Row className="justify-content-center">
        <Col xs="10">
          <Form.Floating className="mb-3 mt-3">
            <Form.Control
              type="text"
              id="loginusername"
              placeholder="Enter username"
              name="loginusername"
              ref={usernameloginref}
              required
            />
            <Form.Label htmlFor="username">Username:</Form.Label>
          </Form.Floating>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs="10">
          <Form.Floating className="mb-3 mt-3">
            <Form.Control
              type="password"
              className="form-control"
              id="loginpwd"
              placeholder="Enter password"
              name="loginpwd"
              ref={passwordloginref}
              required
            />
            <Form.Label htmlFor="pwd">Password:</Form.Label>
            <div className="text-center">
              forgot password? <a href="/ResetPasswordPage">press here</a>
            </div>
          </Form.Floating>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs="8"></Col>
        <Col xs="4">
          <Button type="submit">Log In</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default LoginForm;
