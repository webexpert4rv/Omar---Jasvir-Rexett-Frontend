import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Col, Row, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import img from "../../assets/img/user-img.jpg"
import { useDispatch, useSelector } from "react-redux";
import { getDeveloperDashboard } from "../../redux/slices/developerDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import NoDataFound from "../../components/atomic/NoDataFound"
import { useTranslation } from "react-i18next";
import invoiceUnpaid from '../../assets/img/invoice_unpaid.png'
import invoicePaid from '../../assets/img/invoice_paid.png'
import companyLogo from '../../assets/img/aviox-logo.png';
import devImg from '../../assets/img/user-img.jpg';
import devImg2 from '../../assets/img/demo-img.jpg';
import devImg3 from '../../assets/img/laura.jpg';
import clientImg from '../../assets/img/amazon.png';
import { Line } from 'react-chartjs-2';
import userImg from '../../assets/img/user-img.jpg'
import Tour from "reactour";

const DeveloperDashboard = () => {
    const { developerDashboard, screenLoader } = useSelector(state => state.developerData)
    const dispatch = useDispatch()
    const [isTourOpen, setIsTourOpen] = useState(false);

    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getDeveloperDashboard())
    }, [])

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
            Amazon
        </Tooltip>
    )
    return (
        <>
            {screenLoader ? <ScreenLoader /> : <div>
                <h2 className="section-head mb-4">{t("overview")}</h2>
                <div className="overview-card-wrapper mb-5">
                    <div className="overview-card">
                        <div className="developers-list mb-md-0 mb-3">
                            <div className="developer-card shadow-none p-0 d-flex align-items-center gap-2">
                                <div className="user-imgbx mb-0">
                                    <img src={developerDashboard?.developerDetails?.profile_picture ? developerDashboard?.developerDetails?.profile_picture : img} alt="developer" className="user-img" />
                                </div>
                                <div className="text-start">
                                    <h3 className="user-name">{developerDashboard?.developerDetails?.name ? developerDashboard?.developerDetails?.name : "Dev"}</h3>
                                    <p className="designation-user">{developerDashboard?.developerDetails?.developer_detail?.professional_title}</p>
                                    <p className="email-user mb-0">{developerDashboard?.developerDetails?.email}</p>
                                    <ul className="social-icons">
                                        <li>
                                            {developerDashboard?.developerDetails?.developer_detail?.github_url ? <Link to={developerDashboard?.developerDetails?.developer_detail?.github_url}><FaGithub /></Link> : ""}
                                        </li>
                                        <li>
                                            {developerDashboard?.developerDetails?.developer_detail?.linkedin_url ? <Link to={developerDashboard?.developerDetails?.developer_detail?.linkedin_url}><FaLinkedin /></Link> : ""}
                                        </li>
                                        {/* <li>
                                        <Link to={developerDashboard?.developerDetails?.developer_detail?.resume}><MdEmail /></Link>
                                    </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overview-card active">
                        <div>
                            <h4 className="overview-card-subhead">{t("totalHours")}</h4>
                            <h3 className="overview-card-heading mb-0">{developerDashboard?.thisMonthHours ? (developerDashboard?.thisMonthHours).toFixed(2) : '0'} hrs</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">{t("thisWeekHours")}</h4>
                            <h3 className="overview-card-heading mb-0">{developerDashboard?.thisWeekHours ? (developerDashboard?.thisWeekHours).toFixed(2) : '0'} hrs</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">{t("activeProjects")}</h4>
                            <h3 className="overview-card-heading mb-0">0</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">{t("thisMonthHours")}</h4>
                            <h3 className="overview-card-heading mb-0">{developerDashboard?.totalHours ? (developerDashboard?.totalHours).toFixed(2) : '0'} hrs</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
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
                <Row>
                    <Col md={12}>
                        <div>
                            <h2 className="section-head-sub mb-4">{t("listOfClients")}</h2>

                            <div>
                                <div className="table-responsive">
                                    <table className="table time-table table-bordered table-ui-custom">
                                        <thead>
                                            <th className="time-table-head">
                                                {t("clientName")}
                                            </th>
                                            <th className="time-table-head">
                                                {t("contract")}
                                            </th>
                                            <th className="time-table-head">
                                                {t("totalHours")}
                                            </th>
                                            <th className="time-table-head">
                                                {t("location")}
                                            </th>
                                            <th className="time-table-head">
                                                {t("status")}
                                            </th>

                                        </thead>
                                        <tbody>

                                            {
                                                developerDashboard?.clientList?.length > 0 ? developerDashboard?.clientList?.map((item, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <tr>
                                                                <td className="time-table-data">{item.clientName}</td>
                                                                <td className="time-table-data">{item.contractType}</td>
                                                                <td className="time-table-data">{(item.totalHours).toFixed(2)} </td>
                                                                <td className="time-table-data">{item.location}</td>
                                                                <td className="time-table-data"><span className="status-finished">{item?.status ? "Finished" : "Progress"}</span></td>
                                                            </tr></React.Fragment>
                                                    )
                                                })

                                                    : <td colSpan={10}> <div className="simple-no-data"><NoDataFound /></div>  </td>
                                                    }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div>
                    <Row>
                        <Col md={6} className="mb-4">
                            <div className="card-box">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="section-head pb-0 border-0 mb-0">Recent Invoice</h3>
                                </div>
                                <div className="">
                                    <div className="table-responsive activity-log-table ongoing-project-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th className="white-nowrap">Developer Name</th>
                                                    <th className="white-nowrap">Project</th>
                                                    <th className="white-nowrap">Associated with</th>
                                                    <th className="white-nowrap">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-wrapper">
                                                            <img src={userImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        AI Bot Project
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={invoiceUnpaid} className="invoice-img-wrapper" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-wrapper white-nowrap">
                                                            <img src={userImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        AI Bot Project
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={invoiceUnpaid} className="invoice-img-wrapper" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-wrapper">
                                                            <img src={userImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        AI Bot Project
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={invoicePaid} className="invoice-img-wrapper" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-wrapper">
                                                            <img src={userImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        AI Bot Project
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={invoicePaid} className="invoice-img-wrapper" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-wrapper">
                                                            <img src={userImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        AI Bot Project
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={invoicePaid} className="invoice-img-wrapper" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <div className="developer-wrapper">
                                                            <img src={userImg} />
                                                            Rohit Sharma
                                                        </div>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        AI Bot Project
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={clientImg} className="project-client" />
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal">
                                                        <img src={invoicePaid} className="invoice-img-wrapper" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
                                                    <th className="white-nowrap">Total Hours</th>
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
                                                            100 hours
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
                                                            120 hours
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
                                                            90 hours
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
                                                            77 hours
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
                                                            67 hours
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
                                                            46 hours
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
                                                            30 hours
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
            </div>}
        </>
    )
}
export default DeveloperDashboard;