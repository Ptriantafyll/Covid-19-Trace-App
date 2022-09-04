import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormLabel,
  FormSelect,
} from "react-bootstrap";

function CovidTestForm(props) {
  const yearref = useRef();
  const monthref = useRef();
  const dayref = useRef();
  const hourref = useRef();
  const testresultref = useRef();

  function testSubmitHandler(event) {
    event.preventDefault();

    const selectedyear = yearref.current.value;
    var selectedmonth = monthref.current.value;
    const selectedday = dayref.current.value;
    const selectedhour = hourref.current.value;

    const selectedtestresult =
      testresultref.current.value === "Positive" ? true : false;

    switch (selectedmonth) {
      case "January":
        selectedmonth = "01";
        break;
      case "February":
        selectedmonth = "02";
        break;
      case "March":
        selectedmonth = "03";
        break;
      case "April":
        selectedmonth = "04";
        break;
      case "May":
        selectedmonth = "05";
        break;
      case "June":
        selectedmonth = "06";
        break;
      case "July":
        selectedmonth = "07";
        break;
      case "August":
        selectedmonth = "08";
        break;
      case "September":
        selectedmonth = "09";
        break;
      case "October":
        selectedmonth = "10";
        break;
      case "November":
        selectedmonth = "11";
        break;
      case "December":
        selectedmonth = "12";
        break;

      default:
        break;
    }

    const date =
      selectedyear +
      "-" +
      selectedmonth +
      "-" +
      selectedday +
      " " +
      selectedhour +
      ":00.000";

    const testdata = {
      date: date,
      result: selectedtestresult,
    };

    props.onTestSubmit(testdata);
  }

  return (
    <Form onSubmit={testSubmitHandler}>
      <Container className="w-25">
        <Card>
          <div className="row">
            <div className="col-lg-6">
              <FormLabel htmlFor="year">Year</FormLabel>
              <FormSelect id="year" ref={yearref}>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </FormSelect>
            </div>
            <div className="col-lg-6">
              <FormLabel htmlFor="month">Month</FormLabel>
              <FormSelect id="month" ref={monthref}>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </FormSelect>
            </div>
            <div className="col-lg-6">
              <FormLabel htmlFor="day">Day</FormLabel>
              <FormSelect id="day" ref={dayref}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </FormSelect>
            </div>
            <div className="col-lg-6">
              <FormLabel htmlFor="hour">Hour</FormLabel>
              <FormSelect id="hour" ref={hourref}>
                <option>00:00</option>
                <option>01:00</option>
                <option>02:00</option>
                <option>03:00</option>
                <option>04:00</option>
                <option>05:00</option>
                <option>06:00</option>
                <option>07:00</option>
                <option>08:00</option>
                <option>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
                <option>22:00</option>
                <option>23:00</option>
              </FormSelect>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-5">
              <FormLabel htmlFor="testresult">Result</FormLabel>
              <FormSelect id="testresult" ref={testresultref}>
                <option>Positive</option>
                <option>Negative</option>
              </FormSelect>
            </div>
          </div>
          <div className="row justify-content-center">
            <Button type="submit" className="mt-2 col-lg-5">
              Submit
            </Button>
          </div>
        </Card>
        <div className="mb-5"></div>
      </Container>
    </Form>
  );
}

export default CovidTestForm;
