import { Route, Routes } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import StartPage from "./Pages/StartPage";
import UserCovidTestSubmitPage from "./Pages/User/UserCovidTestSubmitPage";
import CovidCaseStatsPage from "./Pages/User/CovidCaseStatsPage";
import EditProfilePage from "./Pages/User/EditProfilePage";
import VisitHistoryPage from "./Pages/User/VisitHistoryPage";
import CovidTestHistoryPage from "./Pages/User/CovidTestHistoryPage";
import StatisticsPage from "./Pages/Admin/StatisticsPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import MapPage from "./Pages/User/MapPage";
import AddUpdateDeletePOIsPage from "./Pages/Admin/AddUpdateDeletePOIs";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />

          <Route path="/MapPage" element={<MapPage />} />

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
          <Route
            path="/AddUpdateDeletePOIsPage"
            element={<AddUpdateDeletePOIsPage />}
          />
          <Route path="/StatisticsPage" element={<StatisticsPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
