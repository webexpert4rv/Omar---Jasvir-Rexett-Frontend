import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import RexettButton from "../../atomic/RexettButton";
import { useForm } from "react-hook-form";
const StartDayModal = ({ show, handleClose, checked ,handleSubmit}) => {
  const { t } = useTranslation();




 
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        animation
        className="custom-modal"
      >
        <Modal.Header className="border-0 pb-3"></Modal.Header>
        <Modal.Body>
          {!checked ? (
            <>
              <h3 className="popup-heading"> Are you want to CheckIn?</h3>
              <div className="text-center">
                <Button
                  variant="transparent"
                  onClick={() => handleClose("no")}
                  className="main-btn outline-main-btn px-4 me-2 font-14 fw-semibold"
                >
                  No
                </Button>
                <Button
                  variant="transparent"
                  onClick={() => handleClose("yes")}
                  className="main-btn px-4 font-14 fw-semibold"
                >
                  Yes
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="popup-heading"> Do you want to have</h3>
              <Form>
              <Row>
                <Col>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value= "shortBreak"
                    />
                    Short Break
                  </div>
                </Col>
                <Col>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="checkout"
                    />
                    Checkout
                  </div>
                </Col>
              </Row>
              <div className="text-center mt-4">
                <RexettButton
                  type="submit"
                  text="Submit"
                  className="main-btn px-4 me-3 font-14 fw-semibold "
                  variant="transparent"
                  onClick={(e)=>handleSubmit(e.target.value)}
                  // disabled={smallLoader}
                  // isLoading={smallLoader}
                />
              </div>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default StartDayModal;
