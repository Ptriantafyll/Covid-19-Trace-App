import { Button, Col, Form, Row } from "react-bootstrap";
import { useRef, useState } from "react";

function EditProfileForm(props) {
  const newusernameref = useRef();
  const newpasswordref = useRef();
  const newpasswordconfirmref = useRef();
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

  function handleKeyDown(event) {
    // console.log(event.key);
    if (newpasswordref.current.value !== "") {
      if (
        newpasswordref.current.value === newpasswordconfirmref.current.value
      ) {
        setPasswordsMatch(true);
        setPasswordsDoNotMatch(false);
      } else {
        // console.log("new pw: " + newpasswordref.current.value);
        // console.log("new pw conf: " + newpasswordconfirmref.current.value);
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

  function profileSubmitHandler(event) {
    event.preventDefault();

    const enteredusername = newusernameref.current.value;
    const enteredpassword = newpasswordref.current.value;
    const enteredpasswordconfirm = newpasswordconfirmref.current.value;

    if (
      enteredusername !== "" &&
      enteredpassword !== "" &&
      enteredpasswordconfirm !== "" &&
      passwordsMatch
    ) {
      const usernewdata = {
        username: enteredusername,
        password: enteredpassword,
      };
      props.onEditProfileSubmit(usernewdata);
    } else {
      //TODO: alert or validate or something
    }
  }

  return (
    <Form onSubmit={profileSubmitHandler} noValidate>
      <Row className="justify-content-center my-4">
        <Col xs="8">
          <Form.Floating>
            <Form.Control
              ref={newusernameref}
              type="text"
              placeholder="Username"
              id="newusername"
            />
            <Form.Label htmlFor="newusername">New username</Form.Label>
          </Form.Floating>
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col xs="8">
          <Form.Floating>
            <Form.Control
              isInvalid={passwordsDoNotMatch}
              isValid={passwordsMatch}
              ref={newpasswordref}
              type="password"
              placeholder="Password"
              id="newpassword"
              onKeyDown={handleKeyDown}
              onClick={handleKeyDown}
            />
            <Form.Label htmlFor="newpassword">New password</Form.Label>
          </Form.Floating>
          <Form.Control.Feedback type="valid">
            Passwords match
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Passwords need to match
          </Form.Control.Feedback>
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
            <Form.Label htmlFor="newpasswordconfirm">
              Confirm new password
            </Form.Label>
          </Form.Floating>
          <Form.Control.Feedback type="valid">
            Passwords match
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Passwords need to match
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="justify-content-center my-3">
        <Col xs="4">
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default EditProfileForm;
