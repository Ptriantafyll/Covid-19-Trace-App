import axios from "axios";
import { createContext, useState } from "react";

const UserContext = createContext({
  username: "",
  id: "",
  covid_tests: {},
  all_users: [],
  keepUser: (currentuser, id) => {},
  keepUsername: (currentuser) => {},
  storeUsers: () => {},
});

export function UserContextProvider(props) {
  const BaseURL = "http://localhost:8000/"; // api url
  const [user, setUser] = useState();
  const [userid, setUserid] = useState();
  const [tests, setTests] = useState([]);
  const [users, setUsers] = useState();

  function keepUserHandler(currentuser, id) {
    setUser(currentuser);
    setUserid(id);

    const covidtests = [];

    axios
      .get(BaseURL + "user/" + id)
      .then((response) => {
        covidtests.push(response.data.user.covid_test);

        const past_tests = response.data.user.past_covid_tests;
        for (const test in past_tests) {
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

  function keepUsernameHandler(currentuser) {
    setUser(currentuser);
  }

  function storeUsersHandler() {
    axios
      .get(BaseURL + "user")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const context = {
    username: user,
    id: userid,
    covid_tests: tests,
    all_users: users,
    keepUser: keepUserHandler,
    keepUsername: keepUsernameHandler,
    storeUsers: storeUsersHandler,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
