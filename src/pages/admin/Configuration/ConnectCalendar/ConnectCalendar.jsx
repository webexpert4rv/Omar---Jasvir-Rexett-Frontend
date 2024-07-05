import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const ConnectCalendar = ({ currentTab }) => {
    return (
        <>

            <div>
                {currentTab === "six" &&
                    <div>
                        <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                            <h2 className="section-head-sub mb-0 border-0">
                                Connect with calendar
                            </h2>
                        </div>
                        <p className="font-14">Stay up to date with events and appointments by connecting your calendar with services like Microsoft Outlook and Google Calendar. These platforms offer seamless integration, ensuring you never miss a scheduled activity.</p>
                        <Link to={'#'} className="main-btn font-14 text-decoration-none mb-2" >Connect with calendar</Link>
                        <div className="d-flex align-items-center gap-2">
                            <Button variant="transparent" className="main-btn font-14" disabled>Connected with google</Button>
                            <Button variant="transparent" className="cancel-btn font-14">Disconnect</Button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default ConnectCalendar;