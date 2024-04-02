import React, { useState } from 'react';
import Sidebar from '../components/VendorSidebar';
import Navigation from '../components/VendorNavigtion';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const VendorDashboardLayout = ({ children }) => {
    const [sidebarwrapper , isSidebarWrapper] = useState(false);
    const handleSidebar = () => {
        isSidebarWrapper(!sidebarwrapper)
    }
    let token=getToken("token");
    const role=localStorage.getItem("role")
    
    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sidebarwrapper={sidebarwrapper} />
                <main className='main-wrapper'>
                    <Navigation onClick={handleSidebar} />
                    {token && role=="vendor"?children:<Navigate to="/vendor-login"/>}
                </main>
            </div>
        </>
    );
};

export default VendorDashboardLayout;