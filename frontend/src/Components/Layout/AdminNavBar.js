import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from "react-router-dom";

function AdminNavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Logo
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <div
              role="button"
              className="nav-link"
              onClick={() => {
                navigate("/AdminHomePage", { replace: true });
              }}
            >
              AdminHomePage
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavBar;
