import { useRef, useState } from "react";
import { Alert, Card, Col, Container, Form, Row } from "react-bootstrap";
import visitScript from "../../visitScript";

function VisitScriptPage() {
  const numberofusersref = useRef();
  const startdayref = useRef();
  const enddayref = useRef();
  const [alertShow, setAlertShow] = useState(false);
  const [successAlertShow, setSuccessAlertshow] = useState(false);

  function runscript(event) {
    event.preventDefault();
    const num_of_users = numberofusersref.current.value;

    const offset = new Date(startdayref.current.value).getTimezoneOffset();
    const startTimestamp =
      new Date(startdayref.current.value).getTime() + offset * 60000;
    const endTimestamp =
      new Date(enddayref.current.value).getTime() + offset * 60000;

    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    if (startTimestamp < endTimestamp && num_of_users > 0) {
      visitScript(num_of_users, startDate, endDate);
      setAlertShow(false);
      setSuccessAlertshow(true);
    } else {
      setAlertShow(true);
      setSuccessAlertshow(false);
    }
  }

  return (
    <>
      {alertShow && (
        <Container className="w-75 mt-3">
          <Alert
            show={alertShow}
            variant="danger"
            onClose={() => setAlertShow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              Please enter valid data.
              <br /> Start day needs to be before end day. <br />
              Number of users needs to be a positive integer.
            </Alert.Heading>
          </Alert>
        </Container>
      )}
      {successAlertShow && (
        <Container className="w-75 mt-3">
          <Alert
            show={successAlertShow}
            variant="success"
            onClose={() => setSuccessAlertshow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              Visits and users added successfully to the database
            </Alert.Heading>
          </Alert>
        </Container>
      )}
      <Container className="w-50 mx-auto mt-3">
        <Card style={{ width: "23rem" }} className="shadow mx-auto">
          <Form onSubmit={runscript}>
            <Row className="justify-content-center my-3">
              <Col xs="10">
                <Form.Label htmlFor="numberofusers">
                  Enter number of users
                </Form.Label>

                <Form.Control
                  type="number"
                  name="numberofusers"
                  ref={numberofusersref}
                  required
                />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="5">
                <Form.Group controlId="startdate" className="mb-2">
                  <Form.Label>Start Day</Form.Label>
                  <Form.Control
                    type="date"
                    name="startdate"
                    ref={startdayref}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs="5">
                <Form.Group controlId="enddate" className="mb-2">
                  <Form.Label>End Day</Form.Label>
                  <Form.Control
                    type="date"
                    name="enddate"
                    ref={enddayref}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default VisitScriptPage;
