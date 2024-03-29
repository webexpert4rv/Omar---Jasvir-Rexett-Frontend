import React from "react";
import { Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
const EditVendorProfile = () => {
    return (
        <>
            <section>
                <Tabs
                    defaultActiveKey="update_profile"
                    id="justify-tab-example"
                    className="mb-3 notification-tabs profile-tabs"
                    justify
                >
                    <Tab eventKey="update_profile" title="Edit Your Profile">
                        <div>
                            <h2 className="section-head mb-4">Update Your Profile</h2>
                            <Form>
                                <Row className="mb-4">
                                    <Col md="6">
                                        <div className="inner-form">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Vendor Name</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Email</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Previous Password</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control type="password" className="common-field" />
                                                    <button className="eye-btn"><FaEye /></button>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">New Password</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control type="password" className="common-field" />
                                                    <button className="eye-btn"><FaEye /></button>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Address</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Address 2</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">City</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Postcode</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Country</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <Button variant="transparent" className="main-btn px-5">Update Profile</Button>
                                </div>
                            </Form>
                        </div>
                    </Tab>
                    <Tab eventKey="update_company_profile" title="Edit Company Profile">
                        <div>
                            <h2 className="section-head mb-4">Update Company Profile</h2>
                            <Form>
                                <Row className="mb-4">
                                    <Col md="6">
                                        <div className="inner-form">
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Company Name</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Email</Form.Label>
                                                <Form.Control type="email" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Previous Password</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control type="password" className="common-field" />
                                                    <button className="eye-btn"><FaEye /></button>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">New Password</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control type="password" className="common-field" />
                                                    <button className="eye-btn"><FaEye /></button>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Address</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Address 2</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">City</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Postcode</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="common-label">Country</Form.Label>
                                                <Form.Control type="text" className="common-field" />
                                            </Form.Group>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <Button variant="transparent" className="main-btn px-5">Update Profile</Button>
                                </div>
                            </Form>
                        </div>
                    </Tab>
                </Tabs>
            </section>
        </>
    )
}
export default EditVendorProfile;