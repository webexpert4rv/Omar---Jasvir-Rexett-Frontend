import React from "react";
import userImg from  '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const Dashboard = () => {
    return(
        <>
            <h2 className="section-head mb-4">Overview</h2>
            <div className="overview-card-wrapper mb-5">
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">Fund</h4>
                        <h3 className="overview-card-heading mb-0">Spent</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">Client</h4>
                        <h3 className="overview-card-heading mb-0">Earned Back</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div>
            <h2 className="section-head-sub mb-5">List of assigned developers</h2>
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
            <div className="text-center mt-3">
                <Link to={"/hired-developers"} className="link-text-dark">See All</Link>
            </div>
        </>
    )
}
export default Dashboard;