import LoginForm from "../Components/Forms/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Store/CurrentUserContext";

function LoginPage() {
  const navigate = useNavigate();
  const BaseURL = "http://localhost:3000/"; // api url
  const user_context = useContext(UserContext);

  function userLoginHandler(userdata) {
    // console.log(userdata);

    //TODO: να βάλω μία if για να τσεκάρει αν μπαίνει ο admin ή απλός user
    axios
      .post(BaseURL + "user/login", {
        username: userdata.username,
        email: userdata.email,
        password: userdata.password,
      })
      .then((response) => {
        // console.log(response.data.id);
        // console.log(userdata.username);
        // store username and user id
        user_context.keepUser(userdata.username, response.data.id);
        user_context.keepUsername(userdata.username);
        if (userdata.username === "Admin") {
          navigate("/AdminHomePage", { replace: true });
        } else {
          navigate("/UserHomePage", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <section>
      <h2 className="mt-3 text-center">Log in</h2>
      <LoginForm onUserLogin={userLoginHandler} />
    </section>
  );
}

export default LoginPage;
