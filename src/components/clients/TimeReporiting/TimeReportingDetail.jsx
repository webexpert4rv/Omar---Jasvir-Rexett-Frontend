import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import userImage from "../../../assets/img/user-img.jpg"
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
const TimeReportingDetail = () => {
    return (
        <>
            <section className="time-reporting-detail">
                <div className="filter-section d-flex align-items-center mb-4 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                        <div>
                            <Form.Select className="time-filter-select shadow-none">
                                <option>Select Client</option>
                                <option>Amazon</option>
                                <option>Google</option>
                                <option>Infosys</option>
                                <option>Aviox</option>
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
                    <Tab.Container id="left-tabs-example" defaultActiveKey="week-first">
                        <div className="card-box mb-4 p-3">
                            <div className="detail-view d-flex gap-3 flex-wrap align-items-center justify-content-between">
                                <div className='client-info p-0 bg-transparent'>
                                    <p className='client-name-heading mb-0'><img src={userImage} /> Pankaj Pundir</p>
                                </div>
                                <div className='client-info p-0 bg-transparent'>
                                    <p className='client-name-heading d-flex gap-1 mb-0 align-items-center'><span className="d-flex align-items-center gap-1"><FiCalendar />Jan 2024</span> - <span className="d-flex align-items-center gap-1"><FaRegClock /> 140 hrs</span></p>
                                </div>
                                <div className='client-info p-0 bg-transparent'>
                                    <p className='client-name-heading d-flex gap-1 mb-0 align-items-center'><span className="d-flex align-items-center gap-1"><FiCalendar />Week 1</span> - <span className="d-flex align-items-center gap-1"><FaRegClock /> 40 hrs</span></p>
                                </div>
                                <div>
                                    <span className="status-progress">Progress</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <Nav variant="pills" className="weekly-tabs mb-0">
                                    <Nav.Item className='weekly-tab-item'>
                                        <Nav.Link className='weekly-tab-link' eventKey="week-first">Week 1</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='weekly-tab-item'>
                                        <Nav.Link className='weekly-tab-link' eventKey="week-second">Week 2</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='weekly-tab-item'>
                                        <Nav.Link className='weekly-tab-link' eventKey="week-third">Week 3</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='weekly-tab-item'>
                                        <Nav.Link className='weekly-tab-link' eventKey="week-forth">Week 4</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="week-first">
                                <div>
                                    <Row>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="week-second">
                                <div>
                                    <Row>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="week-third">
                                <div>
                                    <Row>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="week-forth">
                                <div>
                                    <Row>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xxl={4} md={6}>
                                            <div className='weekly-detail mb-3 p-3'>
                                                <div>
                                                    <div className='client-info mb-3 gap-5'>
                                                        <div className='mb-2'>
                                                            <p className='client-name-heading d-flex gap-1 align-items-center'><FiCalendar /> SUN-28</p>
                                                        </div>
                                                        <div className='d-flex gap-4 justify-content-between'>
                                                            <div className='d-flex gap-3 align-items-center'>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 9:30 AM</p>
                                                                <p className='client-name-heading'>-</p>
                                                                <p className='client-name-heading d-flex gap-1 align-items-center'><FaRegClock /> 7:00 PM</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='client-info'>
                                                        <h4 className='sidebar-heading'>Memo</h4>
                                                        <p className='client-name-heading memo-text-sidebar'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
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