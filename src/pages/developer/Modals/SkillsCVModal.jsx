import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from 'react-select';
const options = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'js', label: 'JavaScript' },
    { value: 'jquery', label: 'jQuery' },
    { value: 'reactjs', label: 'ReactJS' },
    { value: 'vuejs', label: 'VueJS' },
    { value: 'angularjs', label: 'AngularJS' },
    { value: 'bootstrap', label: 'Bootstrap' },
  ];
const SkillsModal = ({ show, handleClose }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Skills</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    <Form.Label>Skills</Form.Label>
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        isMulti
                                    />
                                </Form.Group>
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
export default SkillsModal;