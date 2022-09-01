import { createContext, useState } from "react";

const UserContext = createContext({
  username: "",
  keepUser: (currentuser) => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState();

  function keepUserHandler(currentuser) {
    setUser(currentuser);
  }

  const context = {
    username: user,
    keepUser: keepUserHandler,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
