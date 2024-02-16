import React ,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
const DashboardLayout = ({ children }) => {
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

export default DashboardLayout;