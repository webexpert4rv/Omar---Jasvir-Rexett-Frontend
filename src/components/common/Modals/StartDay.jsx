import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const StartDayModal = ({ show, handleClose }) => {
    const { t } = useTranslation()
    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
                <Modal.Header className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Are you sure want to start your day?</h3>
                    <div className="text-center">
                        <Button variant="transparent" onClick={handleClose} className="main-btn outline-main-btn px-4 me-2 font-14 fw-semibold">No</Button>
                        <Button variant="transparent" onClick={handleClose} className="main-btn px-4 font-14 fw-semibold">Yes</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default StartDayModal;