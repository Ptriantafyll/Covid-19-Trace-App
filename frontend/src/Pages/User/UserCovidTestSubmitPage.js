import axios from "axios";
import { useContext, useState } from "react";
import { Card, Container } from "react-bootstrap";
import CovidTestForm from "../../Components/Forms/CovidTestForm";

import UserContext from "../../Store/UserContext";

function UserCovidTestSubmitPage() {
  const BaseURL = "http://localhost:8000/"; // api url
  const [isloading, setIsloading] = useState(false);
  const user_context = useContext(UserContext);

  function testFormSubmitHandler(testdata) {
    const time = new Date(testdata.date).getTime();
    const offest = new Date(testdata.date).getTimezoneOffset();
    const correcttime = new Date(time - offest * 60000);

    setIsloading(true);
    axios
      .patch(BaseURL + "user/" + user_context.id, [
        {
          propName: "covid_test",
          value: {
            date: new Date(correcttime),
            result: testdata.result,
          },
        },
      ])
      .then((response) => {
        console.log(response.data.message);
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
    <Container className="mt-5 w-50">
      <Card className="p-3">
        <h2 className="text-center">
          Enter the details of your latest covid-19 test
        </h2>
        <CovidTestForm onTestSubmit={testFormSubmitHandler} />
      </Card>
    </Container>
  );
}

export default UserCovidTestSubmitPage;
