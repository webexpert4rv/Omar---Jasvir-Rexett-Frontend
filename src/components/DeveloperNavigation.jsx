import React from "react";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
const DeveloperNavigation = ({ onClick }) => {
    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        {/* <button onClick={onClick} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex gap-3">
                        <Dropdown className="notification-dropdown">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="notification-dropdown-toggle p-0">
                                <button className="notification-btn"><FaBell /></button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="notification-dropdown-menu">
                                <div className="dropdown-notify-wrapper">
                                    <div className="dropdown-notify-item">
                                        <h4 className="dropdown-notifyheading">You are shortlisted for Amazon project</h4>
                                        <p className="dropdown-notifytext">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        <div className="text-end mt-2">
                                            <span className="dropdown-notify-time">Just now</span>
                                        </div>
                                    </div>
                                    <div className="dropdown-notify-item">
                                        <h4 className="dropdown-notifyheading">You are shortlisted for Amazon project</h4>
                                        <p className="dropdown-notifytext">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        <div className="text-end mt-2">
                                            <span className="dropdown-notify-time">10:10 AM</span>
                                        </div>
                                    </div>
                                    <div className="dropdown-notify-item">
                                        <h4 className="dropdown-notifyheading">You are shortlisted for Amazon project</h4>
                                        <p className="dropdown-notifytext">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        <div className="text-end mt-2">
                                            <span className="dropdown-notify-time">02:30 PM</span>
                                        </div>
                                    </div>
                                </div>
                                <Dropdown.Item href="/notification-developer" className="see-all-notify mt-4"> See All</Dropdown.Item>
                                <Dropdown.Item href="#" className="text-center no-notification">You have no notification</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link to={'/developer-list'} className="text-decoration-none main-btn">Contact Support</Link>
                    </div>
                </div>
            </header>
        </>
    )
}
export default DeveloperNavigation;