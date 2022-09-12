import { useContext, useState } from "react";
import { Alert, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import TotalCovidCasesStats from "../../Components/Statistics/TotalCovidCasesStats";
import TotalVisitStats from "../../Components/Statistics/TotalVisitStats";
import CaseVisitStats from "../../Components/Statistics/CaseVisitStats";
import VisitsContext from "../../Store/VisitsContext";
import UserContext from "../../Store/UserContext";
import POIContext from "../../Store/POIContext";
import POIVisitStats from "../../Components/Statistics/POIVisitStats";
import DailyStats from "../../Components/Statistics/DailyStats";
import HourlyStats from "../../Components/Statistics/HourlyStats";

function StatisticsPage() {
  const visits_context = useContext(VisitsContext);
  const user_context = useContext(UserContext);
  const poi_context = useContext(POIContext);
  const [viewdata, setviewdata] = useState();
  const [mytitle, setmytitle] = useState("Total Visits");
  const [chartView, setChartView] = useState(null);
  const [startDate, setStartDate] = useState("2022-09-01");
  const [endDate, setEndDate] = useState("2022-10-01");
  const [legendColor, setlegendColor] = useState();
  const [alertShow, setAlertShow] = useState(false);
  const [hourChartView, setHourChartView] = useState(null);
  const [hourChartDay, setHourChartDay] = useState("2022-09-06");
  const [hourlegendColor, setHourlegendColor] = useState();

  function checkBoxHandler(event) {
    console.log(event.target.checked);
    if (event.target.checked) {
      setviewdata(poivisitdata);
      setmytitle("Total Visits");
    } else {
      setviewdata(poicasedata);
      setmytitle("Total Visits by covid-19 cases");
    }
  }

  function startdaySelectHandler(event) {
    console.log(event.target.value);
    if (endDate < event.target.value) {
      console.log("we got a problem");
      setAlertShow(true);
    } else {
      setStartDate(event.target.value);
      setAlertShow(false);
    }
  }

  function enddaySelectHandler(event) {
    console.log(event.target.value);
    if (event.target.value < startDate) {
      console.log("we got a problem");
      setAlertShow(true);
    } else {
      setEndDate(event.target.value);
      setAlertShow(false);
    }
  }

  function dropdownSelectHandler(eventKey, event) {
    if (eventKey === "totalvisits") {
      setChartView(dailyvisitdata);
      setlegendColor(null);
    } else if (eventKey === "casevisits") {
      setlegendColor(["#b0120a"]);
      setChartView(dailycasedata);
    } else {
      setlegendColor(null);
      setChartView(dailydata);
    }
  }

  function selectDayHandler(event) {
    console.log(event.target.value);
    setHourChartDay(event.target.value);
  }

  function hourdropdownHandler(eventKey, event) {
    console.log(eventKey);
    if (eventKey === "totalvisits") {
      setHourlegendColor(null);
      setHourChartView(hourlyVisitData);
    } else if (eventKey === "casevisits") {
      setHourlegendColor(["#b0120a"]);
      setHourChartView(hourlyCaseData);
    } else {
      setHourlegendColor(null);
      setHourChartView(hourlyData);
    }
  }

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

  // get rank of pois by visit
  mydata = {};
  var mydata2 = {};
  var poivisitdata = [];
  var poicasedata = [];

  if (visits_context.all_visits !== undefined) {
    for (const visit of visits_context.all_visits.visits) {
      // console.log(visit);
      // console.log(visit.covid_case);
      if (poi_context.poidata !== undefined) {
        // console.log(poi_context.poidata);
        // console.log(poi_context.poidata[visit.POI]);
        for (const type of poi_context.poidata[visit.POI]) {
          if (type === "point_of_interest") continue;

          if (mydata[type]) {
            mydata[type] += 1;
          } else {
            mydata[type] = 1;
          }

          if (visit.covid_case) {
            if (mydata2[type]) {
              mydata2[type] += 1;
            } else {
              mydata2[type] = 1;
            }
          }
        }
      }
    }

    // console.log(mydata2); // poi visits of cases
    // console.log(mydata); //poi all visits

    poivisitdata.push(["poiname", "# of visits"]);
    for (const element of Object.entries(mydata)) {
      // console.log(element);
      poivisitdata.push(element);
    }
    poicasedata.push(["poiname", "# of case visits"]);
    for (const element of Object.entries(mydata2)) {
      poicasedata.push(element);
    }
    // console.log(poivisitdata);
    // console.log(poicasedata);
  }

  // get daily data
  mydata = {};
  mydata2 = {};
  var dailydata = [["Day of the week", "# of visits", "# of case visits"]];
  var dailycasedata = [
    ["Day of the week", "# of case visits", { role: "style" }],
  ];
  var dailyvisitdata = [["Day of the week", "# of visits"]];

  if (visits_context.all_visits !== undefined) {
    mydata["Monday"] = 0;
    mydata["Tuesday"] = 0;
    mydata["Wednesday"] = 0;
    mydata["Thursday"] = 0;
    mydata["Friday"] = 0;
    mydata["Saturday"] = 0;
    mydata["Sunday"] = 0;
    mydata2["Monday"] = 0;
    mydata2["Tuesday"] = 0;
    mydata2["Wednesday"] = 0;
    mydata2["Thursday"] = 0;
    mydata2["Friday"] = 0;
    mydata2["Saturday"] = 0;
    mydata2["Sunday"] = 0;

    console.log(startDate);
    console.log(endDate);

    const offset = new Date(startDate).getTimezoneOffset() * 60000;
    const starttimestamp = new Date(startDate).getTime() + offset;
    const endtimestamp = new Date(endDate).getTime() + offset;

    // console.log(starttimestamp);
    // console.log(endtimestamp);
    for (const visit of visits_context.all_visits.visits) {
      // console.log(visit.time);
      // console.log(new Date(parseInt(visit.time)));
      // console.log(visit.covid_case);

      if (visit.time > starttimestamp && visit.time < endtimestamp) {
        // console.log(new Date(parseInt(visit.time)));

        var visitDay =
          new Date(parseInt(visit.time)).getDay() === 0
            ? 7
            : new Date(parseInt(visit.time)).getDay();
        // console.log(new Date(parseInt(visit.time)));
        // console.log("visit day: " + visitDay);
        // console.log(new Date(parseInt(visit.time)).getDay());

        switch (visitDay) {
          case 1:
            visitDay = "Monday";
            break;
          case 2:
            visitDay = "Tuesday";
            break;
          case 3:
            visitDay = "Wednesday";
            break;
          case 4:
            visitDay = "Thursday";
            break;
          case 5:
            visitDay = "Friday";
            break;
          case 6:
            visitDay = "Saturday";
            break;
          case 7:
            visitDay = "Sunday";
            break;

          default:
            break;
        }

        mydata[visitDay]++;

        if (visit.covid_case) mydata2[visitDay]++;
      }
    }
    // console.log(mydata);
    // console.log(mydata2);

    for (const element of Object.entries(mydata)) {
      // console.log(element);
      dailyvisitdata.push(element);
      for (const element2 of Object.entries(mydata2)) {
        if (element[0] === element2[0]) {
          // console.log([element[0], element[1], element2[1]]);
          dailydata.push([element[0], element[1], element2[1]]);
        }
      }
    }
    for (const element of Object.entries(mydata2)) {
      dailycasedata.push([element[0], element[1], "#b0120a"]);
    }

    // console.log(dailydata);
    // console.log(dailyvisitdata);
    // console.log(dailycasedata);
  }

  // set hour data
  mydata = {};
  mydata2 = {};
  var hourlyData = [["Hour", "# of visits", "# of case visits"]];
  var hourlyVisitData = [["Hour", "# of visits"]];
  var hourlyCaseData = [["Hour", "# of case visits", { role: "style" }]];

  if (visits_context.all_visits !== undefined) {
    for (let i = 0; i < 24; i++) {
      let temphour =
        i.toLocaleString("en-US", { minimumIntegerDigits: 2 }) + ":00";

      mydata[temphour] = 0;
      mydata2[temphour] = 0;
    }

    for (const visit of visits_context.all_visits.visits) {
      console.log(visit.time);

      let visitHour =
        new Date(parseInt(visit.time))
          .getHours()
          .toLocaleString("en-US", { minimumIntegerDigits: 2 }) + ":00";
      console.log(visitHour);

      mydata[visitHour]++;
      if (visit.covid_case) mydata2[visitHour]++;
    }

    for (const element of Object.entries(mydata)) {
      // console.log(element);
      hourlyVisitData.push(element);
      for (const element2 of Object.entries(mydata2)) {
        if (element[0] === element2[0]) {
          // console.log([element[0], element[1], element2[1]]);
          hourlyData.push([element[0], element[1], element2[1]]);
        }
      }
    }
    for (const element of Object.entries(mydata2)) {
      hourlyCaseData.push([element[0], element[1], "#b0120a"]);
    }
    console.log(mydata);
    console.log(mydata2);
  }

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
      <Container className="w-100 mx-auto bg-dark p-2 my-5">
        <h1 className="text-white text-center">POIs ranked by visit</h1>
        <Form.Check
          type="checkbox"
          label="visits by case"
          id="casecheckbox"
          onChange={checkBoxHandler}
        />
        <POIVisitStats
          data={viewdata === undefined ? poivisitdata : viewdata}
          vaxistitle={mytitle}
        />
      </Container>
      <Container className="w-100 mx-auto bg-danger p-2 my-5">
        <h1 className="text-white text-center">Hourly # of visits</h1>
        <Row className="justify-content-center">
          <Col md="4">
            <Form.Group controlId="startdate" className="mb-2">
              <Form.Label>Start Day</Form.Label>
              <Form.Control
                type="date"
                name="startdate"
                onChange={startdaySelectHandler}
              />
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group controlId="enddate" className="mb-2">
              <Form.Label>End Day</Form.Label>
              <Form.Control
                type="date"
                name="enddate"
                onChange={enddaySelectHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="7">
            {alertShow && (
              <Alert show={alertShow} variant="danger">
                Start date must be at least a day before end date
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center mb-2">
          <Col md="3">
            <Dropdown onSelect={dropdownSelectHandler}>
              <Dropdown.Toggle variant="success">Select Data</Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="totalvisits">
                  Total Visits
                </Dropdown.Item>
                <Dropdown.Item eventKey="casevisits">
                  Total Visits of Covid cases
                </Dropdown.Item>
                <Dropdown.Item eventKey="bothvisits">Both</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <DailyStats
          data={chartView === null ? dailydata : chartView}
          title={"Visits from " + startDate + " to " + endDate}
          colors={legendColor}
        />
      </Container>
      <Container className="w-100 mx-auto bg-danger p-2 my-5">
        <h1 className="text-white text-center">Daily # of visits</h1>
        <Row className="justify-content-center">
          <Col md="4">
            <Form.Group controlId="chosendate" className="mb-2">
              <Form.Label>Select a Day</Form.Label>
              <Form.Control
                type="date"
                name="chosendate"
                onChange={selectDayHandler}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mb-2">
          <Col md="3">
            <Dropdown onSelect={hourdropdownHandler}>
              <Dropdown.Toggle variant="success">Select Data</Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="totalvisits">
                  Total Visits
                </Dropdown.Item>
                <Dropdown.Item eventKey="casevisits">
                  Total Visits of Covid cases
                </Dropdown.Item>
                <Dropdown.Item eventKey="bothvisits">Both</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <HourlyStats
          data={hourChartView === null ? hourlyData : hourChartView}
          title={"Visits of " + hourChartDay}
          colors={hourlegendColor}
        />
      </Container>
    </div>
  );
}

export default StatisticsPage;
