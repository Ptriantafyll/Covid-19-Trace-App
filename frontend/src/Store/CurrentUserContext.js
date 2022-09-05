import axios from "axios";
import { createContext, useState } from "react";

const UserContext = createContext({
  username: "",
  id: "",
  covid_tests: {},
  keepUser: (currentuser, id) => {},
});

export function UserContextProvider(props) {
  const BaseURL = "http://localhost:3000/"; // api url
  const [user, setUser] = useState();
  const [userid, setUserid] = useState();
  const [tests, setTests] = useState([]);

  function keepUserHandler(currentuser, id) {
    setUser(currentuser);
    setUserid(id);

    const covidtests = [];

    axios
      .get(BaseURL + "user/62fa1c2308d85b214df7fce2" /*+ username*/)
      .then((response) => {
        covidtests.push(response.data.user.covid_test);

        const past_tests = response.data.user.past_covid_tests;
        // console.log(response.data.user.past_covid_tests);
        for (const test in past_tests) {
          // console.log(past_tests[test]);

          if (Object.keys(past_tests[test]).length !== 0) {
            covidtests.push(past_tests[test]);
          }
        }

        setTests(covidtests);
      })
      .catch((error) => {
        console.log(error); // message sent from backend
      });
  }

  const context = {
    username: user,
    id: userid,
    covid_tests: tests,
    keepUser: keepUserHandler,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
