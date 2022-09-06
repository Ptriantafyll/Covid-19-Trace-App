import { useContext, useState } from "react";
import CovidCasesStatsTable from "../Components/CovidCasesStatsTable";
import UserContext from "../Store/CurrentUserContext";
import VisitsContext from "../Store/VisitsContext";

function CovidCaseStatsPage() {
  const visits_context = useContext(VisitsContext);
  const user_context = useContext(UserContext);
  const current_user = user_context.username;
  // console.log(visits_context.last_2weeks_visits_of_allusers);
  // console.log(visits_context.last_weeks_visits_of_current_user);
  const alluservisits = visits_context.last_2weeks_visits_of_allusers;
  const currentuservisits = visits_context.last_weeks_visits_of_current_user;
  const [myTableData, setMyTableData] = useState(null);

  if (myTableData === null) {
    getTableData();
  }

  function getTableData() {
    var tableVisits = [];
    for (const visit in alluservisits) {
      // iterate allusers visits for the last 2 weeks

      if (alluservisits[visit].user !== current_user) {
        // ignore visits of the current user
        console.log("different users");
        var timedifference = 0;

        if (alluservisits[visit].covid_case) {
          // if there was a covid case during that visit
          for (const uservisit in currentuservisits) {
            // iterate current user's visits of last week
            timedifference = Math.abs(
              alluservisits[visit].time - currentuservisits[uservisit].time
            );

            if (timedifference < 7200000) {
              // +- 2 hours difference from the covid case
              console.log("push");
              tableVisits.push(currentuservisits[uservisit]);
              break;
            }
          }
        }
      }
    }

    console.log(tableVisits);

    if (tableVisits.length > 0) {
      console.log(tableVisits[0].time);
      console.log(new Date(parseInt(tableVisits[0].time)));
      console.log(new Date(1607110465663));
      console.log("here");
      console.log(tableVisits[0]);

      setMyTableData(
        tableVisits.map((tablevisit) => {
          const tablevisitdate = new Date(parseInt(tablevisit.time));
          const year = tablevisitdate.getFullYear();
          const month = tablevisitdate.getMonth();
          const day =
            tablevisitdate.getDay() === 0 ? 7 : tablevisitdate.getDay();
          const hour = tablevisitdate.getHours();
          const minutes = tablevisitdate.getMinutes();
          const seconds = tablevisitdate.getSeconds();

          const tabledate =
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hour +
            ":" +
            minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
            ":" +
            seconds.toLocaleString("en-US", { minimumIntegerDigits: 3 });
          return (
            <tr key={tablevisit.user + tablevisit.time}>
              <td>{tablevisit.POI}</td>
              <td>{tabledate}</td>
            </tr>
          );
        })
      );
    }
  }

  return <CovidCasesStatsTable tableData={myTableData} />;
}

export default CovidCaseStatsPage;