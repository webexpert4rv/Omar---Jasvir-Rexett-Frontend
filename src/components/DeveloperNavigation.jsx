import React, {useState} from "react";
import Notification from "./atomic/Notfication";
import { Tooltip , OverlayTrigger, Button } from "react-bootstrap";
import LanguageChange from "./atomic/LanguageChange";
import EndDayModal from "./common/Modals/EndTime";
import StartDayModal from "./common/Modals/StartDay";
import SubmitTimeReport from "./common/Modals/SubmitTimeSheet";

const str = String(localStorage.getItem("userName"));
const developerName = str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
const tooltip = (
    <Tooltip id="tooltip">
      {developerName}
    </Tooltip>
  );
const DeveloperNavigation = ({ onClick }) => {
    const [showEndDay, setShowEndDay] = useState(false);
    const handleEndDay = () => {
        setShowEndDay(true);
    }
    const handleCloseEndDay = () => {
        setShowEndDay(false);
    }
    const [showStartDay, setShowStartDay] = useState(false);
    const handleStartDay = () => {
        setShowStartDay(true);
    }
    const handleCloseStartDay = () => {
        setShowStartDay(false);
    }
    const [showTimeReport, setShowTimeReport] = useState(false);
    const handleTimeReport = () => {
        setShowTimeReport(true);
    }
    const handleCloseTimeReport = () => {
        setShowTimeReport(false);
    }
    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex gap-2 align-items-center">
                        <p className="time-counter">00:00:00 hrs</p>
                        <Button className="main-btn px-3 py-2 font-14" onClick={handleStartDay}>Start Day</Button>
                        <Button className="red-btn px-3 py-2 font-14" onClick={handleEndDay}>End Day</Button>
                        <Button className="main-btn px-3 py-2 font-14" onClick={handleTimeReport}>Submit your report</Button>
                        <p className="warning-text">Before start your day, please submit yesterday report</p>
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
            <StartDayModal show={showStartDay} handleClose={handleCloseStartDay} />
            <EndDayModal show={showEndDay} handleClose={handleCloseEndDay} />
            <SubmitTimeReport show={showTimeReport} handleClose={handleCloseTimeReport} />
        </>
    )
}
export default DeveloperNavigation;