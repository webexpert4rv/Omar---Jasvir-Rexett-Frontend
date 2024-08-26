import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import profileImg from '../../../assets/img/demo-img.jpg';
import { IoCameraOutline } from "react-icons/io5";
const BasicDetail = () => {
    return (
        <>
            <Row>
                <Col md={7}>
                    <div className="apply-form-card">
                        <div>
                            <div>
                                <h2 className="apply-form-heading">Enter <span className="fw-bold">Details</span></h2>
                                <p className="font-14 text-white">Explore thrilling remote opportunities with Europe's top companies, become part of a dynamic community, and enjoy exclusive perks</p>
                                <div className="mb-3">
                                    <div className="profile-upload-preview position-relative">
                                        <div className="profile-img-preview w-100 h-100">
                                            <img src={profileImg} />
                                        </div>
                                        <Form.Control type="file" className="d-none" id="profile-img-upload" />
                                        <Form.Label htmlFor="profile-img-upload" className="profile-img-label">
                                            <IoCameraOutline />
                                        </Form.Label>
                                    </div>
                                </div>
                                <Row>
                                    <Col lg={6} className="mb-3">
                                        <div>
                                            <Form.Label className="font-14 text-white">First Name</Form.Label>
                                            <Form.Control type="text" className="common-field apply-field font-14" placeholder="Enter your first name" />
                                        </div>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <div>
                                            <Form.Label className="font-14 text-white">Last Name</Form.Label>
                                            <Form.Control type="text" className="common-field apply-field font-14" placeholder="Enter your last name" />
                                        </div>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <div>
                                            <Form.Label className="font-14 text-white">Email Address</Form.Label>
                                            <Form.Control type="text" className="common-field apply-field font-14" placeholder="Enter email address" />
                                        </div>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <div>
                                            <Form.Label className="font-14 text-white">Phone Number</Form.Label>
                                            <Form.Control type="text" className="common-field apply-field font-14" placeholder="Enter phone number" />
                                        </div>
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                        <div>
                                            <Form.Label className="font-14 text-white">Address</Form.Label>
                                            <Form.Control type="text" className="common-field apply-field font-14" placeholder="Enter your designation" />
                                        </div>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <div className="mb-2">
                                            <Form.Label className="font-14 text-white">Country</Form.Label>
                                            <Form.Select className="common-field apply-field font-14">
                                                <option>Select Country</option>
                                                <option>Sweden</option>
                                                <option>India</option>
                                                <option>USA</option>
                                            </Form.Select>
                                        </div>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <div className="mb-2">
                                            <Form.Label className="font-14 text-white">State</Form.Label>
                                            <Form.Select className="common-field apply-field font-14">
                                                <option>Select State</option>
                                                <option>Bohuslän</option>
                                                <option>Dalsland</option>
                                                <option>Västergötland</option>
                                                <option>Östergötland</option>
                                                <option>Småland</option>
                                                <option>Öland</option>
                                            </Form.Select>
                                        </div>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <div className="mb-2">
                                            <Form.Label className="font-14 text-white">City</Form.Label>
                                            <Form.Select className="common-field apply-field font-14">
                                                <option>Select City</option>
                                                <option>Stockholm</option>
                                                <option>Gothenburg</option>
                                                <option>Malmö</option>
                                                <option>Linköping</option>
                                                <option>Kiruna</option>
                                                <option>Ystad</option>
                                            </Form.Select>
                                        </div>
                                    </Col>
                                    <Col lg={6} className="mb-3">
                                        <div className="mb-2">
                                            <Form.Label className="font-14 text-white">Zipcode</Form.Label>
                                            <Form.Control type="text" className="common-field apply-field font-14" placeholder="Enter zipcode" />
                                        </div>
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                        <div className="mb-2">
                                            <Form.Label className="font-14 text-white">Timezone</Form.Label>
                                            <Form.Select className="common-field apply-field font-14">
                                                <option>Select Timezone</option>
                                                <option>GMT(+5:30) Kolkata</option>
                                                <option>GMT(+5:30) Chennai</option>
                                                <option>GMT(+5:30) New Delhi</option>
                                            </Form.Select>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link to={'/screening-details'} variant="transparent" className="submit-form-btn text-decoration-none text-black">Continue</Link>
                        </div>
                    </div>
                </Col>
                <Col md={5}>
                    <div className="h-100">
                        <Form.Label htmlFor="resume-upload" className="resume-upload-wrapper">
                            <p className="fw-semibold">Attach a resume to this candidate</p>
                            <input type="file" className="d-none" id="resume-upload" />
                            <div className="upload-resume-field border-0 text-green">
                                <span><IoCloudUploadOutline /></span> Upload your resume
                            </div>
                        </Form.Label>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default BasicDetail