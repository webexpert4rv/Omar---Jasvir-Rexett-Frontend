import React, { useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Line } from 'react-chartjs-2';
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { adminListAssignedDeveloper, adminListClients, getAdminDashboard, getSingleClient } from "../../redux/slices/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import NoDataFound from "../../components/atomic/NoDataFound"
import { useTranslation } from "react-i18next";



const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { listOfClients, adminDashboard, screenLoader } = useSelector(state => state.adminData)
    const { developerDetails } = useSelector(state => state.adminData)
    const navigate = useNavigate()
    const { t } = useTranslation()

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
    const joinedWeeklyClient = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Joined Client',
                data: [70, 40, 10, 20, 33, 44, 55],
                fill: false,
                borderColor: 'rgb(3, 117, 99)',
                lineTension: 0.4, // Set line tension to create a curved line
            },
        ],
    };
    const joinedMonthlyClient = {
        labels: ['1 May', '2 May', '3 May', '4 May', '5 May', '6 May', '7 May', '8 May', '9 May', '10 May', '11 May', '12 May'],
        datasets: [
            {
                label: 'Joined Client',
                data: [70, 40, 10, 20, 33, 44, 55, 11, 80, 100, 59, 33],
                fill: false,
                borderColor: 'rgb(3, 117, 99)',
                lineTension: 0.4, // Set line tension to create a curved line
            },
        ],
    };
    const joinedYearlyClient = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Joined Client',
                data: [70, 40, 10, 20, 33, 44, 55, 11, 80, 100, 59, 33],
                fill: false,
                borderColor: 'rgb(3, 117, 99)',
                lineTension: 0.4, // Set line tension to create a curved line
            },
        ],
    };
    const InvoiceRaisedWeekly = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Invoice Raised',
                data: [40, 10, 10, 20, 33, 44, 55],
                fill: false,
                borderColor: 'rgb(3, 117, 99)',
                lineTension: 0.4, // Set line tension to create a curved line
            },
        ],
    };
    const InvoiceRaisedMonthly = {
        labels: ['1 May', '2 May', '3 May', '4 May', '5 May', '6 May', '7 May', '8 May', '9 May', '10 May', '11 May', '12 May'],
        datasets: [
            {
                label: 'Invoice Raised',
                data: [70, 40, 10, 20, 33, 44, 55, 11, 80, 100, 59, 33],
                fill: false,
                borderColor: 'rgb(3, 117, 99)',
                lineTension: 0.4, // Set line tension to create a curved line
            },
        ],
    };
    const InvoiceRaisedYearly = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Invoice Raised',
                data: [70, 40, 10, 20, 33, 44, 55, 11, 80, 100, 59, 33],
                fill: false,
                borderColor: 'rgb(3, 117, 99)',
                lineTension: 0.4, // Set line tension to create a curved line
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        tooltip: {
            enabled: true,
            mode: 'index',
        },
    };

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
                            <h4 className="overview-card-subhead">{t("totalJobsPosted")}</h4>
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
                        <Col md={6} className="mb-4">
                            <div className="card-box h-100">
                                <h3 className="section-head pb-0 border-0 mb-4">Total Revenue</h3>
                                <Line data={data} options={options} />
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="card-box">
                                <Tab.Container defaultActiveKey="weekly_joined">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3 className="section-head pb-0 border-0 mb-0">Client Joined</h3>
                                        <Nav variant="pills" className="weekly-tabs mb-0">
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link d-flex align-items-center gap-2' eventKey="weekly_joined">Weekly</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link' eventKey="monthly_joined">Monthly</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link' eventKey="yearly_joined">Yearly</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                    <div>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="weekly_joined">
                                                <Line data={joinedWeeklyClient} options={options} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="monthly_joined">
                                                <Line data={joinedMonthlyClient} options={options} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="yearly_joined">
                                                <Line data={joinedYearlyClient} options={options} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Tab.Container>
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="card-box">
                                <Tab.Container defaultActiveKey="weekly_joined">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3 className="section-head pb-0 border-0 mb-0">Invoice Raised</h3>
                                        <Nav variant="pills" className="weekly-tabs mb-0">
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link d-flex align-items-center gap-2' eventKey="weekly_joined">Weekly</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link' eventKey="monthly_joined">Monthly</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link' eventKey="yearly_joined">Yearly</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                    <div>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="weekly_joined">
                                                <Line data={joinedWeeklyClient} options={options} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="monthly_joined">
                                                <Line data={joinedMonthlyClient} options={options} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="yearly_joined">
                                                <Line data={joinedYearlyClient} options={options} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Tab.Container>
                            </div>
                        </Col>
                        <Col md={6} className="mb-4">
                            <div className="card-box">
                                <Tab.Container defaultActiveKey="weekly_joined">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3 className="section-head pb-0 border-0 mb-0">Job Posted</h3>
                                        <Nav variant="pills" className="weekly-tabs mb-0">
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link d-flex align-items-center gap-2' eventKey="weekly_joined">Weekly</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link' eventKey="monthly_joined">Monthly</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className='weekly-tab-item'>
                                                <Nav.Link className='weekly-tab-link' eventKey="yearly_joined">Yearly</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                    <div>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="weekly_joined">
                                                <Line data={joinedWeeklyClient} options={options} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="monthly_joined">
                                                <Line data={joinedMonthlyClient} options={options} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="yearly_joined">
                                                <Line data={joinedYearlyClient} options={options} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Tab.Container>
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
                <h2 className="section-head-sub mb-4">{t("listOfAssignedDevelopers")}</h2>
                <div className="developers-list">

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
                {adminDashboard?.data?.assignedDevelopers.length > 0 ? <div className="text-center mt-3">
                    <Link to={"/developer-list"} className="link-text-dark">{t("seeAll")}</Link>
                </div> : ""}
            </div>}
        </>
    )
}
export default AdminDashboard;