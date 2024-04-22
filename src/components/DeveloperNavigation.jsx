import React from "react";
import Notification from "./atomic/Notfication";
import { Tooltip , OverlayTrigger } from "react-bootstrap";
import LanguageChange from "./atomic/LanguageChange";

const developerName = localStorage.getItem("userName")
const tooltip = (
    <Tooltip id="tooltip">
      {developerName}
    </Tooltip>
  );
const DeveloperNavigation = ({ onClick }) => {
    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <LanguageChange/>
                      <Notification route="notification-developer" job="" doc="documents" />
                        {/* <Link to={'/developer-list'} className="text-decoration-none main-btn">Contact Support</Link> */}
                        <OverlayTrigger placement="bottom" overlay={tooltip}>
                            <div className="profile-view">
                                <span>{developerName?.split("")[0]}</span>
                            </div>
                        </OverlayTrigger>
                    </div>
                </div>
            </header>
        </>
    )
}
export default DeveloperNavigation;