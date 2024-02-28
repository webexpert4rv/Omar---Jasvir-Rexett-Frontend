import React from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FaCircleCheck } from "react-icons/fa6";
const AllDeveloperList = () => {
    return (
        <>
            <h2 className="section-head mb-4">All Developers</h2>
            <div>
                <h3 className="section-head-sub">Filter By</h3>
                <Form className="mb-4">
                    <div className="d-flex gap-3">
                        <div className="flex-none">
                            <Form.Label className="common-label">Category</Form.Label>
                            <Form.Select className="filter-select shadow-none">
                                <option value="" selected disabled>Select Category</option>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="full_stack">Full Stack</option>
                            </Form.Select>
                        </div>
                        <div className="flex-none">
                            <Form.Label className="common-label">Developers</Form.Label>
                            <Form.Select className="filter-select shadow-none">
                                <option value="" selected disabled>Select Developers</option>
                                <option value="assigned">Assigned</option>
                                <option value="unassigned">Unassigned</option>
                                <option value="all_developers">All Developers</option>
                            </Form.Select>
                        </div>
                        <div className="flex-none">
                            <Form.Label className="common-label">Experience</Form.Label>
                            <Form.Select className="filter-select shadow-none">
                                <option value="" selected disabled>Select Experience</option>
                                <option value="3years">3 years</option>
                                <option value="5years">5 years</option>
                                <option value="10years">10 years</option>
                            </Form.Select>
                        </div>
                    </div>
                </Form>
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
            <div className="text-center mt-3">
                <Link to={"#"} className="link-text-dark">See All</Link>
            </div>
        </>
    )
}
export default AllDeveloperList;