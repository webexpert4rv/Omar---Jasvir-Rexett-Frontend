import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Collapse } from "react-bootstrap";
const AddTimingModal = ({ show, handleClose }) => {
    const [selectDay, setDaySelection] = useState(null);
    const [open, setOpen] = useState(false);
    const handleDayChange = (selectDayName) => {
        setDaySelection(selectDayName);
    };
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Add Time</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="experience-container">
                        <div className="mb-3">
                            <Button variant="transparent" className="main-btn px-3" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                                Update Previous Time Report
                            </Button>
                            <Collapse in={open}>
                                <div className="mt-2">
                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <div>
                                                <Form.Label className="common-label">Select Year</Form.Label>
                                                <Form.Select className="shadow-none">
                                                    <option value="2024">2024</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2017">2017</option>
                                                </Form.Select>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <div>
                                                <Form.Label className="common-label">Select Month</Form.Label>
                                                <Form.Select className="shadow-none">
                                                    <option value="january">January</option>
                                                    <option value="feburary">Feburary</option>
                                                    <option value="march">March</option>
                                                    <option value="april">April</option>
                                                    <option value="may">May</option>
                                                    <option value="june">June</option>
                                                    <option value="july">July</option>
                                                    <option value="august">August</option>
                                                    <option value="september">September</option>
                                                    <option value="october">October</option>
                                                    <option value="november">November</option>
                                                    <option value="december">December</option>
                                                </Form.Select>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <div>
                                                <Form.Label className="common-label">Select Week</Form.Label>
                                                <Form.Select className="shadow-none">
                                                    <option value="week1">Week 1</option>
                                                    <option value="week2">Week 2</option>
                                                    <option value="week3">Week 3</option>
                                                    <option value="week4">Week 4</option>
                                                </Form.Select>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>
                        </div>
                        <Row>
                            <Col md={12} className="border-bottom mb-2 pb-4">
                                <Form.Group>
                                    <Form.Label>Client Name</Form.Label>
                                    <Form.Select className="cv-field">
                                        <option value="amazon">Amazon</option>
                                        <option value="volvo">Volvo</option>
                                        <option value="google">Google</option>
                                        <option value="dell">Dell</option>
                                        <option value="asus">Asus</option>
                                    </Form.Select>
                                </Form.Group>
                                {/* <Form.Group className="mb-4">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" className="cv-field"></Form.Control>
                                </Form.Group> */}
                            </Col>
                            <Col md={3} className="border-bottom mb-2 pb-2">
                                <Form.Label>Mon 01, 2024</Form.Label>
                            </Col>
                            <Col md={9} className="border-bottom mb-2 pb-2">
                                <Form.Group className="">
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
                            <Col md={3} className="border-bottom mb-2 pb-2">
                                <Form.Label>Tue 02, 2024</Form.Label>
                            </Col>
                            <Col md={9} className="border-bottom mb-2 pb-2">
                                <Form.Group className="">
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
                            <Col md={3} className="border-bottom mb-2 pb-2">
                                <Form.Label>Wed 03, 2024</Form.Label>
                            </Col>
                            <Col md={9} className="border-bottom mb-2 pb-2">
                                <Form.Group className="">
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
                            <Col md={3} className="border-bottom mb-2 pb-2">
                                <Form.Label>Thu 04, 2024</Form.Label>
                            </Col>
                            <Col md={9} className="border-bottom mb-2 pb-2">
                                <Form.Group className="">
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
                            <Col md={3} className="border-bottom mb-2 pb-2">
                                <Form.Label>Fri 05, 2024</Form.Label>
                            </Col>
                            <Col md={9} className="border-bottom mb-2 pb-2">
                                <Form.Group className="">
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
                    <div className="text-center mt-2">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default AddTimingModal;