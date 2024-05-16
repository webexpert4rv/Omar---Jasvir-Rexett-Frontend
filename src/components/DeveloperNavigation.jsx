import React, { useState } from "react";
import Notification from "./atomic/Notfication";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import LanguageChange from "./atomic/LanguageChange";
import EndDayModal from "./common/Modals/EndTime";
import StartDayModal from "./common/Modals/StartDay";
import SubmitTimeReport from "./common/Modals/SubmitTimeSheet";

const str = String(localStorage.getItem("userName"));
const developerName = str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
const tooltip = (
    <Tooltip id="tooltip">
        {developerName}
    </Tooltip>
);

const DeveloperNavigation = ({ onClick }) => {
    const [showEndDay, setShowEndDay] = useState(false);
    const [showStartDay, setShowStartDay] = useState(false);
    const [showTimeReport, setShowTimeReport] = useState(false);
    const [isColorfulChecked, setIsColorfulChecked] = useState(false);
    const [checked, setChecked] = useState(false)


    // const handleCloseEndDay = () => {
    //   setIsColorfulChecked(true);
    // };

    const handleCloseStartDay = (text) => {
        setIsColorfulChecked(false);
        if (text === "yes") {
            setChecked(!checked)
        }
    };

    const handleCheckout = (values) => {
    }

    const handleTimeReport = () => {
        setShowTimeReport(true);
    };

    const handleCloseTimeReport = () => {
        setShowTimeReport(false);
    };

    const handleColorfulChange = (e) => {
        setIsColorfulChecked(true);
    };

    return (
        <>
            <div className="rotate-text">
                {/* <marquee>Please CheckIn to start the day. Before start your day, please submit yesterday report</marquee> */}
                <marquee>Please CheckIn to start the day.</marquee>
            </div>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex gap-2 align-items-center">
                        <Button
                            className="main-btn px-3 py-2 font-14 shadow-none"
                            onClick={handleTimeReport}
                        >
                            Submit your report
                        </Button>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <p className="time-counter">00:00:00 hrs</p>
                        <div className="check-text">
                            <span className="checkout-text">CheckOut</span>
                            <input
                                type="checkbox"
                                role="switch"
                                className="colorful"
                                checked={checked}
                                onChange={handleColorfulChange}
                            />
                            <span className="checkin-text">CheckIn</span>
                        </div>
                        <LanguageChange />
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
            {
                isColorfulChecked && <StartDayModal show={isColorfulChecked} handleClose={handleCloseStartDay} checked={checked} handleSubmit={handleCheckout} />
                // : <EndDayModal show={isColorfulChecked} handleClose={handleCloseEndDay} />
            }


            <SubmitTimeReport
                show={showTimeReport}
                handleClose={handleCloseTimeReport}
            />
        </>
    );
};

export default DeveloperNavigation;
