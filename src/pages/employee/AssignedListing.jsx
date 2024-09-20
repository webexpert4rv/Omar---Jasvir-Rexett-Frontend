import React from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import { FaComment, FaMessage } from "react-icons/fa6";
import chatImg from '../../assets/img/demo-img.jpg'
const AssignedListing = () => {
    return (
        <>
            <div className="card-box">
                <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                    <h2 className="section-head-sub mb-0 border-0">
                        Chat Assigned
                    </h2>
                </div>
                <div>
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="client_assigned"
                    >
                        <div className="d-flex">
                            <Nav variant="pills" className="application-pills">
                                <Nav.Item className="application-item">
                                    <Nav.Link eventKey="client_assigned" className="application-link">
                                        Client
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="application-item">
                                    <Nav.Link eventKey="vendor_assigned" className="application-link">
                                        Vendor
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="application-item">
                                    <Nav.Link eventKey="developer_assigned" className="application-link">
                                        Developer
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="client_assigned" className="py-4">
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone number</th>
                                                    <th>Email address</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <img src={chatImg} className="assignchat-img" />
                                                            Steve Warner
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">stevewarner@gmail.com</td>
                                                    <td className="font-14 align-middle">+91 1234567890</td>
                                                    <td className="align-middle">
                                                        <div className="d-flex gap-3">
                                                            <Button variant="transparent" className="arrow-btn info-arrow"><FaComment /></Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="vendor_assigned" className="py-4">
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone number</th>
                                                    <th>Email address</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <img src={chatImg} className="assignchat-img" />
                                                            Steve Warner
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">stevewarner@gmail.com</td>
                                                    <td className="font-14 align-middle">+91 1234567890</td>
                                                    <td className="align-middle">
                                                        <div className="d-flex gap-3">
                                                            <Button variant="transparent" className="arrow-btn info-arrow"><FaComment /></Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="developer_assigned" className="py-4">
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone number</th>
                                                    <th>Email address</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="font-14 align-middle">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <img src={chatImg} className="assignchat-img" />
                                                            Steve Warner
                                                        </div>
                                                    </td>
                                                    <td className="font-14 align-middle">stevewarner@gmail.com</td>
                                                    <td className="font-14 align-middle">+91 1234567890</td>
                                                    <td className="align-middle">
                                                        <div className="d-flex gap-3">
                                                            <Button variant="transparent" className="arrow-btn info-arrow"><FaComment /></Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}
export default AssignedListing;