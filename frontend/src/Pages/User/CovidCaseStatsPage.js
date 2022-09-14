import { useContext, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import CovidCasesStatsTable from "../../Components/Tables/CovidCasesStatsTable";
import UserContext from "../../Store/UserContext";
import VisitsContext from "../../Store/VisitsContext";

function CovidCaseStatsPage() {
  const visits_context = useContext(VisitsContext);
  const user_context = useContext(UserContext);
  const current_user = user_context.username;
  const alluservisits = visits_context.last_2weeks_visits_of_allusers;
  const currentuservisits = visits_context.last_weeks_visits_of_current_user;
  const [alertShow, setAlertShow] = useState(true);
  const [myTableData, setMyTableData] = useState(null);

  if (myTableData === null) {
    getTableData();
  }

  function getTableData() {
    var tableVisits = [];
    for (const uservisit in currentuservisits) {
      // iterate current user's visits of last week
      for (const visit in alluservisits) {
        // iterate allusers visits for the last 2 weeks
        if (alluservisits[visit].user !== current_user) {
          // ignore visits of the current user
          var timedifference = 0;

          if (alluservisits[visit].covid_case) {
            // if there was a covid case during that visit
            timedifference = Math.abs(
              alluservisits[visit].time - currentuservisits[uservisit].time
            );

            if (
              timedifference < 7200000 &&
              alluservisits[visit].POI === currentuservisits[uservisit].POI
            ) {
              // +- 2 hours difference from the covid case
              tableVisits.push(currentuservisits[uservisit]);
              continue;
            }
          }
        }
      }
    }

    if (tableVisits.length > 0) {
      tableVisits.sort((a, b) => a.time - b.time);
      setMyTableData(
        tableVisits.map((tablevisit) => {
          const tablevisitdate = new Date(parseInt(tablevisit.time));
          const year = tablevisitdate.getFullYear();
          const month = tablevisitdate.getMonth() + 1;
          const day = tablevisitdate.getDate();
          const hour = tablevisitdate.getHours();
          const minutes = tablevisitdate.getMinutes();
          const seconds = tablevisitdate.getSeconds();

          const tabledate =
            day.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
            "-" +
            month.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
            "-" +
            year +
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

  return myTableData === null ? (
    <Alert variant="success" className="mt-3 mx-3">
      <Alert.Heading>
        You have not come in contact with a confirmed Covid-19 case in the last
        week.
      </Alert.Heading>
    </Alert>
  ) : (
    <>
      {alertShow && (
        <Alert
          show={alertShow}
          variant="danger"
          className="mt-3 mx-3"
          onClose={() => setAlertShow(false)}
          dismissible
        >
          <Alert.Heading className="text-center">
            Last week you came in contact with at least one confirmed covid-19
            case.
            <br />
            You should do a covid-19 test.
            <hr />
            Be careful, stay safe and stay at home.
          </Alert.Heading>
          {/* <p className="text-center">You should do a covid-19 test</p> */}
        </Alert>
      )}

      <h3 className="text-center mt-3">
        Last week you came in contact with a comfirmed Covid-19 case during
        these visits:
      </h3>
      <Container className="mt-2 w-50 mx-auto p-3">
        <CovidCasesStatsTable tableData={myTableData} />
      </Container>
    </>
  );
}

export default CovidCaseStatsPage;
