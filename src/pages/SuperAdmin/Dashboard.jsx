import React from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Button, Col, Row } from "react-bootstrap";
import { IoTrendingUpSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
const SuperDashboard = () => {
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
    return (
        <>
            <div>

                <h2 className="section-head mb-4">Overview</h2>
                <div className="overview-card-wrapper mb-5">
                    <div className="overview-card active">
                        <div>
                            <h4 className="overview-card-subhead">This Month Revenue</h4>
                            <h3 className="overview-card-heading mb-0">$10,000</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Client Joined</h4>
                            <h3 className="overview-card-heading mb-0">80</h3>
                        </div>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Active Plans</h4>
                            <h3 className="overview-card-heading mb-0">03</h3>
                        </div>
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
                        <Col lg={6} className="mb-4">
                            <div className="card-box">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="section-head pb-0 border-0 mb-0">Recently Joined Clients</h3>
                                </div>
                                <div className="">
                                    <div className="table-responsive activity-log-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th className="white-nowrap">Phone Number</th>
                                                    <th className="white-nowrap">Active plan</th>
                                                    <th className="white-nowrap">Date joined</th>
                                                    <th className="white-nowrap">Plan Expire</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Apex Solutions Ltd.</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">contact@apexsolutions.com</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">(555) 123-4567</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Basic Plan (Monthly)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">01-07-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">01-08-2024</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Quantum Dynamics Corp.</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">info@quantumdynamics.com</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">(555) 234-5678</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Standard Plan (Monthly)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">28-06-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">28-07-2024</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Stellar Synergy LLC</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">support@stellarsynergy.com</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">(555) 345-6789</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Enterprise Plan (Annual)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">27-06-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">27-06-2025</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Horizon Enterprises Inc.</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">inquiry@horizonenterprises.com</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">(555) 456-7890</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Basic Plan (Monthly)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">25-06-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">25-07-2024</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Vertex Ventures</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">contact@vertexventures.com</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">(555) 567-8901</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Basic Plan (Monthly)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">24-06-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">24-07-2024</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Radiant Technologies Co.</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">info@radianttech.com</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">(555) 678-9012</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Standard Plan (Annual)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-06-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">20-06-2025</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Pinnacle Pathways Inc.</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">inquiry@pinnaclepathways.com</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">(555) 890-1234</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Enterprise Plan (Annual)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">18-06-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">18-06-2025</td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">BlueWave Systems LLC</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">contact@bluewavesystems.com</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">(555) 901-2345</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Standard Plan (Monthly)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">15-06-2024</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">15-07-2024</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="mb-4">
                            <div className="card-box">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="section-head pb-0 border-0 mb-0">Subscription Plans</h3>
                                </div>
                                <div className="">
                                    <div className="table-responsive activity-log-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th className="white-nowrap">Plan name</th>
                                                    <th>Price</th>
                                                    <th className="white-nowrap">Features</th>
                                                    <th className="white-nowrap">Status</th>
                                                    <th className="white-nowrap">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Trail</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Free (30 days)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Full access</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Button className="arrow-btn info-arrow">
                                                                <FaPencil />
                                                            </Button>
                                                            <Button className="arrow-btn danger-arrow">
                                                                <FaTrash />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Basic</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">$9.99/mo</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Button className="arrow-btn info-arrow">
                                                                <FaPencil />
                                                            </Button>
                                                            <Button className="arrow-btn danger-arrow">
                                                                <FaTrash />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Standard</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">$19.99/mo</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Button className="arrow-btn info-arrow">
                                                                <FaPencil />
                                                            </Button>
                                                            <Button className="arrow-btn danger-arrow">
                                                                <FaTrash />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Enterprise</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">$19.99/mo</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <Button className="arrow-btn info-arrow">
                                                                <FaPencil />
                                                            </Button>
                                                            <Button className="arrow-btn danger-arrow">
                                                                <FaTrash />
                                                            </Button>
                                                        </div>
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
            </div>
        </>
    )
}
export default SuperDashboard;