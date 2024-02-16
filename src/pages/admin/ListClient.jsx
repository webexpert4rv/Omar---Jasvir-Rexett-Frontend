import React from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import clientLogo from '../../assets/img/facebook.png'
const ListClient = () => {
    return (
        <>
            <h2 className="section-head mb-4">Overview</h2>
            <div className="overview-card-wrapper mb-5">
                {/* <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">Fund</h4>
                        <h3 className="overview-card-heading mb-0">Spent</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div> */}
                <div className="overview-card">
                    <div>
                        <h4 className="overview-card-subhead">Income</h4>
                        <h3 className="overview-card-heading mb-0">Earned</h3>
                    </div>
                    <span className="over-icon"><IoTrendingUpSharp /></span>
                </div>
            </div>
            <h2 className="section-head-sub mb-4">List of clients who hire developers from Rexett</h2>
            <div className="developers-list">
                <div className="developer-card">
                    <div className="user-imgbx">
                        <img src={clientLogo} className="user-img client-logo" />
                    </div>
                    <div className="text-center">
                        <h3 className="user-name">Facebook</h3>
                        <p className="email-user">claudia@facebook.com</p>
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
                        <img src={clientLogo} className="user-img client-logo" />
                    </div>
                    <div className="text-center">
                        <h3 className="user-name">Facebook</h3>
                        <p className="email-user">claudia@facebook.com</p>
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
                        <img src={clientLogo} className="user-img client-logo" />
                    </div>
                    <div className="text-center">
                        <h3 className="user-name">Facebook</h3>
                        <p className="email-user">claudia@facebook.com</p>
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
                        <img src={clientLogo} className="user-img client-logo" />
                    </div>
                    <div className="text-center">
                        <h3 className="user-name">Facebook</h3>
                        <p className="email-user">claudia@facebook.com</p>
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
                        <img src={clientLogo} className="user-img client-logo" />
                    </div>
                    <div className="text-center">
                        <h3 className="user-name">Facebook</h3>
                        <p className="email-user">claudia@facebook.com</p>
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
                <Link to={"#"} className="link-text-dark">See All</Link>
            </div>
        </>
    )
}
export default ListClient;