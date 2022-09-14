import axios from "axios";
import { useContext, useState } from "react";
import { Card, Container } from "react-bootstrap";
import EditProfileForm from "../../Components/Forms/EditProfileForm";
import UserContext from "../../Store/UserContext";

function EditProfilePage() {
  const [isloading, setIsloading] = useState();
  const user_context = useContext(UserContext);
  const BaseURL = "http://localhost:8000/"; // api url

  function editProfileSubmitHandler(usernewdata) {
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
    <Container fluid className="mt-5">
      <Card style={{ width: "23rem" }} className="shadow bg-cyan mx-auto">
        <h2 className="text-center mt-2">Edit your profile</h2>
        <EditProfileForm onEditProfileSubmit={editProfileSubmitHandler} />
      </Card>
    </Container>
  );
}

export default EditProfilePage;
