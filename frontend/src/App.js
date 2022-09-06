import { Route, Routes } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import StartPage from "./Pages/StartPage";
import UserHomePage from "./Pages/User/UserHomePage";
import UserCovidTestSubmitPage from "./Pages/User/UserCovidTestSubmitPage";
import CovidCaseStatsPage from "./Pages/User/CovidCaseStatsPage";
import EditProfilePage from "./Pages/User/EditProfilePage";
import VisitHistoryPage from "./Pages/User/VisitHistoryPage";
import CovidTestHistoryPage from "./Pages/User/CovidTestHistoryPage";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/UserHomePage" element={<UserHomePage />} />
          <Route
            path="/UserCovidTestSubmitPage"
            element={<UserCovidTestSubmitPage />}
          />
          <Route path="/CovidCaseStatsPage" element={<CovidCaseStatsPage />} />
          <Route path="/EditProfilePage" element={<EditProfilePage />} />
          <Route path="/VisitHistoryPage" element={<VisitHistoryPage />} />
          <Route
            path="/CovidTestHistoryPage"
            element={<CovidTestHistoryPage />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
