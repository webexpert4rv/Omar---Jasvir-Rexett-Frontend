import React ,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const DashboardLayout = ({ children }) => {
    const [sidebarwrapper , isSidebarWrapper] = useState(false);
    const handleSidebar = () => {
        isSidebarWrapper(!sidebarwrapper)
    }
    let token=getToken("token");
    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sidebarwrapper={sidebarwrapper} />
                <main className='main-wrapper'>
                    <Navigation onClick={handleSidebar} />
                    {token?children:<Navigate to="/"/> }
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;