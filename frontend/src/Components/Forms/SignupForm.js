import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

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
    <div className="container mt-3">
      <Form className="was-validated" onSubmit={signupSubmitHandler}>
        <div className="mb-3 mt-3">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            name="username"
            ref={usernameinputref}
            required
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            ref={emailinputref}
            required
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="pwd">Password:</label>
          <input
            type="text"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
            ref={passwordinputref}
            required
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </Form>
    </div>
  );
}

export default SignupForm;
