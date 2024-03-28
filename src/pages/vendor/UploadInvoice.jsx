import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
const VendorUploadInvoice = () =>{
    return(
        <>
            <section className="upload-invoice-section card-box">
                <h2 className="overview-card-heading mb-4">Upload Invoice</h2>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Select>
                                    <option value="" selected disabled>Select Client</option>
                                    <option value="amazon">Amazon</option>
                                    <option value="bmw">BMW</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="google">Google</option>
                                </Form.Select>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Select>
                                    <option value="" selected disabled>Select Developer</option>
                                    <option value="rohit_sharma">Rohit Sharma</option>
                                    <option value="john_doe">John Doe</option>
                                    <option value="will_smith">Will Smith</option>
                                    <option value="steve_david">Steve David</option>
                                </Form.Select>
                            </Col>
                            <Col md="12">
                                <Form.Group className="mb-4">
                                    {/* <Form.Label>Select Client</Form.Label> */}
                                    {/* <Form.Label>Select Developer</Form.Label> */}
                                    <Form.Control type="file" className="d-none" id="upload-file" />
                                    <Form.Label htmlFor="upload-file" className="upload-file-label">Upload Invoice File</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </section>
        </>
    )
}
export default VendorUploadInvoice;