import React, { useState } from 'react';
import Sidebar from '../components/DeveloperSidebar';
import Navigation from '../components/DeveloperNavigation';
import { Navigate } from 'react-router-dom';
import { getToken } from '../helper/utlis';
const PublicLayout = ({ children }) => {
    const [sidebarwrapper , isSidebarWrapper] = useState(false);
    const handleSidebar = () => {
        isSidebarWrapper(!sidebarwrapper)
    }
    const token=getToken("token")
    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sidebarwrapper={sidebarwrapper} />
                <main className='main-wrapper'>
                    <Navigation onClick={handleSidebar} />
                    {!token? children :<Navigate to="/dashboard"/>}
                </main>
            </div>
        </>
    );
};

export default PublicLayout;