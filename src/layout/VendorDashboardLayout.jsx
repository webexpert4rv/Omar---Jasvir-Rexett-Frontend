import React, { useState } from 'react';
import Sidebar from '../components/VendorSidebar';
import Navigation from '../components/VendorNavigtion';
const VendorDashboardLayout = ({ children }) => {
    const [sidebarwrapper , isSidebarWrapper] = useState(false);
    const handleSidebar = () => {
        isSidebarWrapper(!sidebarwrapper)
    }
    
    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sidebarwrapper={sidebarwrapper} />
                <main className='main-wrapper'>
                    <Navigation onClick={handleSidebar} />
                    {children}
                </main>
            </div>
        </>
    );
};

export default VendorDashboardLayout;