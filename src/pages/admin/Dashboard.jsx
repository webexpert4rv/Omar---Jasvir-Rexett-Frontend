import React, { useEffect, useRef, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Line, Doughnut } from 'react-chartjs-2';
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { adminListAssignedDeveloper, adminListClients, getAdminDashboard, getSingleClient } from "../../redux/slices/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import NoDataFound from "../../components/atomic/NoDataFound"
import { useTranslation } from "react-i18next";
import Chart from 'chart.js/auto';
import clientImg from '../../assets/img/amazon.png';
import devImg from '../../assets/img/user-img.jpg';
import devImg2 from '../../assets/img/demo-img.jpg';
import devImg3 from '../../assets/img/laura.jpg';
import { GoProjectRoadmap } from "react-icons/go";
import { FaCircleCheck, FaLink } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import MeetingInfo from "./Modals/MeetingInfo";
import Calendar from 'react-calendar';



const AdminDashboard = () => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    const dispatch = useDispatch()
    const { listOfClients, adminDashboard, screenLoader } = useSelector(state => state.adminData)
    const { developerDetails } = useSelector(state => state.adminData)
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [value, onChange] = useState(new Date());

    const userName = localStorage.getItem("userName")

    useEffect(() => {
        dispatch(getAdminDashboard())
    }, [])

    const handleCardClick = (id) => {
        dispatch(getDeveloperDetails(id))
        navigate(`/admin-single-developer/${id}`)
    }
    const handleClientCardClick = (client_id) => {
        dispatch(getSingleClient(client_id))
        navigate(`/admin-single-client/${client_id}`)
    }
    var capturedMessage
    function captureConsoleMessage() {
        var oldConsoleLog = console.log;
        console.log = function (message) {
            if (typeof message === 'object') {
                message = JSON && JSON.stringify ? JSON.stringify(message) : message;
            }
            capturedMessage = message; // Store the message
            oldConsoleLog.apply(console, arguments); // Call the original console.log
        };
    }

    captureConsoleMessage(); // Call the function to start capturing console log messages


    function getCapturedMessage() {
        return capturedMessage;
    }
    let c = getCapturedMessage()
    console.log(c, "op")


    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Total Revenue',
                data: [1000, 20000, 15000, 14000, 12500, 12300, 4000, 3000, 5000, 6000, 5500, 12000],
                fill: false,
                borderColor: 'rgb(3, 117, 99)',
                lineTension: 0.4, // Set line tension to create a curved line
            },
        ],
    };
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'This Year',
                data: [5000, 20000, 15000, 22000, 18000, 25000, 20000, 10000, 15000, 20000, 25000, 22000],
                borderColor: 'rgb(8, 143, 143)',
                backgroundColor: 'rgba(8, 143, 143 , .05)',
                fill: true,
                tension: 0.4, // Add tension for smooth curves
            },
            {
                label: 'Last Year',
                data: [7000, 12000, 17000, 14000, 19000, 24000, 18000, 14000, 19000, 12000, 18000, 14000],
                borderColor: '#c00',
                backgroundColor: 'rgba(255, 0, 0, 0)',
                fill: true,
                tension: 0.4, // Add tension for smooth curves
                borderDash: [5, 5], // Make the line dashed
            },
        ],
    };
    const lineOptions = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false, // Remove vertical grid lines
                },
            },
            y: {
                grid: {
                    display: true,
                },
                ticks: {
                    display: true, // Show y-axis labels
                },
            },
        },
        plugins: {
            legend: {
                position: 'top', // Keep the legend labels
                labels: {
                    padding: 20, // Add padding to the legend labels
                    align: 'center',
                },
            },
            tooltip: {
                enabled: true, // Enable tooltips
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 2, // Hide points on the line
                hoverRadius: 5, // Hide points on hover
            },
        },
    };

    const TotalProjectData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Monthly',
                data: [250, 210, 340, 400, 380, 420, 350, 500, 550, 490, 380, 500],
                borderColor: 'rgb(8, 143, 143)',
                backgroundColor: 'rgba(8, 143, 143 , .05)',
                fill: true,
                tension: 0.4, // Add tension for smooth curves
            },
        ],
    };
    const TotalProjectOptions = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false, // Remove vertical grid lines
                },
                ticks: {
                    display: false, // Hide x-axis labels
                },
            },
            y: {
                grid: {
                    display: false, // Remove horizontal grid lines
                },
                ticks: {
                    display: false, // Hide y-axis labels
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide legend
            },
            tooltip: {
                enabled: false, // Disable tooltips
            },
        },
        elements: {
            point: {
                radius: 0, // Hide points on the line
                hoverRadius: 0, // Hide points on hover
            },
        },
    };


    const CompletedProjectData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Monthly',
                data: [100, 120, 300, 200, 350, 400, 300, 270, 370, 390, 350, null, null],
                borderColor: 'rgb(8, 143, 143)',
                backgroundColor: 'rgba(8, 143, 143 , .05)',
                fill: true,
                tension: 0.4, // Add tension for smooth curves
            },
        ],
    };
    const CompletedProjectOptions = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false, // Remove vertical grid lines
                },
                ticks: {
                    display: false, // Hide x-axis labels
                },
            },
            y: {
                grid: {
                    display: false, // Remove horizontal grid lines
                },
                ticks: {
                    display: false, // Hide y-axis labels
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide legend
            },
            tooltip: {
                enabled: false, // Disable tooltips
            },
        },
        elements: {
            point: {
                radius: 0, // Hide points on the line
                hoverRadius: 0, // Hide points on hover
            },
        },
    };

    const [showMeetingInfo, setShowMeetingInfo] = useState(false);
    const handleShowMeetingInfo = () => {
        setShowMeetingInfo(!showMeetingInfo)
    }
    const handleCloseMeetingInfo = () => {
        setShowMeetingInfo(false)
    }


    const dataHiredSet = [250, 210, 340, 400, 380, 420];
    const lastDataIndex = dataHiredSet.length - 1;
    const pointRadiusArray = [];

    for (let i = 0; i < dataHiredSet.length; i++) {
        if (i === lastDataIndex) {
            pointRadiusArray.push(6);
        } else {
            pointRadiusArray.push(undefined);
        }
    }
    const lineHiredData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Monthly',
                data: dataHiredSet,
                borderColor: 'rgb(8, 143, 143)',
                backgroundColor: 'rgba(8, 143, 143 , .05)',
                fill: true,
                tension: 0.4, // Add tension for smooth curves
                pointRadius: pointRadiusArray,
                pointStyle: 'point',
            },
        ],
    };
    const lineHiredOptions = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false, // Remove vertical grid lines
                },
                ticks: {
                    display: false, // Hide x-axis labels (days)
                },
            },
            y: {
                grid: {
                    display: true,
                },
                ticks: {
                    display: true, // Show y-axis labels
                },
            },
        },
        plugins: {
            legend: {
                position: 'top', // Keep the legend labels
                labels: {
                    padding: 20, // Add padding to the legend labels
                    align: 'center',
                },
            },
            tooltip: {
                enabled: true, // Enable tooltips
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 1, // Hide points on the line
                hoverRadius: 5, // Hide points on hover
            },
        },
    };


    useEffect(() => {
        if (chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: lineData,
                options: lineOptions
            });

            const handleMouseMove = (e) => {
                const points = chartInstance.current.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

                // Show dots when hovering over the chart
                chartInstance.current.data.datasets.forEach((dataset, datasetIndex) => {
                    chartInstance.current.getDatasetMeta(datasetIndex).data.forEach((element, index) => {
                        if (points.length > 0 && points[0].element === element) {
                            element.hidden = false;
                        } else {
                            element.hidden = true;
                        }
                    });
                });

                // Update the chart
                chartInstance.current.update();
            };

            const handleMouseOut = (e) => {
                chartInstance.current.data.datasets.forEach((dataset, datasetIndex) => {
                    chartInstance.current.getDatasetMeta(datasetIndex).data.forEach((element, index) => {
                        element.hidden = true;
                    });
                });

                // Update the chart
                chartInstance.current.update();
            };

            ctx.canvas.addEventListener('mousemove', handleMouseMove);
            ctx.canvas.addEventListener('mouseout', handleMouseOut);

            return () => {
                ctx.canvas.removeEventListener('mousemove', handleMouseMove);
                ctx.canvas.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, [lineData, lineOptions]);


    return (
        <>
            {screenLoader ? <ScreenLoader /> : <div>
                <h2 className="section-head mb-4">{t("overview")}</h2>
                <div className="overview-card-wrapper mb-5">
                    {/* <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">Fund</h4>
                        <h3 className="overview-card-heading mb-0">Spent</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div> */}
                    <div className="overview-card active">
                        <div>
                            <h4 className="overview-card-subhead">This Month Revenue</h4>
                            <h3 className="overview-card-heading mb-0">$10,000</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    {/* <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">{t("income")}</h4>
                            <h3 className="overview-card-heading mb-0">{t("earned")}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div> */}
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">{t("clientJoined")}</h4>
                            <h3 className="overview-card-heading mb-0">{adminDashboard?.data?.numberOfClientsJoined}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">{t("vendorJoined")}</h4>
                            <h3 className="overview-card-heading mb-0">{adminDashboard?.data?.numberOfVendorsJoined}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Invoice Raised</h4>
                            <h3 className="overview-card-heading mb-0">{adminDashboard?.data?.totalJobsPosted}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Total Developer Joined</h4>
                            <h3 className="overview-card-heading mb-0">{adminDashboard?.data?.numberOfDevelopersJoined}</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                </div>

                <div>
                    <Row>
                        <Col xxl={6} lg={12} className="mb-4">
                            <div className="card-box h-100">
                                <h3 className="section-head pb-0 border-0 mb-4">Total Revenue</h3>
                                <div className="revenue-graph">
                                    <Line data={lineData} options={lineOptions} />
                                </div>
                            </div>
                        </Col>
                        <Col xxl={6} lg={12} className="mb-4">
                            <div className="card-box">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="section-head pb-0 border-0 mb-0">Activity Logs</h3>
                                </div>
                                <div className="">
                                    <div className="table-responsive activity-log-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Activity</th>
                                                    <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">Amazon posted a job</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">1 min ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">David Williams is shortlisted for figma ui job</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">2 mins ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">John Doe wants to edit his profile</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">3 mins ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">You have approved Smith application</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">10 mins ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">Rohit's timesheet has been approved by Amazon for AI Bot project</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">10:30 AM</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">Amazon posted a job</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">15 min ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">Rohit's timesheet has been approved by Amazon for AI Bot project</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">10:30 AM</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col lg={6} className="mb-4">
                            <div className="card-box h-100">
                                <h3 className="section-head pb-0 border-0 mb-4">To Do List</h3>
                                <div className="today-todo-wrapper">
                                    <span className="today-todo-number">
                                        3
                                    </span>
                                    <div>
                                        <p className="mb-1 font-14">Three to-do left!</p>
                                        <p className="font-13 mb-0">Let’s do this 💪</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div>
                                                <Form.Check type="checkbox" className="checkbox-custom" />
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                <p className="mb-2 font-14">Review it and create  an appliacation</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 today-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        <span>Today</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                        <img src={devImg} />
                                                        Rohit Sharma
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div>
                                                <Form.Check type="checkbox" className="checkbox-custom" />
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                <p className="mb-2 font-14">Review it and create  an appliacation</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 today-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        <span>Today</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                        <img src={devImg} />
                                                        Rohit Sharma
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div>
                                                <Form.Check type="checkbox" className="checkbox-custom" />
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                <p className="mb-2 font-14">Review it and create  an appliacation</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 today-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        <span>Today</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                        <img src={devImg} />
                                                        Rohit Sharma
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div>
                                                <Form.Check type="checkbox" className="checkbox-custom" />
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-semibold">Create job ad for upcoming marketing manager position</p>
                                                <p className="mb-2 font-14">Review it and create  an appliacation</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 tomorrow-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        <span>Tomorrow</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-1 assigned-user font-14">
                                                        <img src={devImg} />
                                                        Rohit Sharma
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button variant="transparent" className="link-btn pb-0 mt-2 font-14">View All to dos <span className="to-donumber">9+</span></Button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="mb-4">
                            <div className="card-box h-100">
                                <h3 className="section-head pb-0 border-0 mb-4">Upcoming Events</h3>
                                <div className="meeting-booking">
                                    <Calendar onChange={onChange} value={value} />
                                </div>
                                <div className="interview-scheduled mt-3">
                                    <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4">
                                        <div>
                                            <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                                            <p className="dev-name mb-2 font-14">
                                                <div className="me-1">
                                                    <img src={devImg} />
                                                </div>
                                                Pankaj Pundir
                                            </p>
                                            <p className="interview-timing mb-2 font-14">Tuesday 22-06-24, 22:00 - 23:00</p>
                                        </div>
                                        <div className="mb-2 status-interview">
                                            <span className="status-upcoming">Upcoming in 1hr</span>
                                        </div>
                                    </div>
                                    <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
                                        <div>
                                            <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                                            <p className="dev-name mb-2 font-14">
                                                <div className="me-1">
                                                    <img src={devImg} />
                                                </div>
                                                Pankaj Pundir
                                            </p>
                                            <p className="interview-timing mb-2 font-14">Tuesday 22-06-24, 22:00 - 23:00</p>
                                        </div>
                                        <div className="mb-2 status-interview">
                                            <span className="status-upcoming">Upcoming in 3hr</span>
                                        </div>
                                    </div>
                                    {/* <div onClick={handleShowMeetingInfo} className="cursor-pointer interview-wrapper position-relative mb-3 pt-4 mt-4">
                                        <div>
                                            <p className="interview-title mb-2">Interview Call for Figma to UI Project</p>
                                            <p className="dev-name mb-2 font-14">
                                                <div className="me-1">
                                                    <img src={devImg} />
                                                </div>
                                                Pankaj Pundir
                                            </p>
                                            <p className="interview-timing mb-2 font-14">Tuesday 22-06-24, 22:00 - 23:00</p>
                                        </div>
                                        <div className="mb-2 status-interview">
                                            <span className="status-upcoming">Upcoming in 3hr</span>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row className="mb-5">
                    <Col md={12}>
                        <div className="d-flex justify-content-between mb-4 ">
                            <h2 className="section-head-sub">{t("listOfClients")}</h2>
                        </div>
                        <div className="developers-list">
                            {adminDashboard?.data?.clients.length > 0 ? adminDashboard?.data?.clients.map((item, index) => {
                                return (
                                    <>
                                        <div className="developer-card client-card" onClick={() => handleClientCardClick(item?.id)} >
                                            <div className="user-imgbx ">
                                                <img src={item?.profile_picture ? item?.profile_picture : userImg} className="user-img" alt="developer" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name ">{item?.name}</h3>
                                                <p className="email-user">{item?.email}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            }) : <NoDataFound />}
                        </div>
                    </Col>
                </Row>
                <div>
                    <Row>
                        <Col md={6} className="mb-4">
                            <div className="mb-3">
                                <Row>
                                    <Col md={6}>
                                        <div className="status-card d-flex justify-content-between align-items-center">
                                            {/* <div className="icon-status-card">
                                                <GoProjectRoadmap />
                                            </div> */}
                                            <div>
                                                <h3>Total Projects</h3>
                                                <div>
                                                    <p className="status-text-card">{adminDashboard?.data?.totalJobsPosted} <span className="increase-text">+10</span></p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="graph-status">
                                                    <Line data={TotalProjectData} options={TotalProjectOptions} />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="status-card d-flex justify-content-between align-items-center">
                                            {/* <div className="icon-status-card">
                                                <FaCircleCheck />
                                            </div> */}
                                            <div>
                                                <h3>Completed Projects</h3>
                                                <div>
                                                    <p className="status-text-card">50 <span className="increase-text">+30</span></p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="graph-status">
                                                    <Line data={CompletedProjectData} options={CompletedProjectOptions} />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-box">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="section-head pb-0 border-0 mb-0">Projects</h3>
                                    <Form.Select className="common-field w-auto font-14">
                                        <option>Monthly</option>
                                        <option>Yearly</option>
                                    </Form.Select>
                                </div>
                                <div className="hired-dev-graph">
                                    <Line data={lineHiredData} options={lineHiredOptions} />
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="card-box">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="section-head pb-0 border-0 mb-0">Ongoing Projects</h3>
                                </div>
                                <div className="">
                                    <div className="table-responsive activity-log-table ongoing-project-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th className="white-nowrap">Project Name</th>
                                                    <th className="white-nowrap">Client Name</th>
                                                    <th className="white-nowrap">Hired Developers</th>
                                                    <th className="white-nowrap">Location</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Need Full stack MERN developer</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-stack">
                                                            <img src={devImg} />
                                                            <img src={devImg2} />
                                                            <img src={devImg3} />
                                                            <img src={devImg} />
                                                            <img src={devImg2} />
                                                            <span>7+</span>
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        Remote
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Node js developer</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-stack">
                                                            <img src={devImg} />
                                                            <img src={devImg3} />
                                                            <img src={devImg2} />
                                                            <img src={devImg} />
                                                            <img src={devImg3} />
                                                            <span>1+</span>
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        Hyrid
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Need Full stack MERN developer</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-stack">
                                                            <img src={devImg} />
                                                            <img src={devImg2} />
                                                            <img src={devImg3} />
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        Remote
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">React js developer</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-stack">
                                                            <img src={devImg} />
                                                            <img src={devImg3} />
                                                            <img src={devImg3} />
                                                            <img src={devImg2} />
                                                            <img src={devImg} />
                                                            <span>10+</span>
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        Remote
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Figma to UI</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-stack">
                                                            <img src={devImg} />
                                                            <img src={devImg2} />
                                                            <img src={devImg3} />
                                                            <img src={devImg2} />
                                                            <img src={devImg} />
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        On Site
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">AI Bot Project</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-stack">
                                                            <img src={devImg} />
                                                            <img src={devImg} />
                                                            <img src={devImg2} />
                                                            <img src={devImg3} />
                                                            <img src={devImg} />
                                                            <span>7+</span>
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        Remote
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">AI Bot Project</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-stack">
                                                            <img src={devImg} />
                                                            <img src={devImg2} />
                                                            <img src={devImg3} />
                                                            <img src={devImg} />
                                                            <img src={devImg} />
                                                            <span>7+</span>
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        Remote
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="section-head-sub mb-0">{t("listOfAssignedDevelopers")}</h2>
                    {adminDashboard?.data?.assignedDevelopers.length > 0 ? <div className="text-center mt-3">
                        <Link to={"/developer-list"} className="link-text-dark">{t("seeAll")}</Link>
                    </div> : ""}
                </div>
                <div className="developers-list mb-4">

                    {adminDashboard?.data?.assignedDevelopers.length > 0 ? adminDashboard?.data?.assignedDevelopers.map((item, index) => {
                        return (
                            <>
                                <div className="developer-card" onClick={() => handleCardClick(item?.developer_id)}>
                                    <div className="user-imgbx">
                                        <img src={item?.developer?.profile_picture ? item?.developer?.profile_picture : userImg} alt="developer" className="user-img" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="user-name">{item?.developer?.name}</h3>
                                        <p className="designation-user">{item?.developer?.developer_detail?.professional_title}</p>
                                        <p className="email-user">{item?.developer?.email}</p>
                                        <ul className="social-icons">
                                            <li>
                                                <Link to={`${item?.developer?.developer_detail?.github_url}`}><FaGithub /></Link>
                                            </li>
                                            <li>
                                                <Link to={`${item?.developer?.developer_detail?.linkedin_url}`}><FaLinkedin /></Link>
                                            </li>
                                            {/* <li>
                                                <Link to={`${item?.developer?.email}`}><MdEmail /></Link>
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )
                    })
                        : <NoDataFound />}
                </div>
                {/* <div className="card-box">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="section-head-sub mb-0">Recent Raised Invoices</h2>
                        <Link to={"/developer-list"} className="link-text-dark">{t("seeAll")}</Link>
                    </div>
                </div> */}
            </div >}
            <MeetingInfo show={showMeetingInfo} handleClose={handleCloseMeetingInfo} />
        </>
    )
}
export default AdminDashboard;
