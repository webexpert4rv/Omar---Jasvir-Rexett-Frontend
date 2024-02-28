import React from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const VendorDashboard = () => {
    return (
        <>
            <h2 className="section-head mb-4">Overview</h2>
            <div className="overview-card-wrapper mb-5">
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">Income</h4>
                        <h3 className="overview-card-heading mb-0">5000 USD</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-head-sub">List of all register developers</h2>
                <div className="text-center">
                    <Link to={"/list-all-developers"} className="link-text-dark">See All</Link>
                </div>
            </div>
            <div className="developers-list mb-5">
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-head-sub">List of rented developers</h2>
                <div className="text-center">
                    <Link to={"/all-rented-developers"} className="link-text-dark">See All</Link>
                </div>
            </div>
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
        </>
    )
}
export default VendorDashboard;