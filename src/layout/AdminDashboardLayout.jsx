import React, { useState } from 'react';
import Sidebar from '../components/AdminSidebar';
import Navigation from '../components/AdminNavigation';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const AdminDashboardLayout = ({ children }) => {
    const [sidebarwrapper , isSidebarWrapper] = useState(false);
    const handleSidebar = () => {
        isSidebarWrapper(!sidebarwrapper)
    }
    const token=getToken("token")
    const role=localStorage.getItem("role")
    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sidebarwrapper={sidebarwrapper} />
                <main className='main-wrapper'>
                    <Navigation onClick={handleSidebar} />
                    {token && role=="admin"?children:<Navigate to="/admin-login"/>}
                </main>
            </div>
        </>
    );
};

export default AdminDashboardLayout;