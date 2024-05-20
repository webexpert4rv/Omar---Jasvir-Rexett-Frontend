import React, { useState } from "react";
import { Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import { DateRangePicker } from 'react-date-range';
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import companyLogo from "../../assets/img/amazon.png"
const LeavePlan = () => {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
    };
    const today = new Date();

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Nav variant="pills" className="mb-4 application-pills">
                    <Nav.Item className="application-item">
                        <Nav.Link className="application-link" eventKey="first">Apply Leave</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="application-item">
                        <Nav.Link className="application-link" eventKey="second">Leave History</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <div className="card-box mb-4">
                            <h3 className="section-head border-0 mb-2">Applied Leaves</h3>
                            <p className="text-muted font-14 mb-0">No Leave Applied</p>
                            <Row>
                                <Col xxl={3} xl={6} className="mb-xxl-0 mb-3">
                                    <div className="leave-wrapper-box">
                                        <div>
                                            <h4 className="project-heading">Figma to UI</h4>
                                            <h4 className="leave-type-heading">Full Day Leave</h4>
                                            <div>
                                                <p className="leave-date">17-05-2024 to 30-05-2024</p>
                                            </div>
                                            <p className="status-finished mb-0">Approved</p>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <Button className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                <IoClose />
                                            </Button>
                                            <Button className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none">
                                                <MdModeEditOutline />
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col xxl={3} xl={6} className="mb-xxl-0 mb-3">
                                    <div className="leave-wrapper-box">
                                        <div>
                                            <h4 className="project-heading">Figma to UI</h4>
                                            <h4 className="leave-type-heading">Half Day Leave</h4>
                                            <div>
                                                <p className="leave-date">31-05-2024</p>
                                            </div>
                                            <p className="status-progress mb-0">Under Approval</p>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <Button className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                <IoClose />
                                            </Button>
                                            <Button className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none">
                                                <MdModeEditOutline />
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                                <Col xxl={3} xl={6} className="mb-xxl-0 mb-3">
                                    <div className="leave-wrapper-box">
                                        <div>
                                            <h4 className="project-heading">Figma to UI</h4>
                                            <h4 className="leave-type-heading">Half Day Leave</h4>
                                            <div>
                                                <p className="leave-date">31-05-2024</p>
                                            </div>
                                            <p className="status-rejected mb-0">Not Approved</p>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <Button className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                <IoClose />
                                            </Button>
                                            <Button className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none">
                                                <MdModeEditOutline />
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row className="gx-4">
                            <Col lg={7}>
                                <div className="leave-calendar h-100">
                                    <DateRangePicker
                                        ranges={[selectionRange]}
                                        onChange={handleSelect}
                                        minDate={today}
                                    />
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className="plan-leave-wrapper">
                                    <h3 className="section-head border-0 mb-3">Apply Leave</h3>
                                    <Form>
                                        <Form.Label className="mb-2 font-14">Select Project</Form.Label>
                                        <Form.Select className="common-field font-14 mb-4">
                                            <option value="" selected>Select Project</option>
                                            <option value="figma_to_ui">Figma to UI</option>
                                            <option value="ai_bot">AI Bot</option>
                                            <option value="chatbot_design">ChatBot Design</option>
                                        </Form.Select>
                                        <div className="mb-4">
                                            <Form.Label className="mb-2 font-14">Leave Type</Form.Label>
                                            <div className="d-flex gap-3">
                                                <div>
                                                    <input type="radio" name="leave-type" className="leave_type_radio" id="fullDayLeave" checked />
                                                    <label htmlFor="fullDayLeave" className="leave_label">Full Day</label>
                                                </div>
                                                <div>
                                                    <input type="radio" name="leave-type" className="leave_type_radio" id="halfDayLeave" />
                                                    <label htmlFor="halfDayLeave" className="leave_label">Half Day</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <Form.Label className="mb-2 font-14">Reason</Form.Label>
                                            <Form.Control as="textarea" rows="3" className="common-field font-14" placeholder="Enter Reason" />
                                        </div>
                                        <div>
                                            <Button variant="transparent" className="main-btn font-14 px-4 py-2">Submit</Button>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <div className="table-responsive">
                            <table className="table time-table table-bordered table-ui-custom">
                                <thead>
                                    <th className="time-table-head text-start">
                                        Leave Type
                                    </th>
                                    <th className="time-table-head text-start">
                                        Leave Date
                                    </th>
                                    <th className="time-table-head text-start">
                                        Reason
                                    </th>
                                    <th className="time-table-head text-start">
                                        Project
                                    </th>
                                    <th className="time-table-head text-start">
                                        Client Name
                                    </th>
                                    <th className="time-table-head text-start">
                                        Leave Status
                                    </th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <h4 className="leave-type-heading mb-0 white-nowrap">Full Day Leave</h4>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <p className="leave-date white-nowrap">17-05-2024 to 30-05-2024</p>
                                        </td>
                                        <td className="time-table-data text-start reason-data">
                                            <p className="font-14 mb-0">I have some urgent piece of work at my home.</p>
                                        </td>
                                        <td className="time-table-data text-start white-nowrap">AI Bot Project</td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={companyLogo} className="user-img" />
                                                </div>
                                                Amazon
                                            </div>
                                        </td>
                                        <td className="time-table-data text-start"><span className="status-progress">Under Approval</span></td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <h4 className="leave-type-heading mb-0 white-nowrap">Half Day Leave</h4>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <p className="leave-date white-nowrap">17-05-2024</p>
                                        </td>
                                        <td className="time-table-data text-start reason-data">
                                            <p className="font-14 mb-0">I have some urgent piece of work at my home.</p>
                                        </td>
                                        <td className="time-table-data text-start">Figma to UI</td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={companyLogo} className="user-img" />
                                                </div>
                                                Amazon
                                            </div>
                                        </td>
                                        <td className="time-table-data text-start"><span className="white-nowrap status-finished">Approved</span></td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <h4 className="leave-type-heading mb-0 white-nowrap">Full Day Leave</h4>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <p className="leave-date white-nowrap">30-05-2024</p>
                                        </td>
                                        <td className="time-table-data text-start reason-data">
                                            <p className="font-14 mb-0">I have some urgent piece of work at my home.</p>
                                        </td>
                                        <td className="time-table-data text-start white-nowrap">AI Bot Project</td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={companyLogo} className="user-img" />
                                                </div>
                                                Amazon
                                            </div>
                                        </td>
                                        <td className="time-table-data text-start"><span className="white-nowrap status-rejected">Not Approved</span></td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <h4 className="leave-type-heading mb-0 white-nowrap">Full Day Leave</h4>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <p className="leave-date white-nowrap">17-05-2024 to 30-05-2024</p>
                                        </td>
                                        <td className="time-table-data text-start reason-data">
                                            <p className="font-14 mb-0">I have some urgent piece of work at my home.</p>
                                        </td>
                                        <td className="time-table-data text-start white-nowrap">AI Bot Project</td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={companyLogo} className="user-img" />
                                                </div>
                                                Amazon
                                            </div>
                                        </td>
                                        <td className="time-table-data text-start"><span className="white-nowrap status-progress">Under Approval</span></td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <h4 className="leave-type-heading white-nowrap mb-0">Half Day Leave</h4>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <p className="leave-date white-nowrap">17-05-2024</p>
                                        </td>
                                        <td className="time-table-data text-start reason-data">
                                            <p className="font-14 mb-0">I have some urgent piece of work at my home.</p>
                                        </td>
                                        <td className="time-table-data text-start">Figma to UI</td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={companyLogo} className="user-img" />
                                                </div>
                                                Amazon
                                            </div>
                                        </td>
                                        <td className="time-table-data text-start"><span className="white-nowrap status-finished">Approved</span></td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <h4 className="leave-type-heading mb-0 white-nowrap">Full Day Leave</h4>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <p className="leave-date white-nowrap">30-05-2024</p>
                                        </td>
                                        <td className="time-table-data text-start reason-data">
                                            <p className="font-14 mb-0">I have some urgent piece of work at my home.</p>
                                        </td>
                                        <td className="time-table-data text-start white-nowrap">AI Bot Project</td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={companyLogo} className="user-img" />
                                                </div>
                                                Amazon
                                            </div>
                                        </td>
                                        <td className="time-table-data text-start"><span className="white-nowrap status-rejected">Not Approved</span></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <div className="helper-text-section">
                <h3>Guiding You Through: Helpful Text to Apply Leaves</h3>
                <ol className="ps-3 mb-0">
                    <li className="mb-2">
                        <p>Admin can effortlessly review daily time sheets and promptly raise invoices for clients. Click on any client's name in the table above to delve deeper into their project and time reporting details. Gain insights and manage project progress with precision. Also you can raise invoice for clients and track the invoices for Devs , Vendors and Clients.</p>
                    </li>
                    <li className="mb-2">
                        <p>Admin can effortlessly review daily time sheets and promptly raise invoices for clients. Click on any client's name in the table above to delve deeper into their project and time reporting details. Gain insights and manage project progress with precision. Also you can raise invoice for clients and track the invoices for Devs , Vendors and Clients.</p>
                    </li>
                    <li className="mb-0">
                        <p>Admin can effortlessly review daily time sheets and promptly raise invoices for clients. Click on any client's name in the table above to delve deeper into their project and time reporting details. Gain insights and manage project progress with precision. Also you can raise invoice for clients and track the invoices for Devs , Vendors and Clients.</p>
                    </li>
                </ol>
            </div>
        </>
    )
}
export default LeavePlan;