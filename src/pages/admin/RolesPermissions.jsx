import React, { useState } from "react";
import { Button, Col, Form, Nav, Offcanvas, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import { RiFileCopy2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import NewPermissions from "./Modals/NewPermissions";
import NewRoles from "./Modals/NewRoles";
// import NewUser from "./Modals/NewUser"
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaEye, FaRotateRight, FaTrashCan } from "react-icons/fa6";
import EditRole from "./Modals/EditRole";
import { TiUserAdd } from "react-icons/ti";
import NewEmployee from "./Modals/NewEmployee";
import AssignChat from "./Modals/AssignChat";
import RolesPermissionSection from "../../components/common/AdminRoleAndPermission/RolesPermission/RolesPermissionSection";
const RolesPermission = () => {
    const [newpermission, setNewPermissions] = useState(false);
    const [newRoles, setNewRoles] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [editRoleModal, setRoleModal] = useState(false);
    const handleNewPermission = () => {
        setNewPermissions(true);
    }
    const handleNewUser = () => {
        setNewUser(true)
    }
    const handleNewRoles = () => {
        setNewRoles(true);
    }
    const handleCloseNewPermission = () => {
        setNewPermissions(false);
    }
    const handleCloseNewUser = () => {
        setNewUser(false)
    }

    const handleCloseNewRoles = () => {
        setNewRoles(false);
    }
    const handleShowEditRole = () => {
        setRoleModal(true)
    }
    const handleHideEditRole = () => {
        setRoleModal(false)
    }

    const [showRoleInfo, setShowRoleInfo] = useState(false);

    const handleCloseRoleInfo = () => setShowRoleInfo(false);
    const handleShowRoleInfo = () => setShowRoleInfo(true);

    const [assignchat, showAssignChat] = useState(false);
    const handleShowAssignChat = () => {
        showAssignChat(!assignchat);
    }
    const handleCloseAssignChat = () => {
        showAssignChat(false);
    }
    const assignEmployeeText = (
        <Tooltip>Assign Chat</Tooltip>
    )

    const reassignEmployee = (
        <Tooltip>Reassign Chat</Tooltip>
    )

    const action_application = (
        <Tooltip>Completing a user profile is essential for enhancing user experience and ensuring accurate information is available for communication and collaboration</Tooltip>
    )
    
const complete_profile = (
    <Tooltip>Completing a user profile is essential for enhancing user experience and ensuring accurate information is available for communication and collaboration</Tooltip>
)
const schedule_screening = (
    <Tooltip>This permission allows designated roles to set up, manage, and oversee the initial screening rounds, ensuring that only qualified candidates move forward in the hiring process.</Tooltip>
)
const suggest_developers = (
    <Tooltip>Assigning this permission allows certain roles to suggest candidates who meet the job requirements and fit the company culture.</Tooltip>
)
const schedule_interview = (
    <Tooltip>Scheduling interviews is a key step in the recruitment process, ensuring that candidates and interviewers are available at mutually convenient times.</Tooltip>
)
const manage_contracts = (
    <Tooltip>Assigning this permission ensures that only authorized roles can handle sensitive contractual documents, maintaining the integrity and compliance of your business operations.</Tooltip>
)
const review_timesheets = (
    <Tooltip>Assigning this permission allows specific roles to verify, approve, and manage timesheet entries, ensuring accountability and proper record-keeping.</Tooltip>
)
const reconciliation_timesheet = (
    <Tooltip>Assigning this permission allows specific roles to verify and reconcile discrepancies in timesheet entries, maintaining financial integrity and accountability.</Tooltip>
)
const approval_request = (
    <Tooltip>Sending timesheet approval requests to clients is a crucial process for validating recorded work hours and ensuring transparency between your team and the client.</Tooltip>
)
const raise_invoice_clients = (
    <Tooltip>Assigning this permission allows specific roles to create and send invoices to clients for the services rendered.</Tooltip>
)
const pay_invoice_devs = (
    <Tooltip>Assigning this permission allows specific roles to manage and process payments for invoices raised by developers.</Tooltip>
)
const review_invoices = (
    <Tooltip>Assigning this permission allows specific roles to thoroughly review and verify invoices submitted by clients or vendors.</Tooltip>
)
const action_profile = (
    <Tooltip>Assigning this permission allows specific roles to review and approve or reject changes made by users to their profile</Tooltip>
)

  

    
    return (
        <>
            <div className="card-box">
                <div className="border-bottom-grey pb-3 mb-4">
                    <h2 className="section-head border-0 mb-3 pb-0">Employees & Permissions</h2>
                    <p className="text-grey font-14 mb-0">Managing roles and permissions is essential for maintaining security and organization within your platform. By defining roles and assigning permissions, you can control access to various features and ensure that users have the appropriate level of access based on their responsibilities.</p>
                </div>
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="all_users"
                >
                    <div className="d-flex justify-content-center">
                        <Nav variant="pills" className="application-pills">
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="all_users" className="application-link">
                                    Manage Employees
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="application-item">
                                <Nav.Link eventKey="roles_permissions" className="application-link">
                                    Roles & Permissions
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey="all_users" className="py-4">
                            <div>
                                <div className="d-flex justify-content-end mb-3">
                                    <Button variant="transparent" className="main-btn font-14" onClick={handleNewUser}>+ New Employee</Button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-ui-custom">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email Address</th>
                                                <th>Role</th>
                                                <th>Assign chat</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="font-14 align-middle">John Smith</td>
                                                <td className="font-14 align-middle">johnsmith@gmail.com</td>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="role-pill">Workspace Admin</span>
                                                        <Button variant="transparent" className="edit-role" onClick={handleShowRoleInfo}>
                                                            <FaEye />
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <OverlayTrigger placement="bottom" overlay={assignEmployeeText}>
                                                            <Button variant="transparent" onClick={handleShowAssignChat} className="arrow-btn primary-arrow mb-1">
                                                                <TiUserAdd />
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <span className="associate-text d-inline-flex align-items-center gap-2">
                                                            <span className="associate">3 chats assigned</span>
                                                            <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                                                <span onClick={handleShowAssignChat} className="reschedule-btn flex-none">
                                                                    <FaRotateRight />
                                                                </span>
                                                            </OverlayTrigger>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="d-flex gap-3">
                                                        <Button variant="transparent" className="arrow-btn info-arrow" onClick={handleShowEditRole}><MdOutlineModeEditOutline /></Button>
                                                        <Button variant="transparent" className="arrow-btn danger-arrow"><FaTrashCan /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={5}>
                                                    <p className="font-14">A Workspace Admin, with full access, is responsible for managing user accounts, permissions, and security policies within the digital workspace. They oversee workspace configuration, data management, and ensure compliance with organizational policies. Additionally, they provide technical support, training, and monitor system performance to maintain an optimized and secure environment.</p>
                                                    <div>
                                                        <h5 className="mb-3">Permissions</h5>
                                                        <Row>
                                                            <Col md={4}>
                                                                <div className="permission-wrapper">
                                                                    <h4 className="permission-heading">New Applications</h4>
                                                                    <div className="p-2">
                                                                        <Row>
                                                                            <Col lg={12} className="mb-2">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Approve/Reject</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={12} className="mb-2">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Complete Profile</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={12} className="mb-0">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Schedule Screening</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="permission-wrapper">
                                                                    <h4 className="permission-heading">Jobs</h4>
                                                                    <div className="p-2">
                                                                        <Row>
                                                                            <Col lg={12} className="mb-2">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Suggest New Developers</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={12} className="mb-2">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Schedule Interviews</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={12} className="mb-0">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Manage Contracts</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="permission-wrapper">
                                                                    <h4 className="permission-heading">Time Reporting</h4>
                                                                    <div className="p-2">
                                                                        <Row>
                                                                            <Col lg={12} className="mb-2">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Review Timesheets</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={12} className="mb-2">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Review Timesheet Reconciliations</p>
                                                                                    <span className="not-approved">
                                                                                        <IoCloseOutline />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={12} className="mb-0">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Send Approval Request</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="permission-wrapper">
                                                                    <h4 className="permission-heading">Invoices</h4>
                                                                    <div className="p-2">
                                                                        <Row>
                                                                            <Col lg={12} className="mb-2">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Raise Invoice to Clients</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={12} className="mb-2">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Pay Invoice to Devs</p>
                                                                                    <span className="full-approved">
                                                                                        <FiCheck />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col lg={12} className="mb-0">
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Review Invoices</p>
                                                                                    <span className="not-approved">
                                                                                        <IoCloseOutline />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col md={4}>
                                                                <div className="permission-wrapper">
                                                                    <h4 className="permission-heading">Profile Updation</h4>
                                                                    <div className="p-2">
                                                                        <Row>
                                                                            <Col lg={12}>
                                                                                <div className="d-flex justify-content-between align-items-center">
                                                                                    <p className="mb-0 font-14">Approve/Reject</p>
                                                                                    <span className="not-approved">
                                                                                        <IoCloseOutline />
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-14 align-middle">Steve Warner</td>
                                                <td className="font-14 align-middle">stevewarner@gmail.com</td>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="role-pill no-role">No role assigned</span>
                                                        <Button variant="transparent" className="edit-role">
                                                            <FaEye />
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <OverlayTrigger placement="bottom" overlay={assignEmployeeText}>
                                                            <Button variant="transparent" onClick={handleShowAssignChat} className="arrow-btn primary-arrow mb-1">
                                                                <TiUserAdd />
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <span className="associate-text d-inline-flex align-items-center gap-2">
                                                            <span className="associate">3 chats assigned</span>
                                                            <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                                                <span onClick={handleShowAssignChat} className="reschedule-btn flex-none">
                                                                    <FaRotateRight />
                                                                </span>
                                                            </OverlayTrigger>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="d-flex gap-3">
                                                        <Button variant="transparent" className="arrow-btn info-arrow" onClick={handleShowEditRole}><MdOutlineModeEditOutline /></Button>
                                                        <Button variant="transparent" className="arrow-btn danger-arrow"><FaTrashCan /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="roles_permissions" className="py-4">
                            <div className="d-md-flex gap-3 mb-3 justify-content-between">
                                <div className="d-flex align-items-center gap-3 mb-md-0 mb-3">
                                    <div className="font-14">
                                        <span className="partial-approved">
                                            <FiCheck />
                                        </span>
                                        Partial Permission
                                    </div>
                                    <div className="font-14">
                                        <span className="full-approved">
                                            <FiCheck />
                                        </span>
                                        Full Permission
                                    </div>
                                    <div className="font-14">
                                        <span className="not-approved">
                                            <IoCloseOutline />
                                        </span>
                                        No Permission
                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    <Button variant="transparent" className="main-btn font-14" onClick={handleNewRoles} >+ New Role</Button>
                                    <Button variant="transparent" onClick={handleNewPermission} className="main-btn font-14">+ New Permission</Button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table roles-permission-table table-ui-custom">
                                    <thead>
                                        <tr>
                                            <th>Permissions</th>
                                            <th className="admin-data">Workspace Admin</th>
                                            <th>Admin</th>
                                            <th>Maintainence</th>
                                            <th>Support Assistance</th>
                                            <th>Accountant</th>
                                            <th>HR</th>
                                            <th>Interviewer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="main-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-16">
                                                        New Applications
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="partial-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Approve/Reject
                                                        <OverlayTrigger placement="bottom" overlay={action_application}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Complete Profile
                                                        <OverlayTrigger placement="bottom" overlay={complete_profile}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Schedule Screening
                                                        <OverlayTrigger placement="bottom" overlay={schedule_screening}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="main-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-16">
                                                        Jobs
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="partial-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Suggest New Developers
                                                        <OverlayTrigger placement="bottom" overlay={suggest_developers}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Schedule Interviews
                                                        <OverlayTrigger placement="bottom" overlay={schedule_interview}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Manage Contracts
                                                        <OverlayTrigger placement="bottom" overlay={manage_contracts}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="main-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-16">
                                                        Time Reporting
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="partial-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Review Timesheets
                                                        <OverlayTrigger placement="bottom" overlay={review_timesheets}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Review Timesheet Reconciliations
                                                        <OverlayTrigger placement="bottom" overlay={reconciliation_timesheet}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Send Approval Request
                                                        <OverlayTrigger placement="bottom" overlay={approval_request}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="main-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-16">
                                                        Invoices
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="partial-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Raise Invoice to Clients
                                                        <OverlayTrigger placement="bottom" overlay={raise_invoice_clients}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Pay Invoice to Devs
                                                        <OverlayTrigger placement="bottom" overlay={pay_invoice_devs}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Review Invoices
                                                        <OverlayTrigger placement="bottom" overlay={review_invoices}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                        <tr className="main-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-16">
                                                        Profile Updation
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="not-approved">
                                                    <IoCloseOutline />
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        Approve/Reject
                                                        <OverlayTrigger placement="bottom" overlay={action_profile}>
                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                        </OverlayTrigger>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" />
                                            </td>
                                            <td className="text-center">
                                                <Form.Check type="checkbox" className="permission-checkbox" checked />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
            <NewPermissions show={newpermission} handleClose={handleCloseNewPermission} />
            <NewRoles show={newRoles} handleClose={handleCloseNewRoles} />
            <NewEmployee show={newUser} handleClose={handleCloseNewUser} />
            <EditRole show={editRoleModal} handleClose={handleHideEditRole} />
            <AssignChat show={assignchat} handleClose={handleCloseAssignChat} />
        </>
    )
}
export default RolesPermission;