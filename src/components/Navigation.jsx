import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
const Navigation = ({handleSidebar}) => {
    return(
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                        <button onClick={handleSidebar} className="bars-btn"><HiBars3 /></button>
                    </div>
                    <div className="d-flex gap-3">
                        <Dropdown className="notification-dropdown">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="notification-dropdown-toggle p-0">
                                <button className="notification-btn"><FaBell /></button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="notification-dropdown-menu">
                                <Dropdown.Item href="#" className="text-center no-notification">You have no notification</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button className="main-btn">+ Add new developer to Team</button>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Navigation;