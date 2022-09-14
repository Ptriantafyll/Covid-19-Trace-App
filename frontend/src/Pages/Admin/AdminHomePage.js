import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FileForm from "../../Components/Forms/FileForm";
import DeleteDBModal from "../../Components/UI/DeleteDBModal";
import VisitModalContext from "../../Store/VisitModalContext";

function AdminHomePage() {
  const BaseURL = "http://localhost:8000/"; // api url
  console.log(BaseURL);
  const modal_context = useContext(VisitModalContext);

  function deleteDBHandler() {
    modal_context.openModal();
  }
  return (
    <div>
      <h4 className="text-center my-3">
        Choose a file to either add, upload, or delete points of interest from
        the database
      </h4>
      <FileForm />
      <Container className="w-50 my-2">
        <Row className="justify-content-center">
          <Col sm="4">
            <Button variant="danger" onClick={deleteDBHandler}>
              Delete Database
            </Button>
          </Col>
        </Row>
      </Container>
      <DeleteDBModal />
    </div>
  );
}

export default AdminHomePage;
