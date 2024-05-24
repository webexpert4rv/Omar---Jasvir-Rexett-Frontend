import React from "react";
import {
    Button,
    Col,
    Nav,
    Row,
    Tab,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import companyLogo from '../../assets/img/amazon.png'
import vendorLogo from '../../assets/img/aviox-logo.png'
import userImg from '../../assets/img/user-img.jpg'
const ProfileUpdationRequest = () => {
    const approvedTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Approve
        </Tooltip>
    );
    const rejectedTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Reject
        </Tooltip>
    );
    return (
        <>
            <div className="card-box">
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="clients"
                >
                    <Nav variant="pills" className="application-pills">
                        <Nav.Item className="application-item">
                            <Nav.Link eventKey="clients" className="application-link">
                                Clients
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="application-item">
                            <Nav.Link eventKey="vendors" className="application-link">
                                Vendors
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="application-item">
                            <Nav.Link eventKey="developers" className="application-link">
                                Developers
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="clients">
                            <div>
                                <div className="table-responsive">
                                    <table className="table w-100 table-ui-custom mb-0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th className="max-w-300px">Made Changes in</th>
                                                <th>Profile</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                            <img src={companyLogo} className="user-img" />
                                                        </div>
                                                        Amazon
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <ul className="made-changes mb-0 pb-0">
                                                        <li>Profile Pic</li>
                                                        <li>Name</li>
                                                        <li>Company Name</li>
                                                        <li>Phone Number</li>
                                                        <li>Email address</li>
                                                    </ul>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="remarks-text">View Profile</span>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="status-progress">Under Review</span>
                                                </td>
                                                <td>

                                                    <div className="d-flex gap-3">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={approvedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn primary-arrow"
                                                                variant="transparent"><IoCheckmark /></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={rejectedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn danger-arrow"
                                                                variant={"danger"}>
                                                                <IoCloseOutline /></Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                            <img src={companyLogo} className="user-img" />
                                                        </div>
                                                        Amazon
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <ul className="made-changes mb-0 pb-0">
                                                        <li>Company Name</li>
                                                        <li>Phone Number</li>
                                                        <li>Email address</li>
                                                    </ul>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="remarks-text">View Profile</span>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="status-progress">Under Review</span>
                                                </td>
                                                <td>

                                                    <div className="d-flex gap-3">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={approvedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn primary-arrow"
                                                                variant="transparent"><IoCheckmark /></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={rejectedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn danger-arrow"
                                                                variant={"danger"}>
                                                                <IoCloseOutline /></Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="vendors">
                            <div>
                                <div className="table-responsive">
                                    <table className="table w-100 table-ui-custom mb-0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th className="max-w-300px">Made Changes in</th>
                                                <th>Profile</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center vendor-text gap-2">
                                                        <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                            <img src={vendorLogo} className="user-img" />
                                                        </div>
                                                        Aviox Technologies Pvt Ltd.
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <ul className="made-changes mb-0 pb-0">
                                                        <li>Profile Pic</li>
                                                        <li>Name</li>
                                                        <li>Company Name</li>
                                                        <li>Phone Number</li>
                                                        <li>Email address</li>
                                                    </ul>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="remarks-text">View Profile</span>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="status-progress">Under Review</span>
                                                </td>
                                                <td>

                                                    <div className="d-flex gap-3">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={approvedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn primary-arrow"
                                                                variant="transparent"><IoCheckmark /></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={rejectedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn danger-arrow"
                                                                variant={"danger"}>
                                                                <IoCloseOutline /></Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center vendor-text gap-2">
                                                        <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                            <img src={vendorLogo} className="user-img" />
                                                        </div>
                                                        Aviox Technologies Pvt Ltd.
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <ul className="made-changes mb-0 pb-0">
                                                        <li>Company Name</li>
                                                        <li>Phone Number</li>
                                                        <li>Email address</li>
                                                    </ul>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="remarks-text">View Profile</span>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="status-progress">Under Review</span>
                                                </td>
                                                <td>

                                                    <div className="d-flex gap-3">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={approvedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn primary-arrow"
                                                                variant="transparent"><IoCheckmark /></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={rejectedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn danger-arrow"
                                                                variant={"danger"}>
                                                                <IoCloseOutline /></Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="developers">
                            <div>
                                <div className="table-responsive">
                                    <table className="table w-100 table-ui-custom mb-0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th className="max-w-300px">Made Changes in</th>
                                                <th>Profile</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center vendor-text gap-2">
                                                        <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                            <img src={userImg} className="user-img" />
                                                        </div>
                                                        Rohit Sharma
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <ul className="made-changes mb-0 pb-0">
                                                        <li>Profile Pic</li>
                                                        <li>Name</li>
                                                        <li>Company Name</li>
                                                        <li>Phone Number</li>
                                                        <li>Email address</li>
                                                    </ul>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="remarks-text">View Profile</span>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="status-progress">Under Review</span>
                                                </td>
                                                <td>

                                                    <div className="d-flex gap-3">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={approvedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn primary-arrow"
                                                                variant="transparent"><IoCheckmark /></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={rejectedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn danger-arrow"
                                                                variant={"danger"}>
                                                                <IoCloseOutline /></Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center vendor-text gap-2">
                                                        <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                            <img src={userImg} className="user-img" />
                                                        </div>
                                                        Rohit Sharma
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <ul className="made-changes mb-0 pb-0">
                                                        <li>Exprience</li>
                                                        <li>Education</li>
                                                        <li>About Bio</li>
                                                        <li>Skills</li>
                                                        <li>Expertise</li>
                                                    </ul>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="remarks-text">View Profile</span>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="status-progress">Under Review</span>
                                                </td>
                                                <td>

                                                    <div className="d-flex gap-3">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={approvedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn primary-arrow"
                                                                variant="transparent"><IoCheckmark /></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={rejectedTooltip}
                                                        >
                                                            <Button
                                                                className="arrow-btn danger-arrow"
                                                                variant={"danger"}>
                                                                <IoCloseOutline /></Button>
                                                        </OverlayTrigger>
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
        </>
    )
}
export default ProfileUpdationRequest;