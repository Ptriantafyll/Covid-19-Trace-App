import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Row } from "react-bootstrap";

function SignupForm(props) {
  const usernameinputref = useRef();
  const emailinputref = useRef();
  const passwordinputref = useRef();
  const [validEmail, setValidEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  function handlePasswordKey() {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        passwordinputref.current.value
      )
    ) {
      setPasswordInvalid(false);
      setPasswordValid(true);
    } else {
      setPasswordInvalid(true);
      setPasswordValid(false);
    }
  }

  function handleEmailkey() {
    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        emailinputref.current.value
      )
    ) {
      setInvalidEmail(false);
      setValidEmail(true);
    } else {
      setInvalidEmail(true);
      setValidEmail(false);
    }
  }

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
          </Form.Floating>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs="10">
          <Form.Floating className="mb-3 mt-3">
            <Form.Control
              isInvalid={invalidEmail}
              isValid={validEmail}
              type="text"
              id="email"
              placeholder="Enter email address"
              name="email"
              ref={emailinputref}
              onKeyDown={handleEmailkey}
              required
            />
            <Form.Control.Feedback type="valid" />
            <Form.Control.Feedback type="invalid">
              Email address is wrong
            </Form.Control.Feedback>
            <Form.Label htmlFor="email">Email:</Form.Label>
          </Form.Floating>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs="10">
          <Form.Floating className="mb-3 mt-3">
            <Form.Control
              isInvalid={passwordInvalid}
              isValid={passwordValid}
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              ref={passwordinputref}
              onKeyDown={handlePasswordKey}
              required
            />
            <Form.Control.Feedback type="valid" />
            <Form.Control.Feedback type="invalid">
              Password needs to be at least 8 characters with 1 lowercase and 1
              upercase letter, 1 digit and 1 special character
            </Form.Control.Feedback>
            <Form.Label htmlFor="pwd">Password:</Form.Label>
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
