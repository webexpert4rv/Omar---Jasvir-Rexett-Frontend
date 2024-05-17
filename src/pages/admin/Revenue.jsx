import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { IoTrendingUpSharp } from "react-icons/io5";
import { useDispatch } from "react-redux"
import { Bar } from 'react-chartjs-2';
import { getRevenue } from "../../redux/slices/vendorDataSlice";
import { useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import userImage from "../../assets/img/user-img.jpg"
import companyLogo from "../../assets/img/amazon.png"
import associateLogo from "../../assets/img/aviox-logo.png"
import { IoSearch } from "react-icons/io5";
import { HiDownload } from "react-icons/hi";
import InvoicePaidModal from "./Modals/InvoicePaid";
import timeSheetIcon from '../../assets/img/timesheet-icon.svg';
import invoiceIcon from '../../assets/img/invoice-icon.svg'

const Revenue = () => {
    const minOffset = 0;
    const maxOffset = 10;
    const dispatch = useDispatch()
    const { revenueData } = useSelector(state => state.vendorData)
    const [yearOptionsValue, setYearOptionsValue] = useState([]);
    const thisYear = new Date().getFullYear();
    const { t } = useTranslation()
    const [showInvoicePaidModal, setShowInvoicePaidModal] = useState(false);
    const handleInvoicePaid = () => {
        setShowInvoicePaidModal(true);
    }
    const handleCloseInvoicePaid = () => {
        setShowInvoicePaidModal(false);
    }
    const downloadinvoice = (
        <Tooltip id="tooltip">
            Download Invoice
        </Tooltip>
    );
    const downloadtimesheet = (
        <Tooltip id="tooltip">
            Download Timesheet
        </Tooltip>
    );
    const companyname = (

        <Tooltip id="tooltip">
            Aviox Technologies Pvt Ltd
        </Tooltip>
    );

    useEffect(() => {
        const optionsValue = [];
        for (let i = minOffset; i <= maxOffset; i++) {
            const year = thisYear - i;
            optionsValue.push(year);
        }
        setYearOptionsValue(optionsValue);
    }, []);

    const monthlyData = (data) => {
        let newData = []
        data?.forEach((item) => {
            newData.push(item.totalAmount)
        })

        return newData
    }

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: monthlyData(revenueData?.monthly_revenue),
                borderColor: 'blue',
                backgroundColor: '#180049',
            },
        ],
    };
    useEffect(() => {
        dispatch(getRevenue())
    }, [])

    const handleFilter = (e, selected) => {
        let filter = {
            [selected]: e
        }

        dispatch(getRevenue(filter));
    }
    return (
        <>
            {/* <div className="overview-card-wrapper mb-5">
                <div className="overview-card active">
                    <div>
                        <h4 className="overview-card-subhead">Income</h4>
                        <h3 className="overview-card-heading mb-0">Earned</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div> */}
            <Tab.Container defaultActiveKey="revenue">
                <Nav variant="pills" className="weekly-tabs mb-4">
                    <Nav.Item className='weekly-tab-item'>
                        <Nav.Link className='weekly-tab-link d-flex align-items-center gap-2' eventKey="revenue">Stats</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='weekly-tab-item'>
                        <Nav.Link className='weekly-tab-link' eventKey="invoice">Invoice</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="revenue">
                        <Form className="mb-4 d-block filter-section">
                            <div className="d-flex gap-3">
                                <div className="d-flex gap-3">
                                    <div>
                                        <Form.Label className="common-label">{t("filterByMonth")}</Form.Label>
                                        <Form.Control type="month" className="filter-field shadow-none" onChange={(e) => handleFilter(e.target.value.split('-')[1], "month")}></Form.Control>
                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    <div>
                                        <Form.Label className="common-label">{t("filterByYear")}</Form.Label>
                                        <select className="filter-field form-select shadow-none form-control" onChange={(e) => handleFilter(e.target.value, "year")}>
                                            <option disabled selected >{t("selectYear")}</option>
                                            {
                                                yearOptionsValue.map((item) => {
                                                    return (
                                                        <>
                                                            <option value={item}>{item}</option>

                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Form>
                        <div className="card-box">
                            <Row>
                                <Col md={6}>
                                    <div>
                                        {/* <h2 className="section-head-sub">Statistic Revenue</h2> */}
                                        <Bar data={data} />
                                    </div>
                                </Col>
                                {/* <Col md={6}>
                                    <div>
                                        <h2 className="section-head-sub">Statistic Income Earned</h2>
                                        <Bar data={incomeData} options={options} />
                                    </div>
                                </Col> */}
                            </Row>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="invoice">

                        <div className="card-box">
                            <Tab.Container id="left-tabs-example" defaultActiveKey="raise-by-devs">
                                <div className="d-flex justify-content-center">
                                    <Nav variant="pills" className="weekly-tabs mb-0">
                                        <Nav.Item className='weekly-tab-item'>
                                            <Nav.Link className='weekly-tab-link d-flex align-items-center gap-2' eventKey="raise-by-devs">Raise By Devs/Vendors</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className='weekly-tab-item'>
                                            <Nav.Link className='weekly-tab-link' eventKey="raise-to-clients">Raise To Clients</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <Tab.Content>
                                    <Tab.Pane eventKey="raise-by-devs">
                                        <div className="filter-section d-lg-flex align-items-center mt-3 justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Week</option>
                                                        <option>Week 1</option>
                                                        <option>Week 2</option>
                                                        <option>Week 3</option>
                                                        <option>Week 4</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Month</option>
                                                        <option>January</option>
                                                        <option>Feburary</option>
                                                        <option>March</option>
                                                        <option>April</option>
                                                        <option>May</option>
                                                        <option>June</option>
                                                        <option>July</option>
                                                        <option>August</option>
                                                        <option>September</option>
                                                        <option>October</option>
                                                        <option>November</option>
                                                        <option>December</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Year</option>
                                                        <option>2024</option>
                                                        <option>2023</option>
                                                        <option>2022</option>
                                                        <option>2021</option>
                                                        <option>2020</option>
                                                        <option>2019</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Developer</option>
                                                        <option>Rohit Sharma</option>
                                                        <option>Rohit Sharma</option>
                                                        <option>Rohit Sharma</option>
                                                        <option>Rohit Sharma</option>
                                                        <option>Rohit Sharma</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Project</option>
                                                        <option>Figma to UI</option>
                                                        <option>Figma to UI</option>
                                                        <option>Figma to UI</option>
                                                        <option>Figma to UI</option>
                                                        <option>Figma to UI</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Invoice Status</option>
                                                        <option>Paid</option>
                                                        <option>Unpaid</option>
                                                        <option>Cancelled</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Button className="main-btn py-1_5 px-4" variant="transparent">Filter</Button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-3">
                                                <Form.Control
                                                    type="text"
                                                    className="common-field font-14 shadow-none"
                                                    placeholder="Enter Keyword..."
                                                />
                                                <Button variant="transparent" className="main-btn px-3 search-btn">
                                                    <IoSearch />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table time-table table-bordered table-ui-custom">
                                                <thead>
                                                    <th className="time-table-head text-start">
                                                        Developer Name
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Project
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Client Name
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Total Hours
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Invoice Month
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Associated with
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Invoice Status
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Project Status
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Action
                                                    </th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">AI Bot Project</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Unpaid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={timeSheetIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">Figma to UI</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Paid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={timeSheetIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">Figma to UI</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start">
                                                            <OverlayTrigger placement="bottom" overlay={companyname}>
                                                                <div>
                                                                    <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                                                                        <img src={associateLogo} className="user-img" />
                                                                    </div>
                                                                </div>
                                                            </OverlayTrigger>
                                                        </td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Unpaid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={timeSheetIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">Figma to UI</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Paid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={timeSheetIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">Figma to UI</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Paid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={timeSheetIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">Figma to UI</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Unpaid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={timeSheetIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="raise-to-clients">
                                        <div className="filter-section d-lg-flex align-items-center mt-3 justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Week</option>
                                                        <option>Week 1</option>
                                                        <option>Week 2</option>
                                                        <option>Week 3</option>
                                                        <option>Week 4</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Month</option>
                                                        <option>January</option>
                                                        <option>Feburary</option>
                                                        <option>March</option>
                                                        <option>April</option>
                                                        <option>May</option>
                                                        <option>June</option>
                                                        <option>July</option>
                                                        <option>August</option>
                                                        <option>September</option>
                                                        <option>October</option>
                                                        <option>November</option>
                                                        <option>December</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Year</option>
                                                        <option>2024</option>
                                                        <option>2023</option>
                                                        <option>2022</option>
                                                        <option>2021</option>
                                                        <option>2020</option>
                                                        <option>2019</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Developer</option>
                                                        <option>Rohit Sharma</option>
                                                        <option>Rohit Sharma</option>
                                                        <option>Rohit Sharma</option>
                                                        <option>Rohit Sharma</option>
                                                        <option>Rohit Sharma</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Select Project</option>
                                                        <option>Figma to UI</option>
                                                        <option>Figma to UI</option>
                                                        <option>Figma to UI</option>
                                                        <option>Figma to UI</option>
                                                        <option>Figma to UI</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Form.Select className="time-filter-select shadow-none">
                                                        <option>Invoice Status</option>
                                                        <option>Paid</option>
                                                        <option>Unpaid</option>
                                                        <option>Reject</option>
                                                    </Form.Select>
                                                </div>
                                                <div>
                                                    <Button className="main-btn py-1_5 px-4" variant="transparent">Filter</Button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-3">
                                                <Form.Control
                                                    type="text"
                                                    className="common-field font-14 shadow-none"
                                                    placeholder="Enter Keyword..."
                                                />
                                                <Button variant="transparent" className="main-btn px-3 search-btn">
                                                    <IoSearch />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table time-table table-bordered table-ui-custom">
                                                <thead>
                                                    <th className="time-table-head text-start">
                                                        Client Name
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Project Name
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Developer Name
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Total Hours
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Invoice Month
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Associated with
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Invoice Status
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Project Status
                                                    </th>
                                                    <th className="time-table-head text-start">
                                                        Action
                                                    </th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">Figma to UI</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Unpaid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">Figma to UI</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start"><p className="associate-text font-14 mt-2 mb-2"><span className="associate mb-1 font-14">Individual</span></p></td>
                                                        <td className="time-table-data text-start"><span className="status-progress">Unpaid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={companyLogo} className="user-img" />
                                                                </div>
                                                                Amazon
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">Figma to UI</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                    <img src={userImage} className="user-img" />
                                                                </div>
                                                                Rohit Sharma
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start">140 hrs</td>
                                                        <td className="time-table-data text-start">Jan 2024</td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-block white-nowrap text-overflow">
                                                                <div className="user-imgbx d-inline-block me-2 application-imgbx mx-0 mb-0">
                                                                    <img src={associateLogo} className="user-img" />
                                                                </div>
                                                                Aviox Technologies Pvt Ltd.
                                                            </div>
                                                        </td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Paid</span></td>
                                                        <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                                                        <td className="time-table-data text-start">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                                    <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                                                        <img src={invoiceIcon} />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <InvoicePaidModal show={showInvoicePaidModal} handleClose={handleCloseInvoicePaid} />
        </>
    )
}
export default Revenue;