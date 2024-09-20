import React, { useEffect, useState } from 'react'
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FiCheck } from 'react-icons/fi'
import { IoIosInformationCircle } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import RolesPermissionWrapper from '../../../../pages/admin/Modals/RolesPermissionWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPermissionSeeder, getUpdateRolePermission } from '../../../../redux/slices/adminDataSlice'
import ToolTip from '../../Tooltip/ToolTip'
// import {roleNames} from './constant'

const roleNames = [
    "manager", "workspace admin", "admin", "maintenance",
    "support assistance", "accountant", "hr", "interviewer"
];
const tooltipText = [
    "The ability to approve or reject new applications is a critical role that ensures only suitable candidates gain access to your platform.",
    "Completing a user profile is essential for enhancing user experience and ensuring accurate information is available for communication and collaboration",
    "This permission allows designated roles to set up, manage, and oversee the initial screening rounds, ensuring that only qualified candidates move forward in the hiring process.",
    "Assigning this permission allows certain roles to suggest candidates who meet the job requirements and fit the company culture.",
    "Scheduling interviews is a key step in the recruitment process, ensuring that candidates and interviewers are available at mutually convenient times.",
    "Assigning this permission ensures that only authorized roles can handle sensitive contractual documents, maintaining the integrity and compliance of your business operations.",
    "Assigning this permission allows specific roles to verify, approve, and manage timesheet entries, ensuring accountability and proper record-keeping.",
    "Assigning this permission allows specific roles to verify and reconcile discrepancies in timesheet entries, maintaining financial integrity and accountability.",
    "Sending timesheet approval requests to clients is a crucial process for validating recorded work hours and ensuring transparency between your team and the client.",
    "Assigning this permission allows specific roles to create and send invoices to clients for the services rendered.",
    "Assigning this permission allows specific roles to manage and process payments for invoices raised by developers.",
    "Assigning this permission allows specific roles to thoroughly review and verify invoices submitted by clients or vendors.",
    "Assigning this permission allows specific roles to review and approve or reject changes made by users to their profile"
]


const RolesPermissionSection = () => {
    const dispatch = useDispatch()
    const { allPermissionList } = useSelector((state) => state.adminData)
    const roleName = allPermissionList?.permissions?.roles?.filter((value => value.name))
    const [modalConfiguration, setModalConfiguration] = useState({
        name: "",
        isTrue: false
    })
    useEffect(() => {
        dispatch(getAllPermissionSeeder())
    }, [])

    const handleModal = (name) => {
        setModalConfiguration({
            name: name,
            isTrue: !modalConfiguration.isTrue
        })
    }
    const handleCheckStatus = (item_id, role_id, status) => {
        console.log(item_id, "item_id")
        console.log(role_id, "role_id")
        let data = {
            role_id: role_id,
            permission_id: item_id,
            status: status

        }
        dispatch(getUpdateRolePermission(data))
    }

    // const action_application = (
    //     <Tooltip>The ability to approve or reject new applications is a critical role that ensures only suitable candidates gain access to your platform.</Tooltip>
    // )

    // const complete_profile = (
    //     <Tooltip>Completing a user profile is essential for enhancing user experience and ensuring accurate information is available for communication and collaboration</Tooltip>
    // )
    // const schedule_screening = (
    //     <Tooltip>This permission allows designated roles to set up, manage, and oversee the initial screening rounds, ensuring that only qualified candidates move forward in the hiring process.</Tooltip>
    // )
    // const suggest_developers = (
    //     <Tooltip>Assigning this permission allows certain roles to suggest candidates who meet the job requirements and fit the company culture.</Tooltip>
    // )
    // const schedule_interview = (
    //     <Tooltip>Scheduling interviews is a key step in the recruitment process, ensuring that candidates and interviewers are available at mutually convenient times.</Tooltip>
    // )
    // const manage_contracts = (
    //     <Tooltip>Assigning this permission ensures that only authorized roles can handle sensitive contractual documents, maintaining the integrity and compliance of your business operations.</Tooltip>
    // )
    // const review_timesheets = (
    //     <Tooltip>Assigning this permission allows specific roles to verify, approve, and manage timesheet entries, ensuring accountability and proper record-keeping.</Tooltip>
    // )
    // const reconciliation_timesheet = (
    //     <Tooltip>Assigning this permission allows specific roles to verify and reconcile discrepancies in timesheet entries, maintaining financial integrity and accountability.</Tooltip>
    // )
    // const approval_request = (
    //     <Tooltip>Sending timesheet approval requests to clients is a crucial process for validating recorded work hours and ensuring transparency between your team and the client.</Tooltip>
    // )
    // const raise_invoice_clients = (
    //     <Tooltip>Assigning this permission allows specific roles to create and send invoices to clients for the services rendered.</Tooltip>
    // )
    // const pay_invoice_devs = (
    //     <Tooltip>Assigning this permission allows specific roles to manage and process payments for invoices raised by developers.</Tooltip>
    // )
    // const review_invoices = (
    //     <Tooltip>Assigning this permission allows specific roles to thoroughly review and verify invoices submitted by clients or vendors.</Tooltip>
    // )
    // const action_profile = (
    //     <Tooltip>Assigning this permission allows specific roles to review and approve or reject changes made by users to their profile</Tooltip>
    // )
    // const disableProfile = (
    //     <Tooltip>Disable Account</Tooltip>
    // )
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
                    <Button variant="transparent" className="main-btn font-14" onClick={() => handleModal("newRole")}  >+ New Role</Button>
                    {/* <Button variant="transparent" onClick={()=>handleModal("permission")} className="main-btn font-14">+ New Permission</Button> */}
                </div>
            </div>
            <div className="table-responsive">
                <table className="table roles-permission-table table-ui-custom">
                    <thead>
                        <tr>
                            <th>Permissions</th>
                            {allPermissionList?.roles?.map((role, idx) => {
                                return (
                                    <th key={idx}>{role?.name?.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}</th>
                                )
                            })}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPermissionList?.permissions?.map((item, idx) => {
                                return (
                                    <>
                                        <tr className="main-permission-data">
                                            <td className="align-middle">
                                                <div className="d-flex align-items-center gap-3 justify-content-between">
                                                    <h3 className="mb-0 font-16">
                                                        {item?.categoryName?.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())}
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
                                            {/* <td className="text-center">
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
                                            <td className="text-center">
                                                <span className="full-approved">
                                                    <FiCheck />
                                                </span>
                                            </td> */}
                                        </tr>
                                        {item?.permissions?.map((field, index) => {
                                            return (
                                                <tr className="sub-permission-data" key={index}>
                                                    <td className="align-middle">
                                                        <div className="d-flex align-items-center gap-3 justify-content-between">
                                                            <h3 className="mb-0 font-14 fw-normal d-flex align-items-center gap-2">
                                                                {field?.description}
                                                                {tooltipText[index] && (
                                                                    <div>
                                                                        <ToolTip text={tooltipText[index]}>
                                                                            <span className="info-permission"><IoIosInformationCircle /></span>
                                                                        </ToolTip>
                                                                    </div>
                                                                )}
                                                            </h3>
                                                        </div>
                                                    </td>
                                                    {field?.roles?.map((role, idx) => (
                                                        <>
                                                                <td className="text-center" key={idx}>
                                                                    <Form.Check
                                                                        type="checkbox"
                                                                        className="permission-checkbox"
                                                                        onChange={() => handleCheckStatus(item?.id, role?.id, "active")}
                                                                        checked={role?.checked}
                                                                    />
                                                                </td>
                                                          
                                                        </>
                                                    ))}
                                                    {/* {field?.checked === false &&
                                                        <>
                                                            {roleNames.map((name) => (
                                                                <td className="text-center" key={name}>
                                                                    <Form.Check type="checkbox" className="permission-checkbox" onChange={() => handleCheckStatus(item?.id, "inactive")} />
                                                                </td>
                                                            ))}
                                                        </>
                                                    } */}
                                                </tr>)
                                        })}
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <RolesPermissionWrapper show={modalConfiguration.isTrue} handleClose={handleModal} heading={modalConfiguration.name == "permission" ? "New Permission" : "New Roles "} modalName={modalConfiguration.name == "permission" ? "permission" : "role"} options={[]} />
        </>
    )
}

export default RolesPermissionSection