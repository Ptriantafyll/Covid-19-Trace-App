import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import ModalContext from "../../Store/VisitModalContext";
import axios from "axios";

function DeleteDBModal(props) {
  const modal_context = useContext(ModalContext);
  const BaseURL = "http://localhost:8000/"; // api url
  function deleteDBHandler() {
    axios
      .delete(BaseURL + "POI")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .delete(BaseURL + "visit")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .delete(BaseURL + "user")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Modal show={modal_context.open} onHide={modal_context.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Delete enitre Database
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center">
          <h6>Are you sure?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              deleteDBHandler();
              modal_context.closeModal();
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={modal_context.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteDBModal;
