import React ,{useState} from 'react';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import { getToken } from '../helper/utlis';
import { FaUser } from "react-icons/fa6";
import { BiSolidPencil } from "react-icons/bi";
import { Link, Navigate } from 'react-router-dom';
import { Bar , Doughnut } from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import { main } from '@popperjs/core';
const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct'],
    datasets: [
        {
            label: 'Revenue',
            data: [20000, 50000, 150000, 180000, 100000, 80000, 50000, 20000, 16000, 150000],
            borderColor: 'blue',
            backgroundColor: '#180049',
        },
    ],
};
const earnedback = {
    labels: ['Earned Back', 'Developers'],
    datasets: [
        {
            data: [95, 5],
            backgroundColor: ['#037563', '#d6e30c'],
            hoverBackgroundColor: ['#060012', '#005d65'],
        },
    ],
};
const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    legend: {
        display: true,
        position: 'top',
        labels: {
            fontColor: '#000',
            fontSize: 16,
        },
    },
    plugins: {
        tooltip: {
            enabled: true,
            bodyFontSize: 14,
            bodyFontColor: '#fff',
            backgroundColor: '#000',
            borderColor: '#ddd',
            cornerRadius: 5,
        },
    },
};
const DashboardLayout = ({ children }) => {
    const [sidebarwrapper , isSidebarWrapper] = useState(false);
    const handleSidebar = () => {
        isSidebarWrapper(!sidebarwrapper)
    }
    const [mainSidebar, isMainSidebar] = useState(false);
    const handleMainSidebar = () => {
        isMainSidebar(!mainSidebar);
    }
    let token=getToken("token");
    const role=localStorage.getItem("role")

    
    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sideBarActive={mainSidebar} closemainSidebar={handleMainSidebar} />
                <main className={ sidebarwrapper ? 'main-wrapper client-wrapper' : 'main-wrapper client-wrapper right-active'}>
                    <Navigation sidebaractive={sidebarwrapper} handlemainSidebar={handleMainSidebar} handleSidebar={handleSidebar} />
                    {token && role=="client"?children:<Navigate to="/"/>}
               
                {!sidebarwrapper ?<div className={ !sidebarwrapper ? 'right-sidebar' : 'right-sidebar hide'}>
                    <div className='text-end d-lg-none mb-4'>
                        <Button variant="transparent" className='main-btn outline-main-btn px-3' onClick={handleSidebar}>&times;</Button>
                    </div>
                    <h3 className='right-sidebar-heading mb-3'>Growth per month</h3>
                    <div className='growth-chart'>
                        <Bar data={growthData} />
                    </div>
                    <h3 className='right-sidebar-heading mt-4 mb-3'>Earned Back</h3>
                    <div className='earned-chart'>
                        <Doughnut data={earnedback} options={options} />
                    </div>
                </div>:""}
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;