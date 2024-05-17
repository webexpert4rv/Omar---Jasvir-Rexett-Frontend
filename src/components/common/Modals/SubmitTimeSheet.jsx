import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const SubmitTimeReport = ({ show, handleClose }) => {
    const { t } = useTranslation()
    const [selectedOption, setSelectedOption] = useState(null);
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Submit Time Report</h3>
                <Form>
                    <div className="info-box mb-4">
                        <Row>
                            <Col md={6}>
                                <h4 className="">Date</h4>
                                <p>02-March-2024</p>
                            </Col>
                            <Col md={6}>
                                <h4 className="">Total Hours</h4>
                                <p>9 hrs</p>
                            </Col>
                            <Col md={6}>
                                <h4 className="">Start Time</h4>
                                <p className="mb-0">09:00 AM</p>
                            </Col>
                            <Col md={6}>
                                <h4 className="">End Time</h4>
                                <p className="mb-0">07:00 PM</p>
                            </Col>
                        </Row>
                    </div>
                    <Form.Control as="textarea" placeholder="Enter Memo" className="common-field font-14 mb-4" />
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default SubmitTimeReport;