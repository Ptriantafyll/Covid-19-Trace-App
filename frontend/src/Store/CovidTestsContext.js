// import axios from "axios";
// import { createContext, useState } from "react";

// const CovidTestsContext = createContext({
//   users: [],
//   storeUsers: () => {},
// });

// export function CovidTestsContextProvider(props) {
//   const BaseURL = "http://localhost:8000/"; // api url
//   const [users, setUsers] = useState();

//   function storeUsersHandler() {
//     axios
//       .get(BaseURL + "user")
//       .then((response) => {
//         setUsers(response.data.users);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   const context = {
//     users: users,
//     storeUsers: storeUsersHandler,
//   };

//   return (
//     <CovidTestsContext.Provider value={context}>
//       {props.children}
//     </CovidTestsContext.Provider>
//   );
// }

// export default CovidTestsContext;
