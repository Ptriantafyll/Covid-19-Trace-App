import SignupForm from "../Components/Forms/SignupForm";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const BaseURL = "http://localhost:8000/"; // api url

  function userSignupHandler(newuserdata) {
    console.log(newuserdata);
    axios
      .post(BaseURL + "user/signup", {
        username: newuserdata.username,
        email: newuserdata.email,
        password: newuserdata.password,
      })
      .then((response) => {
        console.log(response);
        navigate("/LoginPage", { replace: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <section>
      <h2 className="mt-3 text-center">Fill in the form to sign up</h2>
      <SignupForm onUserSignUp={userSignupHandler} />
    </section>
  );
}

export default SignupPage;
