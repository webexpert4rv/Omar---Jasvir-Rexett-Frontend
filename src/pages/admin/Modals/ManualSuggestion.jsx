import React from "react";
import { Button, Form, Modal, Nav, Tab } from "react-bootstrap";
import devImg from '../../../assets/img/user-img.jpg';
import { FaStar } from "react-icons/fa6";
const ManualSuggestions = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Manual Suggestion</h3>
                    <div>
                        <Form.Control type="text" className="common-field font-14 mb-2" placeholder="Search here..." />
                    </div>
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="registered_dev"
                    >
                        <Nav variant="pills" className="application-pills my-2">
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="registered_dev" className="application-link">
                                    Registered Developers
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="unregistered_dev" className="application-link">
                                    Unregistered Developers
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="registered_dev" className="">
                                <div>
                                    <div className="table-responsive suggestion-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </th>
                                                    <th className="font-14 align-middle">
                                                        Developer Name
                                                    </th>
                                                    <th className="font-14 align-middle">
                                                        Rating
                                                    </th>
                                                    <th className="font-14 align-middle">
                                                        Email Address
                                                    </th>
                                                    <th className="font-14 align-middle">
                                                        Designation
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="unregistered_dev" className="">
                                <div>
                                    <div className="table-responsive suggestion-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </th>
                                                    <th className="font-14 align-middle">
                                                        Developer Name
                                                    </th>
                                                    {/* <th className="font-14 align-middle">
                                                        Rating
                                                    </th> */}
                                                    <th className="font-14 align-middle">
                                                        Email Address
                                                    </th>
                                                    <th className="font-14 align-middle">
                                                        Designation
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    {/* <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td> */}
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    {/* <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td> */}
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    {/* <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td> */}
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    {/* <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td> */}
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    {/* <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td> */}
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    {/* <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td> */}
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <Form.Check type="checkbox" className="primary_checkbox" />
                                                    </td>
                                                    <td className="font-14 align-middle">

                                                        <div className="d-flex align-items-center">
                                                            <div className="user-imgbx application-userbx">
                                                                <img src={devImg} className="user-img"
                                                                />
                                                            </div>
                                                            John Doe
                                                        </div>
                                                    </td>
                                                    {/* <td className="font-14 align-middle">
                                                        <span className="status-upcoming d-inline-flex align-items-center gap-1">
                                                            <FaStar /> 4.4
                                                        </span>
                                                    </td> */}
                                                    <td className="font-14 align-middle">
                                                        johndoe1234@gmail.com
                                                    </td>
                                                    <td className="font-14 align-middle">
                                                        Software Developer
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn font-14">Submit</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ManualSuggestions;