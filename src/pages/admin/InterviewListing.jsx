import React from "react";
import userImg from '../../assets/img/user-img.jpg';
const InterviewListing = () => {
    return(
        <>
            <div className="card-box">
                <div className="border-bottom-grey pb-3 mb-4">
                    <h2 className="section-head border-0 mb-0 pb-0">Interviews</h2>
                </div>
                <div className="table-responsive">
                    <table className="table table-ui-custom">
                        <thead>
                            <tr>
                                <th>Developer Name</th>
                                <th>Project</th>
                                <th>Client Name</th>
                                <th>Schedule Date & Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="application-row">
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src={userImg} className="table-user-img" />
                                        Rohit Sharma
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    Figma to UI
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src={userImg} className="table-user-img" />
                                        Rohit Sharma
                                    </div>
                                </td>
                                <td className="align-middle">
                                    <span className="associate-text">
                                        <span className="associate">18-06-2024 11:00AM - 12:00PM</span>
                                    </span>
                                </td>
                                <td className="align-middle">
                                    <span className="status-progress">
                                        Interview Scheduled
                                    </span>
                                </td>
                            </tr>
                            <tr className="application-row">
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src={userImg} className="table-user-img" />
                                        Rohit Sharma
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    Figma to UI
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src={userImg} className="table-user-img" />
                                        Rohit Sharma
                                    </div>
                                </td>
                                <td className="align-middle">
                                    <span className="associate-text">
                                        <span className="associate">18-06-2024 11:00AM - 12:00PM</span>
                                    </span>
                                </td>
                                <td className="align-middle">
                                    <span className="status-finished">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                            <tr className="application-row">
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src={userImg} className="table-user-img" />
                                        Rohit Sharma
                                    </div>
                                </td>
                                <td className="align-middle font-14">
                                    Figma to UI
                                </td>
                                <td className="align-middle font-14">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src={userImg} className="table-user-img" />
                                        Rohit Sharma
                                    </div>
                                </td>
                                <td className="align-middle">
                                    <span className="associate-text">
                                        <span className="associate">18-06-2024 11:00AM - 12:00PM</span>
                                    </span>
                                </td>
                                <td className="align-middle">
                                    <span className="status-progress">
                                        Interview Scheduled
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default InterviewListing;