import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";

function FileForm(props) {
  const fileref = useRef();
  const BaseURL = "http://localhost:8000/"; // api url

  function fileSubmitAddHandler(event) {
    event.preventDefault();

    axios
      .post(BaseURL + "POI/bulk", {
        filename: fileref.current.files[0].name,
      })
      .then((response) => {
        props.onPOIsAdd(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fileSubmitUpdateHandler(event) {
    event.preventDefault();

    axios
      .patch(BaseURL + "POI/bulk/" + fileref.current.files[0].name)
      .then((response) => {
        props.onPOIsUpdate(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fileSubmitDeleteHandler(event) {
    event.preventDefault();

    axios
      .delete(BaseURL + "POI/bulk/" + fileref.current.files[0].name)
      .then((response) => {
        props.onPOIsDelete(response.data.message);
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
            <Col xs="8">
              <Form.Label htmlFor="poifile">
                Enter json file
                {<i className="bi bi-filetype-json" />}
              </Form.Label>
              <Form.Control
                type="file"
                id="poifile"
                onChange={() => {}}
                ref={fileref}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="3">
              <Button
                type="submit"
                onClick={fileSubmitAddHandler}
                className="my-2"
                variant="success"
              >
                Add
              </Button>
            </Col>
            <Col xs="3">
              <Button
                type="submit"
                onClick={fileSubmitUpdateHandler}
                className="my-2"
                variant="warning"
              >
                Update
              </Button>
            </Col>
            <Col xs="3">
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
