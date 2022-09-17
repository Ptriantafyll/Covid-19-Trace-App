import axios from "axios";
import { useContext, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import CovidTestForm from "../../Components/Forms/CovidTestForm";

import UserContext from "../../Store/UserContext";

function UserCovidTestSubmitPage() {
  const BaseURL = "http://localhost:8000/"; // api url
  const [isloading, setIsloading] = useState(false);
  const user_context = useContext(UserContext);
  const [alertShow, setAlertShow] = useState(false);
  const [failureAlertShow, setFailureAlertShow] = useState(false);

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
        user_context.keepUser(user_context.username, user_context.id);
        // if (
        //   testdata.result &&
        //   response.data.message !==
        //     "You cannot submit another test until 14 days have passed after you submitted a positive test"
        // ) {
        //   setAlertShow(true);
        //   setFailureAlertShow(false);
        // } else {
        //   setAlertShow(false);
        // }

        if (
          response.data.message ===
          "You cannot submit another test until 14 days have passed after you submitted a positive test"
        ) {
          setFailureAlertShow(true);
        } else if (
          testdata.result &&
          response.data.message !==
            "You cannot submit another test until 14 days have passed after you submitted a positive test"
        ) {
          setAlertShow(true);
          setFailureAlertShow(false);
        } else {
          setAlertShow(false);
          setFailureAlertShow(false);
        }

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
    <div className="mt-3 mx-3">
      {alertShow && (
        <Container className="w-75">
          <Alert
            show={alertShow}
            variant="danger"
            onClose={() => setAlertShow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              You have been diagnosed with covid-19.
              <br />
              You should consult your personal doctor.
              <hr />
              Be careful, stay safe and stay at home.
            </Alert.Heading>
          </Alert>
        </Container>
      )}
      {failureAlertShow && (
        <Container className="w-75">
          <Alert
            show={failureAlertShow}
            variant="danger"
            onClose={() => setFailureAlertShow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              You cannot submit another test until 14 days have passed after you
              submitted a positive test
            </Alert.Heading>
          </Alert>
        </Container>
      )}
      <Container className="mt-3 w-50">
        <Card className="p-3">
          <h4 className="text-center">
            Did you get tested for covid-19?
            <br />
            Enter the details of your test.
          </h4>
          <CovidTestForm onTestSubmit={testFormSubmitHandler} />
        </Card>
      </Container>
    </div>
  );
}

export default UserCovidTestSubmitPage;
