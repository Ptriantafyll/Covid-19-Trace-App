import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Row } from "react-bootstrap";

// TODO: να δω το newmeetupform.js και να πάρω ιδέα για να φτιάξω το signup form και το login form
// με τα σωστά props κλπ
// να περάσω τα αποτελέσματα από το φορμ στο άλλο
// Να φτιάξω τα valid/invalid texts
function SignupForm(props) {
  const usernameinputref = useRef();
  const emailinputref = useRef();
  const passwordinputref = useRef();

  function signupSubmitHandler(event) {
    event.preventDefault();

    const enterdusername = usernameinputref.current.value;
    const enteredemail = emailinputref.current.value;
    const enteredpassword = passwordinputref.current.value;

    const newuserdata = {
      username: enterdusername,
      email: enteredemail,
      password: enteredpassword,
    };

    props.onUserSignUp(newuserdata);
  }

  return (
    <Form onSubmit={signupSubmitHandler} noValidate>
      <Row className="justify-content-center">
        <Col xs="10">
          <Form.Floating className="mb-3 mt-3">
            <Form.Control
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              name="username"
              ref={usernameinputref}
              required
            />
            <Form.Label htmlFor="username">Username:</Form.Label>

            <Form.Control.Feedback type="valid">Valid.</Form.Control.Feedback>
            <Form.Control.Feedback tpye="invalid">
              Please fill out this field.
            </Form.Control.Feedback>
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
              ref={emailinputref}
              required
            />
            <Form.Label htmlFor="email">Email:</Form.Label>

            <Form.Control.Feedback type="valid">Valid.</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please fill out this field.
            </Form.Control.Feedback>
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
              ref={passwordinputref}
              required
            />
            <Form.Label htmlFor="pwd">Password:</Form.Label>

            <Form.Control.Feedback type="valid">Valid.</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please fill out this field.
            </Form.Control.Feedback>
          </Form.Floating>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col xs="8"></Col>
        <Col xs="4">
          <Button type="submit">Sign Up</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SignupForm;
