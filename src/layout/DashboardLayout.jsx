import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import { getToken } from '../helper/utlis';
import { FaUser } from "react-icons/fa6";
import { BiSolidPencil } from "react-icons/bi";
import { Link, Navigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Button, Col, Row } from 'react-bootstrap';
import { main } from '@popperjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { getRevenue } from '../redux/slices/vendorDataSlice';
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
    const [sidebarwrapper, isSidebarWrapper] = useState(false);
    const { revenueData } = useSelector(state => state.vendorData)
    const minOffset = 0;
    const maxOffset = 10;
    const [yearOptionsValue, setYearOptionsValue] = useState([]);
    const thisYear = new Date().getFullYear();
    const dispatch = useDispatch()


    console.log(revenueData, "revenueData")
    const handleSidebar = () => {
        isSidebarWrapper(!sidebarwrapper)
    }
   
    const [mainSidebar, isMainSidebar] = useState(false);
    const handleMainSidebar = () => {
        isMainSidebar(!mainSidebar);
    }
    let token = getToken("token");
    const role = localStorage.getItem("role")
    const monthlyData=(data)=>{
        let newData=[]
         data?.forEach((item)=>{
           newData.push(item.totalAmount)
         })
   
         return newData
       }
       useEffect(() => {
        const optionsValue = [];
        for (let i = minOffset; i <= maxOffset; i++) {
          const year = thisYear - i;
          optionsValue.push(year);
        }
        setYearOptionsValue(optionsValue);
      }, []);

   
       const data = {
           labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct','Nov','Dec'],
           datasets: [
               {
                   label: 'Revenue',
                   data: monthlyData(revenueData?.monthly_revenue),
                   borderColor: 'blue',
                   backgroundColor: '#180049',
               },
           ],
       };
       useEffect(()=>{
          dispatch(getRevenue())
       },[])
   
       const handleFilter=(e,selected)=>{
           let filter={
               [selected]:e
           }
       
           dispatch(getRevenue(filter));
       }

    return (
        <>
            <div className="dashboard-layout">
                <Sidebar sideBarActive={mainSidebar} closemainSidebar={handleMainSidebar} />
                <main className={sidebarwrapper ? 'main-wrapper client-wrapper' : 'main-wrapper client-wrapper right-active'}>
                    <Navigation sidebaractive={sidebarwrapper} handlemainSidebar={handleMainSidebar} handleSidebar={handleSidebar} />
                    {token && role == "client" ? children : <Navigate to="/" />}

                    {!sidebarwrapper ? <div className={!sidebarwrapper ? 'right-sidebar' : 'right-sidebar hide'}>
                        <div className='text-end d-lg-none mb-4'>
                            <Button variant="transparent" className='main-btn outline-main-btn px-3' onClick={handleSidebar}>&times;</Button>
                        </div>
                        <h3 className='right-sidebar-heading mb-3'>Growth per month</h3>
                        <div className="card-box">
                            <Row>
                                <Col md={30}>
                                    <div>
                                        {/* <h2 className="section-head-sub">Statistic Revenue</h2> */}
                                        <Bar data={data} />
                                    </div>
                                </Col>

                            </Row>
                        </div>
                        <h3 className='right-sidebar-heading mt-4 mb-3'>Earned Back</h3>
                        <div className='earned-chart'>
                            <Doughnut data={earnedback} options={options} />
                        </div>
                    </div> : ""}
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;