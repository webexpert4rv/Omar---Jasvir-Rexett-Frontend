import React from "react";
import Notification from "./atomic/Notfication";
import { Tooltip , OverlayTrigger } from "react-bootstrap";
const tooltip = (
    <Tooltip id="tooltip">
      John Deo
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
                      <Notification route="notification-developer" job="" doc="documents" />
                        {/* <Link to={'/developer-list'} className="text-decoration-none main-btn">Contact Support</Link> */}
                        <OverlayTrigger placement="bottom" overlay={tooltip}>
                            <div className="profile-view">
                                <span>JD</span>
                            </div>
                        </OverlayTrigger>
                    </div>
                </div>
            </header>
        </>
    )
}
export default DeveloperNavigation;