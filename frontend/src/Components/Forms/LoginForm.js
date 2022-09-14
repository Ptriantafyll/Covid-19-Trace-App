import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Row } from "react-bootstrap";

function LoginForm(props) {
  const usernameloginref = useRef();
  const emailloginref = useRef();
  const passwordloginref = useRef();

  function loginHandler(event) {
    event.preventDefault();

    const enterdusername = usernameloginref.current.value;
    const enteredemail = emailloginref.current.value;
    const enteredpassword = passwordloginref.current.value;

    const userdata = {
      username: enterdusername,
      email: enteredemail,
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
              className="form-control"
              id="username"
              placeholder="Enter username"
              name="username"
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
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              ref={emailloginref}
              required
            />
            <Form.Label htmlFor="email">Email:</Form.Label>
          </Form.Floating>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="10">
          <Form.Floating className="mb-3 mt-3">
            <Form.Control
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              ref={passwordloginref}
              required
            />
            <Form.Label htmlFor="pwd">Password:</Form.Label>
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
