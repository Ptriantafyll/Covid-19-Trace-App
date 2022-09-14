import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import { Button, Col, Form, FormLabel, FormSelect, Row } from "react-bootstrap";

function CovidTestForm(props) {
  const dateref = useRef();
  const hourref = useRef();
  const testresultref = useRef();

  function testSubmitHandler(event) {
    event.preventDefault();

    const selectedhour = hourref.current.value;
    const selectedtestresult =
      testresultref.current.value === "Positive" ? true : false;
    const selecteddate = dateref.current.value;
    const date = selecteddate + " " + selectedhour + ":00.000";

    const testdata = {
      date: date,
      result: selectedtestresult,
    };

    // covidtestform will have a property "onTestSubmit"
    props.onTestSubmit(testdata);
  }

  return (
    <Form onSubmit={testSubmitHandler}>
      <Row className="justify-content-center mb-2">
        <Col sm="5">
          <Form.Group>
            <FormLabel htmlFor="chosendate">Date</FormLabel>
            <Form.Control
              type="date"
              ref={dateref}
              name="chosendate"
              required
            />
          </Form.Group>
        </Col>
        <Col sm="5">
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
        </Col>
      </Row>
      <Row className="justify-content-center mb-2">
        <Col sm="6">
          <FormLabel htmlFor="testresult">Result</FormLabel>
          <FormSelect id="testresult" ref={testresultref}>
            <option>Positive</option>
            <option>Negative</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="justify-content-center mb-3 mt-3">
        <Col sm="2">
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default CovidTestForm;
