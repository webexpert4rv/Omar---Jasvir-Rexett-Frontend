import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import RexettButton from "../../atomic/RexettButton";
const SetUpJobModal = ({ show, handleClose, handleProceed, smallLoader }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

        <Modal.Body>
          <h3 className="popup-heading">Setting Up Your First Job</h3>
          <p className="text-center font-14">
            We are really excited that you want to set up a new job with us. Our
            team is dedicated to providing you with the best possible experience
            as you embark on this new journey. We are committed to supporting
            you every step of the way and ensuring that your transition is
            smooth and successful. Welcome aboard, and we look forward to
            achieving great things together!
          </p>
          <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
            <Button
              variant="transparent"
              onClick={handleClose}
              className="outline-main-btn font-14 text-decoration-none rounded-3"
            >
              Cancel
            </Button>
            <RexettButton
              type="button"
              text={"Proceed"}
              onClick={handleProceed}
              className="main-btn px-5 mr-2"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SetUpJobModal;