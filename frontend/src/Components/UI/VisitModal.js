import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import ModalContext from "../../Store/VisitModalContext";
import UserContext from "../../Store/CurrentUserContext";

function VisitModal(props) {
  const modal_context = useContext(ModalContext);
  const user_context = useContext(UserContext);
  const peopleref = useRef();

  // console.log(modal_context);

  // console.log(user_context.covid_tests);

  return (
    <div>
      <Modal show={modal_context.open} onHide={modal_context.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Visit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center">
          <p>Please enter your estimate of the people currently there.</p>
          <input type="number" ref={peopleref} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modal_context.closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              modal_context.enterVisit(
                peopleref.current.value,
                user_context.username,
                user_context.covid_tests
              );
            }}
          >
            Add Visit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VisitModal;
