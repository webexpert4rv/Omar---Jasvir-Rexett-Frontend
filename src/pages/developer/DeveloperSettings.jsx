import React from "react";
import { Form, Nav, Tab } from "react-bootstrap";
import { FaDesktop, FaEnvelope } from "react-icons/fa6";
const DeveloperSettings = () => {
    return (
        <>
            <div className="card-box">
                <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
                    <h2 className="section-head border-0 mb-0 pb-0">Settings</h2>
                </div>
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
                                    Shortlisted in job
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
                                    Hired in job
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
                                    Invoice Submission
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
                                    Timesheet submission
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
                                    Timesheet approved
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
                                    Timesheet reconciltation
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
            </div>
        </>
    )
}
export default DeveloperSettings;