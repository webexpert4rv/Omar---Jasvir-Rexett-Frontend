import React from "react";
import { Form } from "react-bootstrap";
import { FaDesktop, FaEnvelope } from "react-icons/fa6";
const NotificationSetting = ({ currentTab }) => {
    return (
        <>

            <div>
                {currentTab === "five" &&
                    <div className="table-responsive">
                        <table className="table table-ui-custom">
                            <thead>
                                <tr>
                                    <th className="align-middle">General Settings</th>
                                    <th className="text-center align-middle">
                                        <span><FaEnvelope /></span>
                                        <p className="mb-0 font-14">
                                            Email
                                        </p>
                                    </th>
                                    <th className="text-center align-middle">
                                        <span><FaDesktop /></span>
                                        <p className="mb-0 font-14">
                                            Desktop
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="align-middle">
                                        New Job Posted
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        Shortlisted Candidate
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        Interview Scheduled
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        Interview Feedback
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        Candidate Hired
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        Invoice Received
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        Invoice Approved
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">
                                        Invoice Received
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Check type="checkbox" className="primary-checkbox" checked />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}
export default NotificationSetting;