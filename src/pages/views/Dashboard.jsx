import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Cards from "../../components/atomic/Cards";
import OverViewCard from "../../components/atomic/OverViewCard";
import { useDispatch, useSelector } from "react-redux";
import { developerAssignList, getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import userImg from '../../assets/img/user-img.jpg'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import clientImg from '../../assets/img/amazon.png';
import companyLogo from '../../assets/img/aviox-logo.png';
import devImg from '../../assets/img/user-img.jpg';
import devImg2 from '../../assets/img/demo-img.jpg';
import devImg3 from '../../assets/img/laura.jpg';
import { Nav, Tab } from "react-bootstrap";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import NoDataFound from "../../components/atomic/NoDataFound";
import { useTranslation } from "react-i18next";
import invoiceUnpaid from '../../assets/img/invoice_unpaid.png'
import invoicePaid from '../../assets/img/invoice_paid.png'
import Calendar from "react-calendar";

const Dashboard = (cardDetails) => {
    const dispatch = useDispatch();
    const { assignedDeveloperList, screenLoader } = useSelector(state => state.clientData)
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [value, onChange] = useState(new Date());

    // const userName = localStorage.getItem("userName")
    useEffect(() => {
        dispatch(developerAssignList(1));
    }, [dispatch])

    const handleCardClick = (id) => {
        dispatch(getDeveloperDetails(id))
        navigate(`/client/client-single-developer/${id}`)
    }

    const handleRowClick = (id) => {
        dispatch(getDeveloperDetails(id))
        navigate(`/client/client-single-developer/${id}`)
    }

    const [showMeetingInfo, setShowMeetingInfo] = useState(false);
    const handleShowMeetingInfo = () => {
        setShowMeetingInfo(!showMeetingInfo)
    }
    const handleCloseMeetingInfo = () => {
        setShowMeetingInfo(false)
    }

   

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
    const companytext = (
        <Tooltip>
            Aviox Technologies Pvt Ltd
        </Tooltip>
    )
    return (
        <>
            <h2 className="section-head">{t("overview")} </h2>

            <p className="mb-4">{t("monitorAndManage")}</p>
            {screenLoader ? <ScreenLoader /> : <>
                <div className="overview-card-wrapper mb-5">
                    <OverViewCard head={t("fund")} value="Spent" />
                    <OverViewCard head={t("earnedBack")} value={assignedDeveloperList?.earned_back_hours ? assignedDeveloperList?.earned_back_hours : '0'} />
                    <OverViewCard head={t("jobPosted")} value={assignedDeveloperList?.total_jobs_posted ? assignedDeveloperList?.total_jobs_posted : "0"} />
                    <OverViewCard head={t("developerAssigned")} value={assignedDeveloperList?.total_developer_count ? assignedDeveloperList?.total_developer_count : '0'} />
                </div>

                <div>
                    <Row>
                        <Col xxl={6} className="mb-4">
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
                                                    <p className="status-text-card">147 <span className="increase-text">+10</span></p>
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
                                                    <td className="time-table-data text-start font-14 fw-normal">Posted a job named "Figma to UI"</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">1 min ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">David Williams is shortlisted for figma ui job</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">2 mins ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">You created a public holiday named "Good Friday"</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">3 mins ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">You have approved Smith's timesheet</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">10 mins ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">You posted a job</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">15 min ago</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-05-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal">You have paid invoice for AI Bot project</td>
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

                <Tab.Container className="w-100" defaultActiveKey="list-view">
                    <div className="d-flex justify-content-between mb-3 pb-2 border-bottom-grey">
                        <h3 className="section-head-sub mb-0">{t("listOfAssignedDevelopers")}</h3>
                        <Nav variant="pills" className="document-view-pill">
                            <Nav.Item className="document-view-item">
                                <Nav.Link className="document-view-link" eventKey="list-view"><FaListUl /></Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="document-view-item">
                                <Nav.Link className="document-view-link" eventKey="grid-view"><IoGrid /></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    {assignedDeveloperList?.assigned_developers?.length > 0 ?
                        <Tab.Content>
                            <Tab.Pane eventKey="list-view">
                                <div className="table-responsive">
                                    <table className="table developer-table">
                                        <thead>
                                            <tr>
                                                <th><span>{t("developerName")}</span></th>
                                                <th><span>{t("designation")}</span></th>
                                                <th><span>{t("email")}</span></th>
                                                {/* <th><span>Connects</span></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignedDeveloperList?.assigned_developers?.map((item, index) => {
                                                return (
                                                    <>
                                                        <tr onClick={() => handleRowClick(item?.developer?.id)}>
                                                            <td>
                                                                <span className="d-flex align-items-center gap-3">
                                                                    <img src={item?.developer?.profile_picture ? item?.developer?.profile_picture : userImg} />
                                                                    <h3 className="user-name color-121212 mb-0">{item?.developer?.name}</h3>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    <p className="designation-user color-121212 mb-0">{item?.developer?.developer_detail?.professional_title}</p>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    <p className="designation-user color-121212 mb-0">{item?.developer?.email}</p>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                            </Tab.Pane>
                            <Tab.Pane eventKey="grid-view" >
                                <div className="developers-list pt-3 mb-4" >

                                    {assignedDeveloperList?.assigned_developers?.map((item, index) => {
                                        return (
                                            <>
                                                <Cards item={item} handleCardClick={() => handleCardClick(item?.developer?.id)} />
                                            </>
                                        )
                                    })
                                    }
                                </div>
                            </Tab.Pane>
                            <>
                                {assignedDeveloperList?.assigned_developers?.length > 5 ? <div className="text-center mt-5">
                                    <Link to={"/hired-developers"} className="link-text-dark">{t("seeAll")}</Link>
                                </div> : ""}
                            </>
                        </Tab.Content>
                        : <div className="simple-no-data"><NoDataFound /></div>}
                </Tab.Container>

                <div>
                    <Row>
                    
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
            </>}
        </>
    )
}
export default Dashboard;