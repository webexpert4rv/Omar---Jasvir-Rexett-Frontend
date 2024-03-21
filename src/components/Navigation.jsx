import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { PiArrowLineRight } from "react-icons/pi";
const Navigation = ({ handleSidebar , sidebaractive }) => {
    const navigate = useNavigate()
    return (
        <>
            <header className="mb-4 zIndex3">
                <div className="d-flex align-items-center justify-content-end gap-3">
                    <div>
                        {/* <button onClick={handleSidebar} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Dropdown className="notification-dropdown">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="notification-dropdown-toggle p-0">
                                <button className="notification-btn"><FaBell /></button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="notification-dropdown-menu">
                                <div className="dropdown-notify-wrapper">
                                    <div className="dropdown-notify-item">
                                        <h4 className="dropdown-notifyheading">Job Posted Successfully</h4>
                                        <p className="dropdown-notifytext">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        <div className="text-end mt-2">
                                            <span className="dropdown-notify-time">Just now</span>
                                        </div>
                                    </div>
                                    <div className="dropdown-notify-item">
                                        <h4 className="dropdown-notifyheading">Rexett has suggested 5 developers for figma design job</h4>
                                        <p className="dropdown-notifytext">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        <div className="text-end mt-2">
                                            <span className="dropdown-notify-time">10:10 AM</span>
                                        </div>
                                    </div>
                                    <div className="dropdown-notify-item">
                                        <h4 className="dropdown-notifyheading">Rexett wants to end the figma design job</h4>
                                        <p className="dropdown-notifytext">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                        <div className="text-end mt-2">
                                            <span className="dropdown-notify-time">02:30 PM</span>
                                        </div>
                                    </div>
                                </div>
                                <Dropdown.Item href="/notification-client" className="see-all-notify mt-4"> See All</Dropdown.Item>
                                <Dropdown.Item href="#" className="text-center no-notification">You have no notification</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button className="main-btn" onClick={() => navigate("/job-post")}>+ Add new Job</button>
                    </div>
                    <div>
                        <Button variant="transparent" onClick={handleSidebar} className={sidebaractive ? "right-btn active" : "right-btn"}><PiArrowLineRight /></Button>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Navigation;