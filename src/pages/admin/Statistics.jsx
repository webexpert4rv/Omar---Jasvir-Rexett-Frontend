import React, { useEffect, useRef } from "react";
import { Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { IoTrendingUpSharp } from "react-icons/io5";
const Statistics = () => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
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

    return (
        <>
            <div>
                <h2 className="section-head mb-4">Statistics</h2>
                <Row className="mb-4">
                    <Col xxl={4}>
                        <div className="revenue-card total-revenue-card active">
                            <div className="mb-3">
                                <h4 className="overview-card-subhead mb-2">Total Revenue</h4>
                                <h3 className="overview-card-heading mb-0">$1,00,000</h3>
                            </div>
                            <Row>
                                <Col md={6}>
                                    <div className="revenue-card monthly-card">
                                        <div>
                                            <h4 className="overview-card-subhead">This Month Revenue</h4>
                                            <h3 className="overview-card-heading mb-0">$9,000</h3>
                                        </div>
                                        <span className="over-icon"><IoTrendingUpSharp /></span>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="revenue-card monthly-card">
                                        <div>
                                            <h4 className="overview-card-subhead">Last Month Revenue</h4>
                                            <h3 className="overview-card-heading mb-0">$9,000</h3>
                                        </div>
                                        <span className="over-icon"><IoTrendingUpSharp /></span>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                    </Col>
                    <Col xxl={8} lg={12} className="mb-4">
                        <Row>
                            <Col md={3} className="mb-3">
                                <div className="overview-card">
                                    <div>
                                        <h4 className="overview-card-subhead">Client Joined</h4>
                                        <h3 className="overview-card-heading mb-0">100</h3>
                                    </div>
                                    <span className="over-icon"><IoTrendingUpSharp /></span>
                                </div>
                            </Col>
                            <Col md={3} className="mb-3">
                                <div className="overview-card">
                                    <div>
                                        <h4 className="overview-card-subhead">Vendor Joined</h4>
                                        <h3 className="overview-card-heading mb-0">20</h3>
                                    </div>
                                    <span className="over-icon"><IoTrendingUpSharp /></span>
                                </div>
                            </Col>
                            <Col md={3} className="mb-3">
                                <div className="overview-card">
                                    <div>
                                        <h4 className="overview-card-subhead">Invoice Raised</h4>
                                        <h3 className="overview-card-heading mb-0">100</h3>
                                    </div>
                                    <span className="over-icon"><IoTrendingUpSharp /></span>
                                </div>
                            </Col>
                            <Col md={3} className="mb-3">
                                <div className="overview-card">
                                    <div>
                                        <h4 className="overview-card-subhead">Developers Joined</h4>
                                        <h3 className="overview-card-heading mb-0">30</h3>
                                    </div>
                                    <span className="over-icon"><IoTrendingUpSharp /></span>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="status-card d-flex justify-content-between align-items-center">
                                    {/* <div className="icon-status-card">
                                                <GoProjectRoadmap />
                                            </div> */}
                                    <div>
                                        <h3>Total Projects</h3>
                                        <div>
                                            <p className="status-text-card">120 <span className="increase-text">+10</span></p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="graph-status">
                                            <Line data={TotalProjectData} options={TotalProjectOptions} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="status-card d-flex justify-content-between align-items-center">
                                    {/* <div className="icon-status-card">
                                                <FaCircleCheck />
                                            </div> */}
                                    <div>
                                        <h3>On Going Projects</h3>
                                        <div>
                                            <p className="status-text-card">50</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="graph-status">
                                            <Line data={CompletedProjectData} options={CompletedProjectOptions} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="status-card d-flex justify-content-between align-items-center">
                                    {/* <div className="icon-status-card">
                                                <FaCircleCheck />
                                            </div> */}
                                    <div>
                                        <h3>Completed Projects</h3>
                                        <div>
                                            <p className="status-text-card">70</p>
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
                    </Col>
                </Row>
                <Tab.Container id="left-tabs-example" defaultActiveKey="revenue-stat">
                    <div className="card-box mb-4 p-3">
                        <div className="d-flex justify-content-center mb-4">
                            <Nav variant="pills" className="weekly-tabs mb-0">
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link d-flex align-items-center gap-2' eventKey="revenue-stat">Revenue</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="client-stats">Clients</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="dev-stats">Developers</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="invoice-stats">Invoices</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="project-stats">Projects</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="revenue-stat">
                                <Row>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <h3 className="section-head pb-0 border-0 mb-4">Total Revenue (Monthly)</h3>
                                            <div className="revenue-graph">
                                                <Line data={lineData} options={lineOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3 className="section-head pb-0 border-0 mb-0">Total Revenue (Yearly)</h3>
                                            </div>
                                            <div className="hired-dev-graph">
                                                <Line data={lineHiredData} options={lineHiredOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="client-stats">
                                <Row>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <h3 className="section-head pb-0 border-0 mb-4">Total Clients(Monthly)</h3>
                                            <div className="revenue-graph">
                                                <Line data={lineData} options={lineOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3 className="section-head pb-0 border-0 mb-0">Total Clients(Yearly)</h3>
                                            </div>
                                            <div className="hired-dev-graph">
                                                <Line data={lineHiredData} options={lineHiredOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="dev-stats">
                                <Row>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <h3 className="section-head pb-0 border-0 mb-4">Total Developers(Monthly)</h3>
                                            <div className="revenue-graph">
                                                <Line data={lineData} options={lineOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3 className="section-head pb-0 border-0 mb-0">Total Developers(Yearly)</h3>
                                            </div>
                                            <div className="hired-dev-graph">
                                                <Line data={lineHiredData} options={lineHiredOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="invoice-stats">
                                <Row>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <h3 className="section-head pb-0 border-0 mb-4">Total Invoices(Monthly)</h3>
                                            <div className="revenue-graph">
                                                <Line data={lineData} options={lineOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3 className="section-head pb-0 border-0 mb-0">Total Invoices(Yearly)</h3>
                                            </div>
                                            <div className="hired-dev-graph">
                                                <Line data={lineHiredData} options={lineHiredOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="invoice-stats">
                                <Row>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <h3 className="section-head pb-0 border-0 mb-4">Total Projects(Monthly)</h3>
                                            <div className="revenue-graph">
                                                <Line data={lineData} options={lineOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xxl={6} lg={12} className="mb-4">
                                        <div className="card-box h-100">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3 className="section-head pb-0 border-0 mb-0">Total Projects(Yearly)</h3>
                                            </div>
                                            <div className="hired-dev-graph">
                                                <Line data={lineHiredData} options={lineHiredOptions} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </div>
        </>
    )
}
export default Statistics;