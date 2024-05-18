import React from "react";
import { Row, Col, Form, Button, Nav, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import associateLogo from "../../assets/img/aviox-logo.png"
import userImage from "../../assets/img/user-img.jpg"
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
const LeaveRequest = () => {
    const approveLeave = (
        <Tooltip id="tooltip">
            Approve
        </Tooltip>
    );
    const rejectLeave = (
        <Tooltip id="tooltip">
            Reject
        </Tooltip>
    );
    const companyname = (

        <Tooltip id="tooltip">
            Aviox Technologies Pvt Ltd
        </Tooltip>
    );
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Nav variant="pills" className="mb-4 application-pills">
                    <Nav.Item className="application-item">
                        <Nav.Link className="application-link" eventKey="first">Applied Leave Request</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="application-item">
                        <Nav.Link className="application-link" eventKey="second">Leave Cancel Request</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="application-item">
                        <Nav.Link className="application-link" eventKey="third">Leave History</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <div className="table-responsive">
                            <table className="table time-table table-bordered table-ui-custom">
                                <thead>
                                    <th className="time-table-head text-start">
                                        Developer Name
                                    </th>
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
                                        Associated With
                                    </th>
                                    <th className="time-table-head text-start">
                                        Action
                                    </th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <div className="table-responsive">
                            <table className="table time-table table-bordered table-ui-custom">
                                <thead>
                                    <th className="time-table-head text-start">
                                        Developer Name
                                    </th>
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
                                        Associated With
                                    </th>
                                    <th className="time-table-head text-start">
                                        Action
                                    </th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <div className="d-flex justify-content-start gap-2">
                                                <OverlayTrigger placement="bottom" overlay={approveLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none">
                                                        <IoCheckmark />
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="bottom" overlay={rejectLeave}>
                                                    <Button variant="transparent" className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                                                        <IoCloseOutline />
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                        <div className="table-responsive">
                            <table className="table time-table table-bordered table-ui-custom">
                                <thead>
                                    <th className="time-table-head text-start">
                                        Developer Name
                                    </th>
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
                                        Associated With
                                    </th>
                                    <th className="time-table-head text-start">
                                        Leave Status
                                    </th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <span className="status-finished">Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <span className="status-rejected">Not Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <span className="status-rejected">Cancelled</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <span className="status-finished">Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <span className="status-finished">Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <span className="status-finished">Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                <div className="text-start">
                                                    <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                                        <img src={associateLogo} className="user-img" />
                                                    </div>
                                                </div>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="time-table-data text-start">
                                            <span className="status-finished">Approved</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="time-table-data text-start">
                                            <div className="d-flex align-items-center gap-2 white-nowrap">
                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                    <img src={userImage} className="user-img" />
                                                </div>
                                                Rohit Sharma
                                            </div>
                                        </td>
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
                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                        
                                        <td className="time-table-data text-start">
                                            <span className="status-finished">Approved</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </>
    )
}
export default LeaveRequest;