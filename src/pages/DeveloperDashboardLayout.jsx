import React, { useState } from 'react';
import Sidebar from '../components/DeveloperSidebar';
import Navigation from '../components/DeveloperNavigation';
const DeveloperDashboardLayout = ({ children }) => {
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

export default DeveloperDashboardLayout;