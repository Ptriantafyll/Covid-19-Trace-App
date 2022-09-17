import { useContext, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import FileForm from "../../Components/Forms/FileForm";
import DeleteDBModal from "../../Components/UI/DeleteDBModal";
import VisitModalContext from "../../Store/VisitModalContext";

function AddUpdateDeletePOIsPage() {
  const modal_context = useContext(VisitModalContext);
  const [addAlertShow, setAddAlertShow] = useState(false);
  const [addAlertMessage, setAddAllertMessage] = useState("");
  const [updateAlertShow, setUpdateAlertShow] = useState(false);
  const [updateAlertMessage, setUpdateAlertMessage] = useState("");
  const [deleteAlertShow, setDeleteAlertShow] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState("");

  function deleteDBHandler() {
    modal_context.openModal();
  }

  function poisAddHandler(message) {
    console.log(message);
    setAddAlertShow(true);
    setDeleteAlertShow(false);
    setUpdateAlertShow(false);
    setAddAllertMessage(message);
  }

  function poisDeleteHandler(message) {
    setAddAlertShow(false);
    setDeleteAlertShow(true);
    setUpdateAlertShow(false);
    setDeleteAlertMessage(message);
  }

  function poisUpdateHandler(message) {
    setAddAlertShow(false);
    setDeleteAlertShow(false);
    setUpdateAlertShow(true);
    setUpdateAlertMessage(message);
  }

  return (
    <div>
      <h4 className="text-center my-3">
        Choose a file to either upload, or delete points of interest from the
        databases
      </h4>
      {addAlertShow && (
        <Container className="w-75">
          <Alert
            show={addAlertShow}
            variant="success"
            onClose={() => setAddAlertShow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              {addAlertMessage}
            </Alert.Heading>
          </Alert>
        </Container>
      )}
      {updateAlertShow && (
        <Container className="w-75">
          <Alert
            show={updateAlertShow}
            variant="warning"
            onClose={() => setUpdateAlertShow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              {updateAlertMessage}
            </Alert.Heading>
          </Alert>
        </Container>
      )}
      {deleteAlertShow && (
        <Container className="w-75">
          <Alert
            show={deleteAlertShow}
            variant="danger"
            onClose={() => setDeleteAlertShow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              {deleteAlertMessage}
            </Alert.Heading>
          </Alert>
        </Container>
      )}
      <FileForm
        onPOIsAdd={poisAddHandler}
        onPOIsDelete={poisDeleteHandler}
        onPOIsUpdate={poisUpdateHandler}
      />
      <Container className="w-50 my-2">
        <Row className="justify-content-center">
          <Col sm="4">
            <Button variant="danger" onClick={deleteDBHandler}>
              Delete All POIs
            </Button>
          </Col>
        </Row>
      </Container>
      <DeleteDBModal />
    </div>
  );
}

export default AddUpdateDeletePOIsPage;
