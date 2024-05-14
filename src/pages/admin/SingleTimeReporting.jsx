import React from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import userImage from "../../assets/img/user-img.jpg"
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
const TimeReportingDetail = () => {
    return (
        <>
            <section className="time-reporting-detail">
                <div className="filter-section d-lg-flex align-items-center mb-4 justify-content-between">
                    <div className="d-flex align-items-center gap-2 mb-lg-0 mb-3 flex-wrap">
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
                <div className="detail-view">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="hired-developers">
                        <div className="card-box mb-4 p-3">
                            <div className="detail-view d-flex gap-3 flex-wrap align-items-center justify-content-between flex-wrap">
                                <div className='client-info p-0 bg-transparent'>
                                    <h3 className="font-15 fw-bold mb-2">Client Name</h3>
                                    <p className='client-name-heading mb-0'><img src={userImage} /> Pankaj Pundir</p>
                                </div>
                                <div className='client-info p-0 bg-transparent'>
                                    <h3 className="font-15 fw-bold mb-2">Total Hours</h3>
                                    <p className='client-name-heading d-flex gap-1 mb-0 align-items-center'><span className="d-flex align-items-center gap-1"><FiCalendar />Jan 2024</span>/<span className="d-flex align-items-center gap-1">Week 1</span> - <span className="d-flex align-items-center gap-1"><FaRegClock /> 140 hrs</span></p>
                                </div>
                                <div className='client-info p-0 bg-transparent'>
                                    <h3 className="font-15 fw-bold mb-2">Invoice</h3>
                                    <p className='client-name-heading d-flex gap-1 mb-0 align-items-center'>
                                        <span className="status-progress">Unpaid</span>
                                    </p>
                                </div>
                                <div className='client-info p-0 bg-transparent'>
                                    <h3 className="font-15 fw-bold mb-2">Project Status</h3>
                                    <p className='client-name-heading d-flex gap-1 mb-0 align-items-center'>
                                        <span className="status-progress">Unpaid</span>
                                    </p>
                                </div>
                                <div className='client-info p-0 bg-transparent'>
                                    <h3 className="font-15 fw-bold mb-2">Location</h3>
                                    <p className='client-name-heading d-flex gap-1 mb-0 align-items-center'>
                                        Remote
                                    </p>
                                </div>
                                <div>
                                    <p className="client-name-heading mb-0"></p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <Nav variant="pills" className="weekly-tabs mb-0">
                                    <Nav.Item className='weekly-tab-item'>
                                        <Nav.Link className='weekly-tab-link d-flex align-items-center gap-2' eventKey="hired-developers">Hired Developers <span className="number">7</span></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='weekly-tab-item'>
                                        <Nav.Link className='weekly-tab-link' eventKey="time-reporting">Time Reporting</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="hired-developers">
                                <div>
                                    <div className="developers-list">
                                        <div className="developer-card">
                                            <div className="user-imgbx">
                                                <img src={userImage} className="user-img" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">Sandeep</h3>
                                                <p className="designation-user">Web Developers</p>
                                                <p className="email-user">dev@rexett.com</p>
                                                <ul className="social-icons">
                                                    <li>
                                                        <a href=""><FaLinkedinIn /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="developer-card">
                                            <div className="user-imgbx">
                                                <img src={userImage} className="user-img" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">Sandeep</h3>
                                                <p className="designation-user">Web Developers</p>
                                                <p className="email-user">dev@rexett.com</p>
                                                <ul className="social-icons">
                                                    <li>
                                                        <a href=""><FaLinkedinIn /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="developer-card">
                                            <div className="user-imgbx">
                                                <img src={userImage} className="user-img" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">Sandeep</h3>
                                                <p className="designation-user">Web Developers</p>
                                                <p className="email-user">dev@rexett.com</p>
                                                <ul className="social-icons">
                                                    <li>
                                                        <a href=""><FaLinkedinIn /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="developer-card">
                                            <div className="user-imgbx">
                                                <img src={userImage} className="user-img" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">Sandeep</h3>
                                                <p className="designation-user">Web Developers</p>
                                                <p className="email-user">dev@rexett.com</p>
                                                <ul className="social-icons">
                                                    <li>
                                                        <a href=""><FaLinkedinIn /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="developer-card">
                                            <div className="user-imgbx">
                                                <img src={userImage} className="user-img" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">Sandeep</h3>
                                                <p className="designation-user">Web Developers</p>
                                                <p className="email-user">dev@rexett.com</p>
                                                <ul className="social-icons">
                                                    <li>
                                                        <a href=""><FaLinkedinIn /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="developer-card">
                                            <div className="user-imgbx">
                                                <img src={userImage} className="user-img" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">Sandeep</h3>
                                                <p className="designation-user">Web Developers</p>
                                                <p className="email-user">dev@rexett.com</p>
                                                <ul className="social-icons">
                                                    <li>
                                                        <a href=""><FaLinkedinIn /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="developer-card">
                                            <div className="user-imgbx">
                                                <img src={userImage} className="user-img" />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="user-name">Sandeep</h3>
                                                <p className="designation-user">Web Developers</p>
                                                <p className="email-user">dev@rexett.com</p>
                                                <ul className="social-icons">
                                                    <li>
                                                        <a href=""><FaLinkedinIn /></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="time-reporting">
                                <div>
                                    <div className="table-responsive">
                                        <table className="table time-table table-bordered table-ui-custom">
                                            <thead>
                                                <th className="time-table-head">
                                                    Developer Name
                                                </th>
                                                <th className="time-table-head">
                                                    Total Hours
                                                </th>
                                                <th className="time-table-head">
                                                    Total Hours
                                                </th>
                                                <th className="time-table-head">
                                                    Total Hours
                                                </th>
                                                <th className="time-table-head">
                                                    Action
                                                </th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="time-table-data">Rohit Sharma</td>
                                                    <td className="time-table-data">Rohit Sharma</td>
                                                    <td className="time-table-data">Rohit Sharma</td>
                                                    <td className="time-table-data">Rohit Sharma</td>
                                                    <td className="time-table-data">Rohit Sharma</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </section>
        </>
    )
}
export default TimeReportingDetail;