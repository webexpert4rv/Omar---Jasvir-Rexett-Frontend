import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitTimeReport from "./SubmitTimeSheet";
const EndDayModal = ({ show, handleClose }) => {
    const { t } = useTranslation()
    const [selectedOption, setSelectedOption] = useState(null);
    const [showTimeReport, setShowTimeReport] = useState(false);
    const handleTimeReport = () => {
        setShowTimeReport(true);
    }
    const handleCloseTimeReport = () => {
        setShowTimeReport(false);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
                <Modal.Header className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Are you want to checkout?</h3>
                    <div className="text-center">
                        <Button variant="transparent" onClick={handleClose} className="main-btn outline-main-btn px-4 me-2 font-14 fw-semibold">No</Button>
                        <Button variant="transparent" onClick={() => {
                            handleTimeReport();
                            handleClose();
                        }} className="main-btn px-4 font-14 fw-semibold">Yes</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <SubmitTimeReport show={showTimeReport} handleClose={handleCloseTimeReport} />
        </>
    )
}
export default EndDayModal;