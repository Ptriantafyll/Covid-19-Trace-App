import { Button, Col, Form, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "axios";

function ResetPasswordForm(props) {
  const BaseURL = "http://localhost:8000/"; // api url
  const usernameref = useRef();
  const newpasswordref = useRef();
  const newpasswordconfirmref = useRef();
  const emailref = useRef();
  const [myuserID, setmyuserID] = useState();
  const [emailShow, setEmailShow] = useState(true);
  const [passwordShow, setPasswordShow] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

  function clearForm() {
    // make every field blank
    usernameref.current.value = "";
    emailref.current.value = "";
  }

  function clearPasswords() {
    newpasswordref.current.value = "";
    newpasswordconfirmref.current.value = "";
  }

  function handleEmailkey() {
    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailref.current.value)
    ) {
      setInvalidEmail(false);
      setValidEmail(true);
    } else if (emailref.current.value === "") {
      setInvalidEmail(false);
      setValidEmail(false);
    } else {
      setInvalidEmail(true);
      setValidEmail(false);
    }
  }

  function handlePasswordKey() {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        newpasswordref.current.value
      )
    ) {
      setPasswordInvalid(false);
      setPasswordValid(true);
    } else if (newpasswordref === "") {
      setPasswordInvalid(false);
      setPasswordValid(false);
    } else {
      setPasswordInvalid(true);
      setPasswordValid(false);
    }
  }

  function handleKeyDown() {
    // check if passwords match
    if (newpasswordref.current.value !== "") {
      if (
        newpasswordref.current.value === newpasswordconfirmref.current.value
      ) {
        // set invalid text
        setPasswordsMatch(true);
        setPasswordsDoNotMatch(false);
      } else {
        setPasswordsMatch(false);
        setPasswordsDoNotMatch(true);
      }
    }

    if (
      newpasswordref.current.value === "" &&
      newpasswordconfirmref.current.value === ""
    ) {
      setPasswordsMatch(false);
      setPasswordsDoNotMatch(false);
    }
  }

  function email_usernameSubmitHandler(event) {
    event.preventDefault();

    const enteredusername = usernameref.current.value;
    const enteredemail = emailref.current.value;

    if (enteredusername !== "" && enteredemail !== "") {
      axios
        .post(BaseURL + "user/emailusername", {
          username: enteredusername,
          email: enteredemail,
        })
        .then((response) => {
          setEmailShow(false);
          setPasswordShow(true);
          setmyuserID(response.data.user[0]._id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //TODO: alert or validate or something
    }
  }

  function newpasswordHandler(event) {
    event.preventDefault();
    if (passwordsMatch && passwordValid) {
      const enteredpassword = newpasswordref.current.value;

      const userdata = {
        id: myuserID,
        password: enteredpassword,
      };

      props.onNewPasswordEntered(userdata);
    }
  }

  return (
    <>
      {emailShow && (
        <>
          <h5 className="mt-3 text-center">Enter your email and username</h5>
          <Form onSubmit={email_usernameSubmitHandler} noValidate>
            <Row className="justify-content-center mb-4">
              <Col xs="8">
                <Form.Floating>
                  <Form.Control
                    isInvalid={invalidEmail}
                    isValid={validEmail}
                    type="text"
                    id="email"
                    placeholder="Enter email address"
                    name="email"
                    ref={emailref}
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
            <Row className="justify-content-center my-4">
              <Col xs="8">
                <Form.Floating>
                  <Form.Control
                    ref={usernameref}
                    type="text"
                    placeholder="Username"
                    id="newusername"
                  />
                  <Form.Label htmlFor="newusername">Username</Form.Label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="my-3">
              <Col xs="2"></Col>
              <Col xs="5">
                <Button onClick={clearForm}>Clear</Button>
              </Col>
              <Col xs="1">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
      {passwordShow && (
        <>
          <h5 className="mt-3 text-center">Enter new password</h5>
          <Form onSubmit={newpasswordHandler}>
            <Row className="justify-content-center mb-4">
              <Col xs="8">
                <Form.Floating>
                  <Form.Control
                    isInvalid={passwordInvalid}
                    isValid={passwordValid}
                    ref={newpasswordref}
                    type="password"
                    placeholder="Password"
                    id="newpassword"
                    onKeyDown={handlePasswordKey}
                    onClick={handlePasswordKey}
                  />
                  <Form.Control.Feedback type="valid" />
                  <Form.Control.Feedback type="invalid">
                    Password needs to be at least 8 characters with 1 lowercase
                    and 1 upercase letter, 1 digit and 1 special character
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="newpassword">New password</Form.Label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="justify-content-center my-4">
              <Col xs="8">
                <Form.Floating>
                  <Form.Control
                    isInvalid={passwordsDoNotMatch}
                    isValid={passwordsMatch}
                    ref={newpasswordconfirmref}
                    type="password"
                    placeholder="Password"
                    id="newpasswordconfirm"
                    onKeyDown={handleKeyDown}
                    onClick={handleKeyDown}
                  />
                  <Form.Control.Feedback type="valid">
                    Passwords match
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Passwords need to match
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="newpasswordconfirm">
                    Confirm new password
                  </Form.Label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="my-3">
              <Col xs="2"></Col>
              <Col xs="5">
                <Button onClick={clearPasswords}>Clear</Button>
              </Col>
              <Col xs="1">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </>
  );
}

export default ResetPasswordForm;
