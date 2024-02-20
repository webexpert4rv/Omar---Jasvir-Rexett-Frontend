import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const AddTimingModal = ({ show, handleClose }) => {
    const [selectDay, setDaySelection] = useState(null);
    const handleDayChange = (selectDayName) => {
        setDaySelection(selectDayName);
    };
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Add Time</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label>Client Name</Form.Label>
                                    <Form.Select className="cv-field">
                                        <option value="amazon">Amazon</option>
                                        <option value="volvo">Volvo</option>
                                        <option value="google">Google</option>
                                        <option value="dell">Dell</option>
                                        <option value="asus">Asus</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" className="cv-field"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="d-block">Select Day</Form.Label>
                                    <Form.Check inline type="radio" value="work-day" name="day-select" id="work-day" label="Work Day" onChange={() => handleDayChange('work-day')} />
                                    <Form.Check inline type="radio" value="off-day" name="day-select" id="off-day" label="Off Day" onChange={() => handleDayChange('off-day')} />
                                </Form.Group>
                                <div className={selectDay === 'work-day' ? '' : 'cv-template-section cv-template1 d-none'}>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group className="mb-4">
                                                <Form.Label>Start Time</Form.Label>
                                                <Form.Control type="time" className="cv-field"></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="6">
                                            <Form.Group className="mb-4">
                                                <Form.Label>End Time</Form.Label>
                                                <Form.Control type="time" className="cv-field"></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default AddTimingModal;