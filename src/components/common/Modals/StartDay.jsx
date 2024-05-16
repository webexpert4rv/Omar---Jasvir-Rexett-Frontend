import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import RexettButton from "../../atomic/RexettButton";
import { useForm } from "react-hook-form";
import breakIcon from '../../../assets/img/break-time-icon.svg'
import exitIcon from '../../../assets/img/logout-line-icon.svg'
import exitIconGreen from '../../../assets/img/logout-line-icon-green.svg'
import SubmitTimeReport from "./SubmitTimeSheet";
const StartDayModal = ({ show, handleClose, checked, handleSubmit }) => {
    const { t } = useTranslation();
    const [showTimeReport, setShowTimeReport] = useState(false);
    const handleTimeReport = () => {
        setShowTimeReport(true);
       
    }
    const handleCloseTimeReport = () => {
        setShowTimeReport(false);
    }





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
                            <h3 className="popup-heading"> Do you want to</h3>
                            <div className="d-flex justify-content-center align-items-center gap-4">
                                <Button onClick={handleClose} className="main-btn outline-main-btn py-2 px-3 font-14 d-flex align-items-center gap-2">Take a break <img src={breakIcon} className="break-icon" /></Button>
                                <Button onClick={handleTimeReport} className="main-btn checkout-btn py-2 px-3 font-14 d-flex align-items-center gap-2">Checkout <img src={exitIcon} className="checkout-icon" /><img src={exitIconGreen} className="checkout-icon green-checkout" /></Button>
                            </div>
                            <Form>
                                {/* <Row>
                                    <Col>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value="shortBreak"
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
                                </Row> */}
                                {/* <div className="text-center mt-4">
                                    <RexettButton
                                        type="submit"
                                        text="Submit"
                                        className="main-btn px-4 me-3 font-14 fw-semibold "
                                        variant="transparent"
                                        onClick={(e) => handleSubmit(e.target.value)}
                                    />
                                </div> */}
                            </Form>
                        </>
                    )}
                </Modal.Body>
            </Modal>
            <SubmitTimeReport show={showTimeReport} handleCloseTimeReport={handleCloseTimeReport} handleClose = {handleClose} />
        </>
    );
};
export default StartDayModal;
