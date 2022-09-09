import { useContext } from "react";
import { Container } from "react-bootstrap";
import TotalCovidCasesStats from "../../Components/Statistics/TotalCovidCasesStats";
import TotalVisitStats from "../../Components/Statistics/TotalVisitStats";
import CaseVisitStats from "../../Components/Statistics/CaseVisitStats";
import VisitsContext from "../../Store/VisitsContext";
import UserContext from "../../Store/UserContext";

function StatisticsPage() {
  const visits_context = useContext(VisitsContext);
  const user_context = useContext(UserContext);
  // get visit data
  var totalvisits = 0;
  var visitdata = [];
  var mydata = {};

  if (visits_context.all_visits !== undefined) {
    totalvisits = visits_context.all_visits.count;
    for (const visit of visits_context.all_visits.visits) {
      if (mydata[visit.POI]) {
        mydata[visit.POI] += 1;
      } else {
        mydata[visit.POI] = 1;
      }
    }
  }

  visitdata.push(["POI", "% of visits"]);
  for (const element of Object.entries(mydata)) {
    visitdata.push(element);
  }

  //get covid data
  mydata = {};
  var i = 0;
  var totalcases = 0;
  var all_tests = [];
  if (user_context.all_users !== undefined) {
    for (const user of user_context.all_users) {
      if (Object.keys(user.covid_test).length > 0) {
        all_tests.push(user.covid_test);
        all_tests[i].user = user.username;
        i++;
      }
      for (const test of user.past_covid_tests) {
        if (Object.keys(test).length > 0) {
          all_tests.push(test);
          all_tests[i].user = user.username;
          i++;
        }
      }
    }

    for (const test of all_tests) {
      if (mydata[test.user]) {
        if (test.result) {
          totalcases += 1;
          mydata[test.user] += 1;
        }
      } else {
        if (test.result) {
          totalcases += 1;
          mydata[test.user] = 1;
        } else {
          mydata[test.user] = 0;
        }
      }
    }
  }

  var coviddata = [];
  coviddata.push(["User", "%of cases"]);
  for (const element of Object.entries(mydata)) {
    coviddata.push(element);
  }

  // get visits by case data
  var casevisits = 0;
  mydata = {};
  var maxtime = 0;
  var mintime = 0;
  if (visits_context.all_visits !== undefined) {
    for (const visit of visits_context.all_visits.visits) {
      maxtime = parseInt(visit.time) + 2 * 604800000;
      mintime = parseInt(visit.time) - 604800000;
      if (!visit.covid_case) {
        for (const test of all_tests) {
          if (test.result && test.user === visit.user) {
            if (
              new Date(test.date).getTime() > mintime &&
              new Date(test.date).getTime() < maxtime
            ) {
              // consolelog("this visit is a case");
              visit.covid_case = true;
            }
          }
        }
      }
    }

    for (const visit of visits_context.all_visits.visits) {
      if (visit.covid_case) {
        if (mydata[visit.user]) {
          mydata[visit.user] += 1;
        } else {
          mydata[visit.user] = 1;
        }
        casevisits += 1;
      }
    }
  }

  var casevisitdata = [];
  casevisitdata.push(["user", "visits while being a case"]);
  for (const element of Object.entries(mydata)) {
    casevisitdata.push(element);
  }

  // all types of pois
  const typefile = require("./types.json");

  return (
    <div>
      <Container className="w-100 mx-auto bg-dark p-2 my-5">
        <h1 className="text-white text-center">Visits</h1>

        <TotalVisitStats totalvisits={totalvisits} data={visitdata} />
      </Container>
      <Container className="w-100 mx-auto bg-dark p-2 my-5">
        <h1 className="text-white text-center">Covid-19 Cases</h1>

        <TotalCovidCasesStats totalcases={totalcases} data={coviddata} />
      </Container>
      <Container className="w-100 mx-auto bg-dark p-2 my-5">
        <h1 className="text-white text-center">Visits by Covid-19 Cases</h1>

        <CaseVisitStats casevisits={casevisits} data={casevisitdata} />
      </Container>
    </div>
  );
}

export default StatisticsPage;
