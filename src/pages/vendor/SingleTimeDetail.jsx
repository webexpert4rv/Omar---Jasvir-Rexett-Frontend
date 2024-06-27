import React from "react";
import companyLogo from "../../assets/img/amazon.png";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { FiCalendar } from "react-icons/fi";
const VendorTimeDetail = () => {
    return (
        <>
            <div className="detail-view">
                <Tab.Container id="left-tabs-example" defaultActiveKey="timesheet_project">
                    <div className="card-box mb-4 p-3">
                        <div className="detail-view">
                            <Row className="flex-wrap gy-3">
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Project Name</h3>
                                        <p className="client-name-heading mb-0">
                                            Frontend Developer
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Start Date</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center fw-bold">
                                            <span className="d-flex align-items-center gap-1 text-green">
                                                <FiCalendar />
                                                12 Dec 2023
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Total hired Developer</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center fw-bold">
                                            <span className="d-flex align-items-center gap-1 text-green">
                                                3
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Status</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                                            <span className="status-finished white-nowrap">
                                                Completed
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Total hours spend</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                                            3000hrs
                                        </p>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="client-info p-0 bg-transparent">
                                        <h3 className="font-15 fw-bold mb-2">Total Raised Invoice</h3>
                                        <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                                            4
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <Nav variant="pills" className="application-pills">
                                <Nav.Item className="application-item">
                                    <Nav.Link eventKey="timesheet_project" className="application-link">
                                        Developers
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="application-item">
                                    <Nav.Link eventKey="invoice_project" className="application-link">
                                        Timesheet
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </div>
                </Tab.Container>
            </div>
        </>
    )
}
export default VendorTimeDetail;