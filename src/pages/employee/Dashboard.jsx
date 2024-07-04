import React, { useState } from "react";
import empImg from '../../assets/img/user-img.jpg'
import { FaCalendarDays } from "react-icons/fa6";
import MeetingInfo from "../admin/Modals/MeetingInfo";
import Calendar from 'react-calendar';
import { Button, Col, Form, Row } from "react-bootstrap";
import devImg from '../../assets/img/user-img.jpg';
const EmployeeDashboard = () => {
    const [value, onChange] = useState(new Date());
    const [showMeetingInfo, setShowMeetingInfo] = useState(false);
    const handleShowMeetingInfo = () => {
        setShowMeetingInfo(!showMeetingInfo)
    }
    const handleCloseMeetingInfo = () => {
        setShowMeetingInfo(false)
    }
    return (
        <>
            <div className="">
                <h2 className="section-head mb-4">Overview</h2>
                <div className="overview-card-wrapper mb-5">
                    <div className="overview-card">
                        <div className="developers-list mb-md-0 mb-3">
                            <div className="developer-card shadow-none p-0 d-flex align-items-center gap-2">
                                <div className="user-imgbx mb-0">
                                    <img src={empImg} alt="developer" className="user-img" />
                                </div>
                                <div className="text-start">
                                    <h3 className="user-name">John Doe</h3>
                                    <p className="email-user mb-1">johndoe123@gmail.com</p>
                                    <p className="designation-user mb-0">Human Resource(HR)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Chat Assigned</h4>
                            <h3 className="overview-card-heading mb-0">11</h3>
                        </div>
                    </div>
                    {/* <div className="overview-card">
                        <div>
                            <h4 className="overview-card-subhead">Chat Assigned</h4>
                            <h3 className="overview-card-heading mb-0">4</h3>
                        </div>
                        <span className="over-icon"><IoTrendingUpSharp /></span>
                    </div> */}
                </div>
                <div>
                    <Row>
                        <Col lg={6} className="mb-4">
                            <div className="card-box h-100">
                                <h3 className="section-head pb-0 border-0 mb-4">Messages</h3>
                                <div>
                                    <div className="todo-wrapper mb-2 unread-message-wrapper">
                                        <div className="d-flex align-items-start gap-2">
                                            <div className="d-flex align-items-center gap-1 chat-assigned-user font-14">
                                                <img src={devImg} />
                                            </div>
                                            <div className="w-100">
                                                <p className="mb-0 fw-semibold d-flex justify-content-between align-items-center">
                                                    Andrew Smith
                                                    <span className="font-12 fw-normal">11:30 AM</span>
                                                </p>
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div className="d-flex align-items-center gap-1 chat-assigned-user font-14">
                                                <img src={devImg} />
                                            </div>
                                            <div className="w-100">
                                                <p className="mb-0 fw-semibold d-flex justify-content-between align-items-center">
                                                    Andrew Smith
                                                    <span className="font-12 fw-normal">11:30 AM</span>
                                                </p>
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div className="d-flex align-items-center gap-1 chat-assigned-user font-14">
                                                <img src={devImg} />
                                            </div>
                                            <div className="w-100">
                                                <p className="mb-0 fw-semibold d-flex justify-content-between align-items-center">
                                                    Andrew Smith
                                                    <span className="font-12 fw-normal">11:30 AM</span>
                                                </p>
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div className="d-flex align-items-center gap-1 chat-assigned-user font-14">
                                                <img src={devImg} />
                                            </div>
                                            <div className="w-100">
                                                <p className="mb-0 fw-semibold d-flex justify-content-between align-items-center">
                                                    Andrew Smith
                                                    <span className="font-12 fw-normal">11:30 AM</span>
                                                </p>
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div className="d-flex align-items-center gap-1 chat-assigned-user font-14">
                                                <img src={devImg} />
                                            </div>
                                            <div className="w-100">
                                                <p className="mb-0 fw-semibold d-flex justify-content-between align-items-center">
                                                    Andrew Smith
                                                    <span className="font-12 fw-normal">11:30 AM</span>
                                                </p>
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="todo-wrapper mb-2">
                                        <div className="d-flex align-items-start gap-2">
                                            <div className="d-flex align-items-center gap-1 chat-assigned-user font-14">
                                                <img src={devImg} />
                                            </div>
                                            <div className="w-100">
                                                <p className="mb-0 fw-semibold d-flex justify-content-between align-items-center">
                                                    Andrew Smith
                                                    <span className="font-12 fw-normal">11:30 AM</span>
                                                </p>
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button variant="transparent" className="link-btn pb-0 mt-2 font-14">View Messages <span className="to-donumber">9+</span></Button>
                                </div>
                            </div>
                        </Col>
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
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1 today-text font-14">
                                                        <span><FaCalendarDays /></span>
                                                        <span>Today</span>
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
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
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
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
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
                                                <p className="mb-0 font-14">Review it and create  an appliacation</p>
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
                                <h3 className="section-head pb-0 border-0 mb-4">Upcoming Meetings</h3>
                                {/* <div className="meeting-booking">
                                    <Calendar onChange={onChange} value={value} />
                                </div> */}
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
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="mb-4">
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
            </div>
            <MeetingInfo show={showMeetingInfo} handleClose={handleCloseMeetingInfo} />
        </>
    )
}
export default EmployeeDashboard;