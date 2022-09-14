import { useContext } from "react";
import UserContext from "../../Store/UserContext";
import AdminNavBar from "./AdminNavBar";
// import BasicNavBar from "./BasicNavBar";
import UserNavBar from "./UserNavBar";

function Layout(props) {
  const user_context = useContext(UserContext);

  if (user_context.username === undefined) {
    return (
      <div>
        {/* <BasicNavBar /> */}
        <main>{props.children}</main>
      </div>
    );
  } else if (user_context.username === "Admin") {
    return (
      <div>
        <AdminNavBar />
        <main>{props.children}</main>
      </div>
    );
  } else {
    return (
      <div>
        <UserNavBar />
        <main>{props.children}</main>
      </div>
    );
  }
}

export default Layout;
