import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap";
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
  const [dayMaxValue, setDayMaxValue] = useState(null);
  const [legendColor, setlegendColor] = useState();
  const [mydailytitle, setmydailytitle] = useState(
    "Visits from " + startDate + " to " + endDate
  );
  const [alertShow, setAlertShow] = useState(false);

  const [hourChartView, setHourChartView] = useState(null);
  const [hourChartDay, setHourChartDay] = useState("2022-09-06");
  const [hourlegendColor, setHourlegendColor] = useState();
  const [hourMaxValue, setHourMaxValue] = useState(null);

  function checkBoxHandler(event) {
    if (event.target.checked) {
      setviewdata(poicasedata);
      setmytitle("Total Visits by covid-19 cases");
    } else {
      setviewdata(poivisitdata);
      setmytitle("Total Visits");
    }
  }

  function startdaySelectHandler(event) {
    if (endDate < event.target.value) {
      setAlertShow(true);
    } else {
      setStartDate(event.target.value);
      setAlertShow(false);
    }
  }

  function enddaySelectHandler(event) {
    if (event.target.value < startDate) {
      setAlertShow(true);
    } else {
      setEndDate(event.target.value);
      setAlertShow(false);
    }
  }

  function showDayDataHandler() {
    setChartView(dailydata);
    // setDayMaxValue()
    var myarray = [];
    for (let row of dailydata) {
      myarray.push(row[1]);
    }
    myarray.shift();
    setDayMaxValue(Math.max(...myarray));

    setmydailytitle("Visits from " + startDate + " to " + endDate);
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
    setHourChartDay(event.target.value);
  }

  function showHourDataHandler() {
    setHourChartView(hourlyData);

    var myarray = [];
    for (let row of hourlyData) {
      myarray.push(row[1]);
    }
    myarray.shift();
    setHourMaxValue(Math.max(...myarray));
  }

  function hourdropdownHandler(eventKey, event) {
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

  //get covid case data
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
      // just in case there is a mistake
      if (!visit.covid_case) {
        for (const test of all_tests) {
          mintime = new Date(test.date).getTime - 604800000;
          maxtime = new Date(test.date).getTime + 2 * 604800000;
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
      if (poi_context.poidata !== undefined) {
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

    poivisitdata.push(["poiname", "# of visits"]);
    for (const element of Object.entries(mydata)) {
      poivisitdata.push(element);
    }
    poicasedata.push(["poiname", "# of case visits"]);
    for (const element of Object.entries(mydata2)) {
      poicasedata.push(element);
    }
  }

  // get daily data
  mydata = {};
  mydata2 = {};
  var dailydata = [["Day of the week", "# of visits", "# of case visits"]];
  var dailycasedata = [
    ["Day of the week", "# of case visits", { role: "style" }],
  ];
  var dailyvisitdata = [["Day of the week", "# of visits"]];
  var dailyMaxValue = 0;

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

    const offset = new Date(startDate).getTimezoneOffset() * 60000;
    const starttimestamp = new Date(startDate).getTime() + offset;
    const endtimestamp = new Date(endDate).getTime() + offset;

    for (const visit of visits_context.all_visits.visits) {
      if (visit.time > starttimestamp && visit.time < endtimestamp) {
        var visitDay =
          new Date(parseInt(visit.time)).getDay() === 0
            ? 7
            : new Date(parseInt(visit.time)).getDay();

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

    dailyMaxValue = Math.max(...Object.values(mydata));

    for (const element of Object.entries(mydata)) {
      dailyvisitdata.push(element);
      for (const element2 of Object.entries(mydata2)) {
        if (element[0] === element2[0]) {
          dailydata.push([element[0], element[1], element2[1]]);
        }
      }
    }
    for (const element of Object.entries(mydata2)) {
      dailycasedata.push([element[0], element[1], "#b0120a"]);
    }
  }

  // set hour data
  mydata = {};
  mydata2 = {};
  var hourlyData = [["Hour", "# of visits", "# of case visits"]];
  var hourlyVisitData = [["Hour", "# of visits"]];
  var hourlyCaseData = [["Hour", "# of case visits", { role: "style" }]];
  var hourlyMaxValue = 0;

  if (visits_context.all_visits !== undefined) {
    for (let i = 0; i < 24; i++) {
      let temphour =
        i.toLocaleString("en-US", { minimumIntegerDigits: 2 }) + ":00";

      mydata[temphour] = 0;
      mydata2[temphour] = 0;
    }

    let houroffset = new Date(hourChartDay).getTimezoneOffset() * 60000;
    let starttime = new Date(hourChartDay).getTime() + houroffset;
    let endtime = starttime + 86400000;

    for (const visit of visits_context.all_visits.visits) {
      if (visit.time > starttime && visit.time < endtime) {
        let visitHour =
          new Date(parseInt(visit.time))
            .getHours()
            .toLocaleString("en-US", { minimumIntegerDigits: 2 }) + ":00";

        mydata[visitHour]++;
        if (visit.covid_case) mydata2[visitHour]++;
      }
    }

    hourlyMaxValue = Math.max(...Object.values(mydata));

    for (const element of Object.entries(mydata)) {
      hourlyVisitData.push(element);
      for (const element2 of Object.entries(mydata2)) {
        if (element[0] === element2[0]) {
          hourlyData.push([element[0], element[1], element2[1]]);
        }
      }
    }
    for (const element of Object.entries(mydata2)) {
      hourlyCaseData.push([element[0], element[1], "#b0120a"]);
    }
  }

  return (
    <div>
      <Container className="w-50 mx-auto my-5">
        <h3 className="text-center">Visits</h3>

        <TotalVisitStats totalvisits={totalvisits} data={visitdata} />
      </Container>
      <Container className="w-50 mx-auto my-5">
        <h3 className="text-center">Covid-19 Cases</h3>

        <TotalCovidCasesStats totalcases={totalcases} data={coviddata} />
      </Container>
      <Container className="w-50 mx-auto my-5">
        <h3 className="text-center">Visits by Covid-19 Cases</h3>

        <CaseVisitStats casevisits={casevisits} data={casevisitdata} />
      </Container>
      <Container className="w-50 mx-auto p-2 my-5">
        <h3 className="text-center">POIs ranked by visit</h3>
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
      <Container className="w-50 mx-auto my-5">
        <h3 className="text-center">Daily # of visits</h3>

        <Row className="justify-content-center">
          <Col sm="4">
            <Form.Group controlId="startdate" className="mb-2">
              <Form.Label>Start Day</Form.Label>
              <Form.Control
                type="date"
                name="startdate"
                onChange={startdaySelectHandler}
              />
            </Form.Group>
          </Col>
          <Col sm="4">
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
        <Row className="mb-1">
          <Col sm="2" className=""></Col>
          <Col sm="4" xs="12" className="">
            <Button variant="success" onClick={showDayDataHandler}>
              Show data of date range
            </Button>
          </Col>
          <Col sm="4" xs="12" className="">
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
          title={mydailytitle}
          maxValue={dayMaxValue === null ? dailyMaxValue : dayMaxValue}
          colors={legendColor}
        />
      </Container>
      <Container className="w-50 mx-auto my-5">
        <h3 className="text-center">Hourly # of visits</h3>
        <Row className="justify-content-center">
          <Col xs="4">
            <Form.Label>Select Date</Form.Label>
            <Form.Group controlId="chosendate" className="mb-2">
              <Form.Control
                type="date"
                name="chosendate"
                onChange={selectDayHandler}
              />
            </Form.Group>
          </Col>
          <Col xs="5" className="mt-2">
            <br />
            <Button variant="success" onClick={showHourDataHandler}>
              Show data of date
            </Button>
          </Col>
        </Row>
        <Row className="mb-2 justify-content-center">
          <Col xs="9">
            <Dropdown onSelect={hourdropdownHandler} id="hourdropdown">
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
          maxValue={hourMaxValue === null ? hourlyMaxValue : hourMaxValue}
          colors={hourlegendColor}
        />
      </Container>
    </div>
  );
}

export default StatisticsPage;
