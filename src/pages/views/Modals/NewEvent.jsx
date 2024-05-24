import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
const NewEvent = ({show, handleClose}) => {

    return(
        <Modal show={show} onHide={(e)=>handleClose(e)} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Create New Event</h3>
                <Form>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="d-block font-14">Event Name</Form.Label>
                                <Form.Control type="text" className="common-field font-14" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label className="d-block font-14">Start date</Form.Label>
                                <Form.Control type="date" className="common-field font-14" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label className="d-block font-14">End date</Form.Label>
                                <Form.Control type="date" className="common-field font-14" />
                            </Form.Group>
                        </Col>
                        <div className="text-center mt-4">
                            <RexettButton
                                type="submit"
                                text="Submit"
                                className="main-btn px-4 me-3 font-14 fw-semibold"
                                variant="transparent"
                            />
                            <Button variant="transparent" onClick={handleClose} className="outline-main-btn font-14 fw-semibold bg-transparent border-black text-black px-4" >Cancel</Button>
                        </div>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default NewEvent;