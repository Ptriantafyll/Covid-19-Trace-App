import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form } from "react-bootstrap";

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
    <div className="container mt-3">
      <Card className="shadow">
        <Form onSubmit={loginHandler}>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              name="username"
              ref={usernameloginref}
              required
            />
            <label htmlFor="username">Username:</label>
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              ref={emailloginref}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd">Password:</label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              ref={passwordloginref}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
