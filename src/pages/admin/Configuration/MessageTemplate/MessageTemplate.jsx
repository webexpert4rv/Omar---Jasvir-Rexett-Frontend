import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const MessageTemplate = ({currentTab}) => {
    return (
        <>
            <div>
                {currentTab === "four" &&
                    <div>
                        <div className="d-flex gap-3 justify-content-between align-items-center pb-2 mb-3 border-bottom-grey">
                            <h2 className="section-head-sub mb-0 border-0">
                                Message Templates
                            </h2>
                            <Link to={'/admin/create-message-template'} variant="transparent" className="main-btn font-14 text-decoration-none">Create new template</Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-ui-custom">
                                <thead>
                                    <tr>
                                        <th>Template name</th>
                                        <th>Subject</th>
                                        <th>Default template</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Default reply
                                        </td>
                                        <td>
                                            We have received your application!
                                        </td>
                                        <td>
                                            <span className="status-info">Default reply</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Reject email
                                        </td>
                                        <td>
                                            Thank you for your job application!
                                        </td>
                                        <td>
                                            <span className="status-info">Connect</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Welcome to connect
                                        </td>
                                        <td>
                                            Welcome to Aviox technologies pvt ltd!
                                        </td>
                                        <td>
                                            <span className="status-info">Connect</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default MessageTemplate;