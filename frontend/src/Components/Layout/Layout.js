import "w3css/w3.css";
import NavBar from "./NavBar";

function Layout(props) {
  return (
    <div>
      <NavBar />
      <main className="w3-main">{props.children}</main>
    </div>
  );
}

export default Layout;
