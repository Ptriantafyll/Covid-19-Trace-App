import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

function POIForm(props) {
  const myref = useRef();

  const [value, setValue] = useState(50);

  function newPOISubmitHandler(event) {
    event.preventDefault();

    console.log("clicked");
    console.log(myref.current.value);
  }

  return (
    <Container className="w-50 mx-auto">
      <Card>
        <Form onSubmit={newPOISubmitHandler}>
          <Row className="justify-content-center">
            <Col lg="8">
              <Form.Label htmlFor="newpoiname">Enter name of POI</Form.Label>
              <Form.Control
                type="text"
                placeholder="POI name"
                id="newpoiname"
              />
            </Col>
          </Row>
          {/* <Row className="justify-content-center">
            <Col lg="8">
              <Form.Label htmlFor="poifile">Enter json file</Form.Label>
              <Form.Control type="file" id="poifile" />
            </Col>
          </Row> */}
          <Row className="justify-content-center">
            <Col lg="8">
              <Form.Label htmlFor="newpoiaddress">Enter address</Form.Label>
              <Form.Control
                type="text"
                placeholder="address"
                id="newpoiaddress"
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg="8">
              <Form.Label htmlFor="newpoitypes">Enter types</Form.Label>
              <Form.Control type="text" placeholder="types" id="newpoitypes" />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg="4">
              <Form.Label htmlFor="newpoilatitude">Enter latitude</Form.Label>
              <Form.Control
                type="number"
                placeholder="latitude"
                id="newpoilatitude"
              />
            </Col>
            <Col lg="4">
              <Form.Label htmlFor="newpoilongitude">Enter longitude</Form.Label>
              <Form.Control
                type="number"
                placeholder="longitude"
                id="newpoilongitude"
              />
            </Col>
          </Row>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Form.Label htmlFor="newpoirating">Enter rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="rating"
                id="newpoirating"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Form.Label htmlFor="newpoirating_n">Enter rating_n</Form.Label>
              <Form.Control
                type="number"
                placeholder="rating_n"
                id="newpoirating_n"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Form.Label htmlFor="newpoipopulartimes">
                Enter populartimes
              </Form.Label>
              <RangeSlider
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id="newpoipopulartimes"
                ref={myref}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <Form.Label htmlFor="newpoitimespent-min">
                Enter min time spent
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="min time spent"
                id="newpoitimespent-min"
              />
            </div>
            <div className="col-lg-4">
              <Form.Label htmlFor="newpoitimespent-max">
                Enter max time spent
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="max time spent"
                id="newpoitimespent-ax"
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <Col lg="3">
              <Button type="submit" className="my-2 mx-2">
                Update
              </Button>
            </Col>

            <Col lg="3">
              <Button type="submit" className="my-2" variant="success">
                Add
              </Button>
            </Col>
            <Col lg="3">
              <Button type="submit" className="my-2" variant="danger">
                Delete
              </Button>
            </Col>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default POIForm;
