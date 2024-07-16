import React from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Link } from "react-router-dom";
const SubscriptionPlan = () => {
    return (
        <>
            <div className="card-box">
                <div className="d-flex gap-3 justify-content-between align-items-center pb-2 mb-3 border-bottom-grey">
                    <h2 className="section-head-sub mb-0 border-0">
                        Subscription Plan
                    </h2>
                    <Link to={'/admin/create-new-plan'} variant="transparent" className="main-btn font-14 text-decoration-none">
                        Create new plan
                    </Link>
                </div>
                <div>
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="plan_monthly"
                    >
                        <div className="d-flex justify-content-center">
                            <Nav variant="pills" className="application-pills">
                                <Nav.Item className="application-item">
                                    <Nav.Link eventKey="plan_monthly" className="application-link">
                                        Monthly
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="application-item">
                                    <Nav.Link eventKey="plan_annual" className="application-link">
                                        Annual
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div>
                            <Tab.Content>
                                <Tab.Pane eventKey="plan_monthly">
                                    <div className="table-responsive activity-log-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th className="white-nowrap">Plan name</th>
                                                    <th>Price</th>
                                                    <th className="white-nowrap">Features</th>
                                                    <th className="white-nowrap">Status</th>
                                                    <th className="white-nowrap">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Trail</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap fw-medium">Free (30 days)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Full access</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input
                                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Basic</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap fw-medium">$9.99/mo</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input
                                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Standard</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap fw-medium">$19.99/mo</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input
                                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Enterprise</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap fw-medium">$29.99/mo</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input
                                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="plan_annual">
                                    <div className="table-responsive activity-log-table">
                                        <table className="table table-ui-custom">
                                            <thead>
                                                <tr>
                                                    <th className="white-nowrap">Plan name</th>
                                                    <th>Price</th>
                                                    <th className="white-nowrap">Features</th>
                                                    <th className="white-nowrap">Status</th>
                                                    <th className="white-nowrap">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Trail</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap fw-medium">Free (30 days)</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Full access</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input
                                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Basic</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap fw-medium">$100.99/yr</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input
                                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Standard</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap fw-medium">$220.99/yr</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input
                                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">Enterprise</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap fw-medium">$340.99/yr</td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="feature-list">
                                                            <span className="features">Time Reporting, Invoice Management</span> <span className="feature-count">+2</span>
                                                        </span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <span className="status-finished">Active</span>
                                                    </td>
                                                    <td className="time-table-data text-start font-14 fw-normal white-nowrap">
                                                        <div class="form-check form-switch toggle-switch-wrapper">
                                                            <input
                                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                                type="checkbox"
                                                                role="switch"
                                                                checked
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}
export default SubscriptionPlan;