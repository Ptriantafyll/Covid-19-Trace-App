import axios from "axios";
import { useContext, useState } from "react";
import EditProfileForm from "../../Components/Forms/EditProfileForm";
import UserContext from "../../Store/CurrentUserContext";

function EditProfilePage() {
  const [isloading, setIsloading] = useState();
  const user_context = useContext(UserContext);
  const BaseURL = "http://localhost:8000/"; // api url

  console.log(user_context);

  function editProfileSubmitHandler(usernewdata) {
    console.log(usernewdata);

    setIsloading(true);
    axios
      .patch(BaseURL + "user/" + user_context.id, [
        {
          propName: "username",
          value: usernewdata.username,
        },
        {
          propName: "password",
          value: usernewdata.password,
        },
      ])
      .then((response) => {
        console.log(response.data.message);
        user_context.keepUsername(usernewdata.username);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error.message); // message sent from backend
        setIsloading(false);
      });
  }

  if (isloading) {
    return (
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="spinner-border text-dark" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center">Edit your profile</h1>
      <EditProfileForm onEditProfileSubmit={editProfileSubmitHandler} />
    </div>
  );
}

export default EditProfilePage;
