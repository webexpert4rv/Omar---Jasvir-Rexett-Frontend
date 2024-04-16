import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { PiArrowLineRight } from "react-icons/pi";
import Notification from "./atomic/Notfication";
const Navigation = ({ handleSidebar, handlemainSidebar , sidebaractive }) => {
    const navigate = useNavigate()
    return (    
        <>
            <header className="mb-4 zIndex3">
                <div className="d-flex align-items-center justify-content-lg-end justify-content-between gap-3">
                    <div className="d-lg-none">
                        <button onClick={handlemainSidebar} className="bars-btn"><HiBars3 /></button>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <Notification route="notification-client" job="single-job" doc="documents"/>
                        <button className="main-btn" onClick={() => navigate("/job-post")}>+ Add new Job</button>
                        <div>
                            {/* <Button variant="transparent" onClick={handleSidebar} className={sidebaractive ? "right-btn active" : "right-btn"}><PiArrowLineRight /></Button> */}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Navigation;