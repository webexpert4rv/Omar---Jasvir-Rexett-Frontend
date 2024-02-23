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
    const token=getToken("adminToken")
    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sidebarwrapper={sidebarwrapper} />
                <main className='main-wrapper'>
                    <Navigation onClick={handleSidebar} />
                    {token?children:<Navigate to="/agency-login"/>}
                </main>
            </div>
        </>
    );
};

export default AdminDashboardLayout;