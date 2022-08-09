// import logo from "./logo.svg";
import Layout from "./Components/Layout/Layout";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          {/* να τα φτιάξω να δείχνουν στις σωστές σελίδες */}
          <Route exact path="/" element={<SignupPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
