import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ResetPasswordForm from "../Components/Forms/ResetPasswordForm";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const BaseURL = "http://localhost:8000/"; // api url

  function changePassword(userdata) {
    axios
      .patch(BaseURL + "user/" + userdata.id, [
        {
          propName: "password",
          value: userdata.password,
        },
      ])
      .then((response) => {
        navigate("/LoginPage", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container fluid="md" className="mt-5">
      <div className="text-center my-4">
        <img
          width={170}
          height={170}
          src={require("../Icons/earth-logo.png")}
          alt="hello"
        />
      </div>
      <Card style={{ width: "23rem" }} className="shadow mx-auto">
        <ResetPasswordForm onNewPasswordEntered={changePassword} />
      </Card>
      <Row className="justify-content-center mt-3">
        <Col className="text-center">
          <Button variant="link" href="/LoginPage">
            Log in
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPasswordPage;
