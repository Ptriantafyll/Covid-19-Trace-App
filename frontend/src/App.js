// import logo from "./logo.svg";
import Layout from "./Components/Layout/Layout";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import UserHomePage from "./Pages/UserHomePage";
import StartPage from "./Pages/StartPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route path="/UserHomePage" element={<UserHomePage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
