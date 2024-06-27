import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import EditAdminProfile from '../../EditAdminProfile'

function CompanyDetails({currentTab}) {
    return (
        <div>
           {currentTab ==="third" &&
                <div>
                    {/* <Row>
                        <Col md={4}>
                            <Form.Label className="font-14">Company Name</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Control type="text" className="common-field" value="Aviox Technologies Pvt Ltd" readOnly />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">Company Address</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Control type="text" className="common-field" value="Sector 75 Industrial Area" readOnly />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">CIN Number</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Control type="text" className="common-field" value="L01631KA2010PTC096843" readOnly />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">Tax ID</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Control type="text" className="common-field" value="ISF65354VSDTE" readOnly />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">Company Contact Number</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Control type="text" className="common-field" value="+91 1234567890" readOnly />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">Company Email Address</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Control type="email" className="common-field" value="contact@avioxtechnologies.com" readOnly />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">Country</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Select className="common-field font-14" readOnly>
                                    <option>Select Country</option>
                                    <option value="india" selected>India</option>
                                    <option value="sweden">Sweden</option>
                                    <option value="usa">USA</option>
                                    <option value="uk">UK</option>
                                </Form.Select>
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">State</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Select className="common-field font-14" readOnly>
                                    <option>Select State</option>
                                    <option value="punjab" selected>Punjab</option>
                                    <option value="delhi">Delhi</option>
                                    <option value="rajasthan">Rajasthan</option>
                                    <option value="himachal_pardesh">Himachal Pardesh</option>
                                </Form.Select>
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">City</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Select className="common-field font-14" readOnly>
                                    <option>Select City</option>
                                    <option value="punjab" selected>Mohali</option>
                                    <option value="delhi">Amritsar</option>
                                    <option value="rajasthan">Jalandhar</option>
                                    <option value="himachal_pardesh">Ludhiana</option>
                                </Form.Select>
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">Zipcode</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Control type="text" className="common-field" value="160078" readOnly />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Form.Label className="font-14">Select Timezone</Form.Label>
                            <div className="mb-4 custom-wrapper">
                                <Form.Control type="text" className="common-field" value="GMT(+5:30) Calcutta" readOnly />
                            </div>
                        </Col> */}
                    {/* </Row> */}
                    <EditAdminProfile />
                </div>}
        </div>
    )
}

export default CompanyDetails