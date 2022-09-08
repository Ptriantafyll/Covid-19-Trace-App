import axios from "axios";
import { useContext, useState } from "react";
import CovidTestForm from "../../Components/Forms/CovidTestForm";

import UserContext from "../../Store/CurrentUserContext";

function UserCovidTestSubmitPage() {
  const BaseURL = "http://localhost:8000/"; // api url
  const [isloading, setIsloading] = useState(false);
  const user_context = useContext(UserContext);

  function testFormSubmitHandler(testdata) {
    // console.log(testdata);
    // console.log(user_context.id);

    const time = new Date(testdata.date).getTime();
    const correcttime = new Date(time + 7200000);

    setIsloading(true);
    // console.log(testdata.date);
    // console.log(new Date(testdata.date));
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
    <div>
      <h2 className="text-center">Have you been diagnosed with COVID-19?</h2>
      <CovidTestForm onTestSubmit={testFormSubmitHandler} />
    </div>
  );
}

export default UserCovidTestSubmitPage;
