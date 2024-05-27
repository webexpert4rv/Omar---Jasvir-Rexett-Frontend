import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import RexettSpinner from "../../../components/atomic/RexettSpinner";
import { useStateManager } from "react-select";
const RejectModal = ({
  show,
  handleClose,
  onClick,
  smallLoader,
  header,
  feedbacks,
  submit,
}) => {
  const [feedback, setFeedback] = useState("");
  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-modal"
      animation
    >
      <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

      <Modal.Body>
        <h3 className="popup-heading">{header} </h3>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label>{feedbacks}</Form.Label>
            <Form.Control
              as="textarea"
              rows="6"
              placeholder={
                feedbacks === "Reasons"
                  ? "Enter your reason, why you want to reject the leave ?"
                  : "Enter your feedback, why you want to reject?"
              }
              onChange={handleFeedback}
              required
            ></Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button
              variant="transparent"
              className="main-btn px-4"
              onClick={(e) => {
                let data;
                if (feedbacks === "Reasons") {
                  data = feedback
                } else {
                  data = {
                    status: "ended",
                    end_reason: feedback,
                  };
                }
                onClick(e, data);
              }}
              disabled={feedback?.length === 0}
            >
              {smallLoader ? <RexettSpinner /> : submit}{" "}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default RejectModal;
