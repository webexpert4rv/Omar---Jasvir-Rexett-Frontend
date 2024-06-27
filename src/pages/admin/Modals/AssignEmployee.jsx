import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import devImg from '../../../assets/img/demo-img.jpg';
const AssignEmployee = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Assign Employee</h3>
                <Form>
                    <Form.Control type="text" className="common-field font-14" placeholder="Search Employee" />
                    <p className="font-12 text-muted">Who would you like to assign to this conversation? You can only assign employee with access to the candidate.</p>
                    <div className="table-responsive">
                        <table className="table table-ui-custom">
                            <thead>
                                <tr>
                                    <th className="align-middle lh-1">
                                    </th>
                                    <th className="font-14 align-middle">Employee Name</th>
                                    <th className="font-14 align-middle">Email address</th>
                                    <th className="font-14 align-middle">Role</th>
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
                                    <td className="align-middle font-14">Support assistance</td>
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
                                    <td className="align-middle font-14">Interviewer</td>
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
                                    <td className="align-middle font-14">Interviewer</td>
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
                                    <td className="align-middle font-14">Admin</td>
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
                                    <td className="align-middle font-14">Support assistance</td>
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
                                    <td className="align-middle font-14">Support assistance</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">Assign Employee</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default AssignEmployee;