import React, { useState } from 'react';
import Sidebar from '../components/DeveloperSidebar';
import Navigation from '../components/DeveloperNavigation';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const DeveloperPublicLayout = ({ children }) => {
    const [sidebarwrapper , isSidebarWrapper] = useState(false);
    const handleSidebar = () => {
        isSidebarWrapper(!sidebarwrapper)
    }
    const token=getToken("developerToken")
    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sidebarwrapper={sidebarwrapper} />
                <main className='main-wrapper'>
                    <Navigation onClick={handleSidebar} />
                    {!token?children:<Navigate to="/developer-dashboard"/>}
                </main>
            </div>
        </>
    );
};

export default DeveloperPublicLayout;