import React from "react";
import userImg from '../../assets/img/user-img.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { Form, Nav, Tab } from "react-bootstrap";
import { FaCircleCheck } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
const RentedDevelopers = () => {
    return (
        <>
            <Tab.Container className="w-100" defaultActiveKey="grid-view">
                <div className="d-flex justify-content-between mb-3 pb-2 border-bottom-grey">
                    <h3 className="section-head-sub mb-0">List of Rented developers</h3>
                    <Nav variant="pills" className="document-view-pill">
                        <Nav.Item className="document-view-item">
                            <Nav.Link className="document-view-link" eventKey="grid-view"><IoGrid /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="document-view-item">
                            <Nav.Link className="document-view-link" eventKey="list-view"><FaListUl /></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="filter-section mb-4">
                    <Form>
                        <div className="d-flex gap-3">
                            <div className="flex-none">
                                {/* <Form.Label className="common-label">Category</Form.Label> */}
                                <Form.Select className="filter-select shadow-none">
                                    <option value="" selected disabled>Select Category</option>
                                    <option value="python">Python</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="full_stack">Full Stack</option>
                                </Form.Select>
                            </div>
                            <div className="flex-none">
                                {/* <Form.Label className="common-label">Developers</Form.Label> */}
                                <Form.Select className="filter-select shadow-none">
                                    <option value="" selected disabled>Select Developers</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="unassigned">Unassigned</option>
                                    <option value="all_developers">All Developers</option>
                                </Form.Select>
                            </div>
                            <div className="flex-none">
                                {/* <Form.Label className="common-label">Experience</Form.Label> */}
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
                <Tab.Content>
                    <Tab.Pane eventKey="grid-view">
                        <div className="developers-list">
                            <div className="developer-card">
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                                <span className="check-icon"><FaCircleCheck /></span>
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
                    </Tab.Pane>
                    <Tab.Pane eventKey="list-view">
                        <div className="table-responsive">
                            <table className="table developer-table">
                                <thead>
                                    <tr>
                                        <th><span>Developer Name</span></th>
                                        <th><span>Designation</span></th>
                                        <th><span>Email</span></th>
                                        <th><span>Connects</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="d-flex align-items-center gap-3">
                                                <img src={userImg} />
                                                <h3 className="user-name color-121212 mb-0">John Doe</h3>
                                                <span className="check-icon list-dev-check position-static"><FaCircleCheck /></span>
                                            </span>

                                        </td>
                                        <td>
                                            <span>
                                                <p className="designation-user color-121212 mb-0">Full stack developer</p>
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                <p className="email-user color-121212 mb-0">Full stack developer</p>
                                            </span>
                                        </td>
                                        <td>
                                            <ul className="social-icons mb-0 justify-content-start">
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
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="d-flex align-items-center gap-3">
                                                <img src={userImg} />
                                                <h3 className="user-name color-121212 mb-0">John Doe</h3>
                                                <span className="check-icon list-dev-check position-static"><FaCircleCheck /></span>
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                <p className="designation-user color-121212 mb-0">Full stack developer</p>
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                <p className="email-user color-121212 mb-0">Full stack developer</p>
                                            </span>
                                        </td>
                                        <td>
                                            <ul className="social-icons mb-0 justify-content-start">
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
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <div className="text-center mt-3">
                <Link to={"#"} className="link-text-dark">See More</Link>
            </div>
        </>
    )
}
export default RentedDevelopers;