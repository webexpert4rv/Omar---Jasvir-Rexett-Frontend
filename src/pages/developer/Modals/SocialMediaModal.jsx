import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const SocialMediaModal = ({ show, handleClose }) => {
    const [socialMediaRows, setSocialMediaRows] = useState([
        { id: 1, socialMedia: '', url: '' } // Initial row
    ]);

    const handleAddMore = () => {
        const newRow = { id: socialMediaRows.length + 1, socialMedia: '', url: '' };
        setSocialMediaRows([...socialMediaRows, newRow]);
    };

    const handleDeleteRow = (id) => {
        const updatedRows = socialMediaRows.filter(row => row.id !== id);
        setSocialMediaRows(updatedRows);
    };

    const handleSocialMediaChange = (index, value) => {
        const updatedRows = [...socialMediaRows];
        updatedRows[index].socialMedia = value;
        setSocialMediaRows(updatedRows);
    };

    const handleUrlChange = (index, value) => {
        const updatedRows = [...socialMediaRows];
        updatedRows[index].url = value;
        setSocialMediaRows(updatedRows);
    };

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Social Media</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {socialMediaRows.map((row, index) => (
                        <div className="experience-container" key={row.id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Form.Label>Add Social Media</Form.Label>
                                            {index > 0 && <Button type="button" variant="danger" className="mb-3" onClick={() => handleDeleteRow(row.id)}>Delete</Button>}
                                        </div>
                                        <Form.Select className="mb-2" onChange={(e) => handleSocialMediaChange(index, e.target.value)}>
                                            <option value="facebook">Facebook</option>
                                            <option value="linkedin">Linkedin</option>
                                            <option value="twitter">Twitter</option>
                                            <option value="github">Github</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="gitlab">Gitlab</option>
                                            <option value="pinterest">Pinterest</option>
                                        </Form.Select>
                                        <Form.Control type="text" className="cv-field" placeholder="Enter Url" onChange={(e) => handleUrlChange(index, e.target.value)}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    <div className="text-end mb-3">
                        <Button className="main-btn py-2 px-3" onClick={handleAddMore}>Add More</Button>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SocialMediaModal;
