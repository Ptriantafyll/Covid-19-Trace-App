import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";

function FileForm(props) {
  const fileref = useRef();
  const BaseURL = "http://localhost:8000/"; // api url

  function fileSubmitAddHandler(event) {
    event.preventDefault();

    console.log("clicked add");
    console.log(fileref.current.files[0].name);

    axios
      .post(BaseURL + "POI/bulk", {
        filename: fileref.current.files[0].name,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }

  function fileSubmitUpdateHandler(event) {
    event.preventDefault();
    console.log("clicked update");

    console.log(fileref.current.files[0].name);

    axios
      .patch(BaseURL + "POI/bulk/" + fileref.current.files[0].name)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fileSubmitDeleteHandler(event) {
    event.preventDefault();
    console.log("clicked delete");

    axios
      .delete(BaseURL + "POI/bulk/" + fileref.current.files[0].name)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container className="w-50 mx-auto">
      <Card>
        <Form>
          <Row className="justify-content-center">
            <Col lg="8">
              <Form.Label htmlFor="poifile">Enter json file</Form.Label>
              <Form.Control
                type="file"
                id="poifile"
                onChange={() => {}}
                ref={fileref}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg="3">
              <Button
                type="submit"
                onClick={fileSubmitAddHandler}
                className="my-2"
                variant="success"
              >
                Add
              </Button>
            </Col>
            <Col lg="3">
              <Button
                type="submit"
                onClick={fileSubmitUpdateHandler}
                className="my-2 mx-2"
              >
                Update
              </Button>
            </Col>
            <Col lg="3">
              <Button
                type="submit"
                onClick={fileSubmitDeleteHandler}
                className="my-2"
                variant="danger"
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default FileForm;
