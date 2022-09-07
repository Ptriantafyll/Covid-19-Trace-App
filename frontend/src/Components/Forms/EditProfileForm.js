import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useRef, useState } from "react";

function EditProfileForm(props) {
  const newusernameref = useRef();
  const newpasswordref = useRef();
  const newpasswordconfirmref = useRef();
  // const [validated, setValidated] = useState(false);
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
    <Container className="w-50 mx-auto">
      <Card>
        <Form onSubmit={profileSubmitHandler} noValidate>
          <Row className="justify-content-center">
            <div className="col-lg-8">
              <Form.Label htmlFor="newusername">Enter new username</Form.Label>
              <Form.Control
                ref={newusernameref}
                type="text"
                placeholder="Username"
                id="newusername"
              />
              <div className="valid-feedback">Good</div>
              <div className="invalid-feedback">
                Please fill out this field.
              </div>
            </div>
          </Row>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Form.Label htmlFor="newpassword">Enter new password</Form.Label>
              <Form.Control
                isInvalid={passwordsDoNotMatch}
                isValid={passwordsMatch}
                ref={newpasswordref}
                type="password"
                placeholder="Username"
                id="newpassword"
                onKeyDown={handleKeyDown}
                onClick={handleKeyDown}
              />
              <Form.Control.Feedback type="valid">
                Passwords match
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Passwords need to match
              </Form.Control.Feedback>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Form.Label htmlFor="newpasswordconfirm">
                Confirm new password
              </Form.Label>
              <Form.Control
                isInvalid={passwordsDoNotMatch}
                isValid={passwordsMatch}
                ref={newpasswordconfirmref}
                type="password"
                placeholder="Username"
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
            </div>
          </div>
          <div className="row justify-content-center">
            <Button type="submit" className="my-2 col-lg-4">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default EditProfileForm;
