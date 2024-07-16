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
import NewEmployee from "./Modals/NewEmployee";
import AssignChat from "./Modals/AssignChat";
import RolesPermissionSection from "../../components/common/AdminRoleAndPermission/RolesPermission/RolesPermissionSection";
import { TiUserAdd } from "react-icons/ti";
import EmployeeManagement from "../../components/common/AdminRoleAndPermission/AllUsers/EmployeeManagement";
import Tabs from "../../components/common/LeaveRequest/Tabs";
import { permissionTabText } from "../../components/clients/TimeReporiting/constant";
const RolesPermission = () => {
    const {currentTab , setCurrentTab} = useState("first")
    const [newpermission, setNewPermissions] = useState(false);
    const [newRoles, setNewRoles] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [editRoleModal, setRoleModal] = useState(false);

    const handleSelect = (selectedTab) => {
        setCurrentTab(selectedTab);
      };
    
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
                {/* <Tabs 
                 handleSelect={handleSelect}
                 tabText={permissionTabText}
                 currentTab={currentTab}
                 /> */}
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
                            <EmployeeManagement />
                        </Tab.Pane>
                        <Tab.Pane eventKey="roles_permissions" className="py-4">
                            <RolesPermissionSection />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
            {/* <EmployeeManagement /> */}
            {/* <RolesPermissionSection /> */}
            <NewPermissions show={newpermission} handleClose={handleCloseNewPermission} />
            <NewRoles show={newRoles} handleClose={handleCloseNewRoles} />
            {/* <NewEmployee show={newUser} handleClose={handleCloseNewUser} /> */}
            <EditRole show={editRoleModal} handleClose={handleHideEditRole} />
            <AssignChat show={assignchat} handleClose={handleCloseAssignChat} />
        </>
    )
}
export default RolesPermission;