import React, { useState } from 'react'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FiCheck } from 'react-icons/fi'
import { IoIosInformationCircle } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import RolesPermissionWrapper from '../../../../pages/admin/Modals/RolesPermissionWrapper'
import { useSelector } from 'react-redux'

const RolesPermissionSection = () => {

    const {allPermissionList}=useSelector((state)=>state.adminData)
   const [modalConfiguration,setModalConfiguration]=useState({
    name:"",
    isTrue:false
   })


    const handleModal = (name) => {
        setModalConfiguration({
          name:name,
          isTrue:!modalConfiguration.isTrue
        })
    }
  
    const action_application = (
        <Tooltip>The ability to approve or reject new applications is a critical role that ensures only suitable candidates gain access to your platform.</Tooltip>
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
    const disableProfile = (
        <Tooltip>Disable Account</Tooltip>
    )
  return (
    <>
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
                                    <Button variant="transparent" className="main-btn font-14" onClick={()=>handleModal("newRole")}  >+ New Role</Button>
                                    <Button variant="transparent" onClick={()=>handleModal("permission")} className="main-btn font-14">+ New Permission</Button>
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
                                        {/* {
                                            allPermissionList?.map((item)=>{
                                                return(
                                                    <>
                                                 <tr className="sub-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                        {item?.name}
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
                                                    </>
                                                )
                                            })
                                        } */}
                                       
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

                            <RolesPermissionWrapper show={modalConfiguration.isTrue} handleClose={handleModal} heading={modalConfiguration.name=="permission"?"New Permission" :"New Roles "} modalName={modalConfiguration.name=="permission"?"permission":"role"} options={[]} />
    </>
  )
}

export default RolesPermissionSection