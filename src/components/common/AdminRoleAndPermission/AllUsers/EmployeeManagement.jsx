 import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { FaEye, FaTrashCan } from 'react-icons/fa6'
import { FiCheck } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import RolesPermissionWrapper from '../../../../pages/admin/Modals/RolesPermissionWrapper'
import NewEmployee from '../../../../pages/admin/Modals/NewEmployee'
import { EMPLOYEE_ROLE } from '../../../../helper/constant'
 
 const EmployeeManagement = () => {
    const [newEmployee,setEmployee] = useState(false);
    const [editRoleModal, setRoleModal] = useState(false);

    const handleNewEmployee = () => {
        setEmployee(!newEmployee)
    }
    const handleShowEditRole = () => {
        setRoleModal(true)
    }
    const handleHideEditRole = () => {
        setRoleModal(false)
    }
   return (
     <>
      <div>
                                <div className="d-flex justify-content-end mb-3">
                                    <Button variant="transparent" className="main-btn font-14" onClick={handleNewEmployee}>+ New Employee</Button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-ui-custom">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email Address</th>
                                                <th>Role</th>
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
                                                        <Button variant="transparent" className="edit-role">
                                                            <FaEye />
                                                        </Button>
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
                                                <td colSpan={4}>
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
                            <RolesPermissionWrapper show={newEmployee} handleClose={handleNewEmployee} heading="Add Employee" modalName="employee" options={EMPLOYEE_ROLE} />

                       
     </>
   )
 }
 
 export default EmployeeManagement