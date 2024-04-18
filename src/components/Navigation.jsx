import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { Tooltip , OverlayTrigger } from "react-bootstrap";
import { PiArrowLineRight } from "react-icons/pi";
import Notification from "./atomic/Notfication";
import { useTranslation } from "react-i18next";
const newtooltip = (
    <Tooltip id="tooltip">
      Create Job
    </Tooltip>
  );

const clientname = (
    <Tooltip id="tooltip">
      Johan
    </Tooltip>
  );
const Navigation = ({ handleSidebar, handlemainSidebar , sidebaractive }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    return (    
        <>
            <header className="mb-4 zIndex3 overflow-hidden">
                <div className="d-flex align-items-center justify-content-lg-end justify-content-between gap-3">
                    <div className="d-lg-none">
                        <button onClick={handlemainSidebar} className="bars-btn"><HiBars3 /></button>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <Notification route="notification-client" job="single-job" doc="documents"/>
                        <OverlayTrigger placement="bottom" overlay={newtooltip}>
                            <button className="main-btn add-new-job-btn" onClick={() => navigate("/job-post")}>+</button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={clientname}>
                            <div className="profile-view">
                                <span>J</span>
                            </div>
                        </OverlayTrigger>
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