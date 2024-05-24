import React, { useEffect, useState } from "react";
import Notification from "./atomic/Notfication";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import LanguageChange from "./atomic/LanguageChange";
import EndDayModal from "./common/Modals/EndTime";
import StartDayModal from "./common/Modals/StartDay";
import SubmitTimeReport from "./common/Modals/SubmitTimeSheet";
import Timer from "./atomic/Timer";
import { useDispatch, useSelector } from "react-redux";
import { addLogTime, getLastTimeLog } from "../redux/slices/developerDataSlice";
import { toast } from "react-toastify";
import moment from "moment";

const str = String(localStorage.getItem("userName"));
const developerName = str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
const tooltip = (
    <Tooltip id="tooltip">
        {developerName}
    </Tooltip>
);

const DeveloperNavigation = ({ onClick }) => {
    const dispatch =useDispatch()
    const [showTimeReport, setShowTimeReport] = useState(false);
    const [isColorfulChecked, setIsColorfulChecked] = useState(false);
    const [checked, setChecked] = useState(false)
    const [totalSeconds, setTotalSeconds] = useState(0);
    const {lastTimeLog}=useSelector(state=>state.developerData)
    const [fridayMarquee , setFridayMarquee] = useState(false)
    

    useEffect(()=>{
        const dt = moment(new Date(), "YYYY-MM-DD HH:mm:ss").format('dddd')
        setFridayMarquee(dt)
        console.log(dt,"dt")
        dispatch(getLastTimeLog())
        
    },[])

    const convertHourToSecond=(hours)=>{
        const seconds = hours * 3600;
        return  seconds
    }

    useEffect(()=>{
       if(Object.keys(lastTimeLog).length>0){
        setChecked(lastTimeLog?.data?.type=="break" || lastTimeLog?.data?.type=="check-out" ?false:true)
        setTotalSeconds(convertHourToSecond(lastTimeLog?.data?.hours_worked_till_time))
       }
    },[lastTimeLog?.data?.hours_worked_till_time])
    

    const handleCloseStartDay = (text,currStatus) => {
        setIsColorfulChecked(false);
        if (text === "yes") {
            if(lastTimeLog?.data?.type === "check-out")
                {
                   toast.error("You have already checked out. You cannot check in again ")
                }
                else{
                    setChecked(!checked)
                    let data={
                          "type": lastTimeLog?.data?.hours_worked_till_time==null ? "check-in": currStatus=="check-in" ? "resumed":currStatus,
                        "timer_seconds_till_time": totalSeconds==0?null:totalSeconds,
                        "memo": null
                      }
                    dispatch(addLogTime(data))

                }
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
             {  fridayMarquee === "Friday" ?<marquee>Please submit your TimeSheet before end of week.</marquee> : <marquee>Please CheckIn to start the day.</marquee>}

            </div>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex gap-2 align-items-center">
                        {/* <Button
                            className="main-btn px-3 py-2 font-14 shadow-none"
                            onClick={handleTimeReport}
                        >
                            Submit your report
                        </Button> */}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <p className="time-counter"><Timer checked={checked} totalSeconds={totalSeconds} setTotalSeconds={setTotalSeconds} lastTimeLog={lastTimeLog}/></p>
                        <div className="check-text">
                            <span className="checkout-text">CheckOut</span>
                            <input
                                type="checkbox"
                                role="switch"
                                className="colorful"
                                checked={checked}
                                onChange={handleColorfulChange}
                            />
                            <span className="checkin-text">{lastTimeLog?.data?.type === "break" ? "Resume" : "CheckIn"}</span>
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
                isColorfulChecked && <StartDayModal type = {lastTimeLog?.data?.type} show={isColorfulChecked} handleClose={handleCloseStartDay} checked={checked} handleSubmit={handleCheckout} setChecked={setChecked} totalSeconds={totalSeconds} />
                // : <EndDayModal show={isColorfulChecked} handleClose={handleCloseEndDay} />
            }

        </>
    );
};

export default DeveloperNavigation;
