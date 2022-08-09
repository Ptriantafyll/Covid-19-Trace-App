import "w3css/w3.css";

function SignupForm() {
  return (
    <div id="loginform" className="w3-card-2 w3-display-middle">
      <input className="w3-input w3-border " placeholder="Username"></input>
      <input className="w3-input w3-border" placeholder="Email"></input>
      <input className="w3-input w3-border" placeholder="Password"></input>
    </div>
  );
}

export default SignupForm;
