import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { FaEye, FaTrashCan } from 'react-icons/fa6'
import { FiCheck } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import RolesPermissionWrapper from '../../../../pages/admin/Modals/RolesPermissionWrapper'
import NewEmployee from '../../../../pages/admin/Modals/NewEmployee'
import { EMPLOYEE_ROLE } from '../../../../helper/constant'
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, updateEmployeeProfile } from '../../../../redux/slices/adminDataSlice'
import ConfirmationModal from '../../Modals/ConfirmationModal'

const EmployeeManagement = () => {
    const [newEmployee, setEmployee] = useState(false);
    const [editRoleModal, setRoleModal] = useState(false);
    const { allAdminEmployees,smallLoader } = useSelector((state) => state.adminData);
    const [selectedEmpId, setSelectedEmpId] = useState()
    const [empDetails, setEmpDetails] = useState()
    const [deleteShowModal, setDeleteShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [empId , setEmpId] = useState()
    const dispatch = useDispatch()


    const handleNewEmployee = () => {
        setEmployee(true)
    }
    const handleCloseModal=()=>{
        setEmployee(false)
        setRoleModal(false)
        setIsEdit(false)
    }


    const handleShowEditRole = (id) => {
        const selectedEmp = allAdminEmployees?.find((emp) => emp?.id === id)
        setEmpDetails(selectedEmp)
        setSelectedEmpId(id)
        setRoleModal(true)
        setIsEdit(true)
    }
    

    const handleEmpDelete = (id) => {
        setEmpId(id)
        setDeleteShowModal(!deleteShowModal)

    }
  
    const handleAction=()=>{
            dispatch(deleteEmployee(empId))
        setDeleteShowModal(false)
    }

    const handleEmpAccordian=(id)=>{
        setEmpId(id)
    }

    console.log(empId,"empid")

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
                            {allAdminEmployees?.map((val) => (
                                <>
                                <tr>
                                    <td className="font-14 align-middle">{val?.name}</td>
                                    <td className="font-14 align-middle">{val?.email}</td>
                                    <td className="align-middle">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="role-pill">{val?.roles[0]?.name}</span>
                                            <Button variant="transparent" className="edit-role" onClick={() => handleEmpAccordian(val?.id)} >
                                                <FaEye />
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        <div className="d-flex gap-3">
                                            <Button variant="transparent" className="arrow-btn info-arrow" onClick={() => handleShowEditRole(val?.id)}><MdOutlineModeEditOutline /></Button>
                                            <Button variant="transparent" className="arrow-btn danger-arrow" onClick={() => handleEmpDelete(val?.id)}><FaTrashCan /></Button>
                                        </div>
                                    </td>
                                </tr>
                        
                            {empId==val?.id  && <tr>
                                <td colSpan={4}>
                                    <p className="font-14">A Workspace Admin, with full access, is responsible for managing user accounts, permissions, and security policies within the digital workspace. They oversee workspace configuration, data management, and ensure compliance with organizational policies. Additionally, they provide technical support, training, and monitor system performance to maintain an optimized and secure environment.</p>
                                    <div>
                                        <h5 className="mb-3">Permissions</h5>
                                        <Row>
                                            {
                                                val?.roles[0]?.permissions_category?.map((item,index)=>{
                                                    return (
                                                        <>
                                                            <Col md={4}>
                                                <div className="permission-wrapper">
                                                    <h4 className="permission-heading">{item?.name}</h4>
                                                    <div className="p-2">
                                                        <Row>
                                                            {
                                                                item?.permissions?.map((ele,index)=>{
                                                                    return (
                                                                        <>
                                                                         <Col lg={12} className="mb-2">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <p className="mb-0 font-14">{ele?.name}</p>
                                                                    <span className="full-approved">
                                                                        <FiCheck />
                                                                    </span>
                                                                </div>
                                                            </Col>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                           
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>
                                </td>
                            </tr>}
                            </>
                                ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <ConfirmationModal
            show={deleteShowModal}
            handleClose={handleEmpDelete}
            handleAction={handleAction}
            smallLoader={smallLoader}
            text={"Are you sure, you want to delete this Employee"}
          />
            <RolesPermissionWrapper show={newEmployee || editRoleModal} handleClose={handleCloseModal} heading={editRoleModal ? "Edit Employee" : "Add Employee"} modalName="employee" options={EMPLOYEE_ROLE} id={selectedEmpId} data={empDetails} setIsEdit={setIsEdit} isEdit={isEdit}/>
        </>
    )
}

export default EmployeeManagement