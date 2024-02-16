import React from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import clientLogo from '../../assets/img/amazon.png'
const DeveloperDashboard = () => {
    return (
        <>
            <h2 className="section-head mb-4">Overview</h2>
            <div className="overview-card-wrapper mb-5">
                <div className="overview-card active">
                    <div>
                        <h4 className="overview-card-subhead">Total hours</h4>
                        <h3 className="overview-card-heading mb-0">100 hrs</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div>
            <Row>
                <Col md={3}>
                    <div className="developers-list">
                        <div className="developer-card">
                            <div className="user-imgbx">
                                <img src={userImg} className="user-img" />
                            </div>
                            <div className="text-center">
                                <h3 className="user-name">Affredo</h3>
                                <p className="designation-user">Front End Designer</p>
                                <p className="email-user">affredo@rexett.com</p>
                                <ul className="social-icons">
                                    <li>
                                        <Link to={"#"}><FaGithub /></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"}><FaLinkedin /></Link>
                                    </li>
                                    <li>
                                        <Link to={"#"}><MdEmail /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={9}>
                    <div>
                        <h2 className="section-head-sub mb-4">List of Clients who assigned Alfredo</h2>

                        <div>
                            <div className="table-responsive">
                                <table className="table time-table table-bordered">
                                    <thead>
                                        <th className="time-table-head">
                                            Client Name
                                        </th>
                                        <th className="time-table-head">
                                            Contract
                                        </th>
                                        <th className="time-table-head">
                                            Total Hours
                                        </th>
                                        <th className="time-table-head">
                                            Location
                                        </th>
                                        <th className="time-table-head">
                                            Status
                                        </th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="time-table-data">Facebook</td>
                                            <td className="time-table-data">Hourly</td>
                                            <td className="time-table-data">100</td>
                                            <td className="time-table-data">Remote</td>
                                            <td className="time-table-data">Finished</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    )
}
export default DeveloperDashboard;