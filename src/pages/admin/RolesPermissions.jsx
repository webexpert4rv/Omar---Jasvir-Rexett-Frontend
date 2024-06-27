import React, { useEffect, useState } from "react";
import { Nav,Tab } from "react-bootstrap";
import EmployeeManagement from "../../components/common/AdminRoleAndPermission/AllUsers/EmployeeManagement";
import RolesPermissionSection from "../../components/common/AdminRoleAndPermission/RolesPermission/RolesPermissionSection";
import { useDispatch } from "react-redux";
import { getAllPermissionSeeder } from "../../redux/slices/adminDataSlice";
const RolesPermission = () => {
    const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(getAllPermissionSeeder())

  },[])
    return (
        <>
            <div className="card-box">
                <div className="border-bottom-grey pb-3 mb-4">
                    <h2 className="section-head border-0 mb-3 pb-0">Roles & Permissions</h2>
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
                          <EmployeeManagement/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="roles_permissions" className="py-4">
                           <RolesPermissionSection/>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </>
    )
}
export default RolesPermission;