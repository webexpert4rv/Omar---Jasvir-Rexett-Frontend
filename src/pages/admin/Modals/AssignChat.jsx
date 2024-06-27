import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Tab, Nav } from "react-bootstrap";
import companyImg from '../../../assets/img/amazon.png';
import vendorImg from '../../../assets/img/aviox-logo.png';
import devImg from '../../../assets/img/demo-img.jpg';
const AssignChat = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Assign Chat</h3>
                <Form.Control type="text" className="common-field font-14" placeholder="Search chat" />
                <p className="font-12 text-muted">Who would you like to assign to this conversation? You can only assign chat with this employee.</p>
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="client_chat"
                >
                    <div className="d-flex justify-content-center">
                        <Nav variant="pills" className="application-pills">
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="client_chat" className="application-link">
                                    Clients
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="vendor_chat" className="application-link">
                                    Vendors
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="dev_chat" className="application-link">
                                    Devs
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey="client_chat" className="py-4">
                            <div className="table-responsive assign-table">
                                <table className="table table-ui-custom">
                                    <thead>
                                        <tr>
                                            <th className="align-middle lh-1">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </th>
                                            <th className="font-14 align-middle">Company/Individual Name</th>
                                            <th className="font-14 align-middle">Email address</th>
                                            <th className="font-14 align-middle">Phone number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14">
                                                    <img src={companyImg} className="avatar-company" />
                                                    Amazon
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@amazon.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14">
                                                    <img src={companyImg} className="avatar-company" />
                                                    Amazon
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@amazon.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14">
                                                    <img src={companyImg} className="avatar-company" />
                                                    Amazon
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@amazon.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14">
                                                    <img src={companyImg} className="avatar-company" />
                                                    Amazon
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@amazon.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14">
                                                    <img src={companyImg} className="avatar-company" />
                                                    Amazon
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@amazon.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14">
                                                    <img src={companyImg} className="avatar-company" />
                                                    Amazon
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@amazon.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="vendor_chat" className="py-4">
                            <div className="table-responsive assign-table">
                                <table className="table table-ui-custom">
                                    <thead>
                                        <tr>
                                            <th className="align-middle lh-1">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </th>
                                            <th className="font-14 align-middle">Company Name</th>
                                            <th className="font-14 align-middle">Email address</th>
                                            <th className="font-14 align-middle">Phone number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={vendorImg} className="avatar-company" />
                                                    Aviox Technologies
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@avioxtechnologies.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={vendorImg} className="avatar-company" />
                                                    Aviox Technologies
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@avioxtechnologies.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={vendorImg} className="avatar-company" />
                                                    Aviox Technologies
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@avioxtechnologies.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={vendorImg} className="avatar-company" />
                                                    Aviox Technologies
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@avioxtechnologies.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={vendorImg} className="avatar-company" />
                                                    Aviox Technologies
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@avioxtechnologies.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={vendorImg} className="avatar-company" />
                                                    Aviox Technologies
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">contact@avioxtechnologies.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="dev_chat" className="py-4">
                            <div className="table-responsive assign-table">
                                <table className="table table-ui-custom">
                                    <thead>
                                        <tr>
                                            <th className="align-middle lh-1">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </th>
                                            <th className="font-14 align-middle">Developer Name</th>
                                            <th className="font-14 align-middle">Email address</th>
                                            <th className="font-14 align-middle">Phone number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={devImg} className="avatar-company" />
                                                    Rohit Sharma
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">rohit@gmail.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={devImg} className="avatar-company" />
                                                    Rohit Sharma
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">rohit@gmail.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={devImg} className="avatar-company" />
                                                    Rohit Sharma
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">rohit@gmail.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={devImg} className="avatar-company" />
                                                    Rohit Sharma
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">rohit@gmail.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={devImg} className="avatar-company" />
                                                    Rohit Sharma
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">rohit@gmail.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle">
                                                <Form.Check type="checkbox" className="primary-checkbox" />
                                            </td>
                                            <td className="align-middle font-14">
                                                <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                                    <img src={devImg} className="avatar-company" />
                                                    Rohit Sharma
                                                </div>
                                            </td>
                                            <td className="align-middle font-14">rohit@gmail.com</td>
                                            <td className="align-middle font-14">+12 123 456 789</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
                <div className="text-center">
                    <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">Assign Chat</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default AssignChat;