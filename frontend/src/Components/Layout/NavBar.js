import "w3css/w3.css";

function NavBar() {
  return (
    <div className="w3-top">
      <div className="w3-bar w3-white w3-wide w3-padding-jumbo w3-card">
        Name of the site here
        <div className="w3-right w3-hide-small">
          <a href="/LogIn" className="w3-bar-item w3-padding w3-hover-blue">
            LogIn
          </a>
          <a href="/" className="w3-bar-item w3-padding w3-hover-blue">
            SignUp
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
