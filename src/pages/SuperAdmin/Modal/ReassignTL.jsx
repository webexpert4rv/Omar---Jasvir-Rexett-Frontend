import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Tab, Nav } from "react-bootstrap";
import devImg from '../../../assets/img/demo-img.jpg';
const ReassignTL = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Assign Team Leader</h3>
                <Form>
                    <Form.Control type="text" className="common-field font-14" placeholder="Search team leader" />
                    <p className="font-12 text-muted">Who would you like to assign to this agent? You can only assign team leader.</p>
                    <div className="table-responsive">
                        <table className="table table-ui-custom">
                            <thead>
                                <tr>
                                    <th className="align-middle lh-1">
                                    </th>
                                    <th className="font-14 align-middle">Name</th>
                                    <th className="font-14 align-middle">Email address</th>
                                    <th className="font-14 align-middle">Phone number</th>
                                    <th className="font-14 align-middle">Agent assigned</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="align-middle">
                                        <Form.Check type="radio" name="employee_assign" className="primary-checkbox" />
                                    </td>
                                    <td className="align-middle font-14">
                                        <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                            <img src={devImg} className="avatar-company" />
                                            Rohit Sharma
                                        </div>
                                    </td>
                                    <td className="align-middle font-14">rohit@gmail.com</td>
                                    <td className="align-middle font-14">(555) 123-4567</td>
                                    <td className="align-middle font-14 text-center">12</td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <Form.Check type="radio" name="employee_assign" className="primary-checkbox" />
                                    </td>
                                    <td className="align-middle font-14">
                                        <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                            <img src={devImg} className="avatar-company" />
                                            Rohit Sharma
                                        </div>
                                    </td>
                                    <td className="align-middle font-14">rohit@gmail.com</td>
                                    <td className="align-middle font-14">(555) 123-4567</td>
                                    <td className="align-middle font-14 text-center">12</td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <Form.Check type="radio" name="employee_assign" className="primary-checkbox" />
                                    </td>
                                    <td className="align-middle font-14">
                                        <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                            <img src={devImg} className="avatar-company" />
                                            Rohit Sharma
                                        </div>
                                    </td>
                                    <td className="align-middle font-14">rohit@gmail.com</td>
                                    <td className="align-middle font-14">(555) 123-4567</td>
                                    <td className="align-middle font-14 text-center">12</td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <Form.Check type="radio" name="employee_assign" className="primary-checkbox" />
                                    </td>
                                    <td className="align-middle font-14">
                                        <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                            <img src={devImg} className="avatar-company" />
                                            Rohit Sharma
                                        </div>
                                    </td>
                                    <td className="align-middle font-14">rohit@gmail.com</td>
                                    <td className="align-middle font-14">(555) 123-4567</td>
                                    <td className="align-middle font-14 text-center">12</td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <Form.Check type="radio" name="employee_assign" className="primary-checkbox" />
                                    </td>
                                    <td className="align-middle font-14">
                                        <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                            <img src={devImg} className="avatar-company" />
                                            Rohit Sharma
                                        </div>
                                    </td>
                                    <td className="align-middle font-14">rohit@gmail.com</td>
                                    <td className="align-middle font-14">(555) 123-4567</td>
                                    <td className="align-middle font-14 text-center">12</td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        <Form.Check type="radio" name="employee_assign" className="primary-checkbox" />
                                    </td>
                                    <td className="align-middle font-14">
                                        <div className="d-flex align-items-center gap-2 font-14 white-nowrap">
                                            <img src={devImg} className="avatar-company" />
                                            Rohit Sharma
                                        </div>
                                    </td>
                                    <td className="align-middle font-14">rohit@gmail.com</td>
                                    <td className="align-middle font-14">(555) 123-4567</td>
                                    <td className="align-middle font-14 text-center">12</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">Assign Team Leader</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default ReassignTL;