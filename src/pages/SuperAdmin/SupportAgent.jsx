import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaRotateRight } from "react-icons/fa6";
import ReassignTL from "./Modal/ReassignTL";
const SupportAgents = () => {
    const reassignEmployee = (
        <Tooltip>Reassign TL</Tooltip>
    )
    const [showreassign, setShowReassign] = useState(false);
    const handleShowReassign = () => {
        setShowReassign(!showreassign);
    }
    const handleCloseReassign = () => {
        setShowReassign(false);
    }
    return (
        <>
            <div className="card-box">
                <div className="d-flex gap-3 align-items-center pb-2 mb-3 border-bottom-grey">
                    <h2 className="section-head-sub mb-0 border-0">
                        Support Agents
                    </h2>
                </div>
                <div>
                    <div className="table-responsive">
                        <table className="table table-ui-custom">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="white-nowrap">Phone number</th>
                                    <th className="white-nowrap">Email address</th>
                                    <th className="white-nowrap text-center">Current time shift</th>
                                    <th className="white-nowrap text-center">Total tickets</th>
                                    <th className="white-nowrap text-center">This Month Tickets</th>
                                    <th className="white-nowrap text-center">Team Leader</th>
                                    <th className="white-nowrap">Status</th>
                                    <th className="white-nowrap">Restrict Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            John Smith
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle">(555) 234-5678</td>
                                    <td className="font-14 align-middle white-nowrap">john.smith@example.com</td>
                                    <td className="font-14 align-middle white-nowrap text-center">Morning</td>
                                    <td className="font-14 align-middle text-center">50</td>
                                    <td className="font-14 align-middle text-center">15</td>
                                    <td className="font-14 align-middle text-center">
                                        <span className="associate-text d-inline-flex align-items-center gap-2">
                                            <span className="associate white-nowrap">David Miller</span>
                                            <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                                <span onClick={handleShowReassign} className="reschedule-btn flex-none">
                                                    <FaRotateRight />
                                                </span>
                                            </OverlayTrigger>
                                        </span>
                                    </td>
                                    <td className="font-14 align-middle">
                                        <span className="status-finished">Active</span>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div class="form-check form-switch toggle-switch-wrapper ps-0 w-auto d-inline-block">
                                            <input
                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            John Smith
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle">(555) 234-5678</td>
                                    <td className="font-14 align-middle white-nowrap">john.smith@example.com</td>
                                    <td className="font-14 align-middle white-nowrap text-center">Afternoon</td>
                                    <td className="font-14 align-middle text-center">50</td>
                                    <td className="font-14 align-middle text-center">15</td>
                                    <td className="font-14 align-middle text-center">
                                        <span className="associate-text d-inline-flex align-items-center gap-2">
                                            <span className="associate white-nowrap">David Miller</span>
                                            <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                                <span onClick={handleShowReassign} className="reschedule-btn flex-none">
                                                    <FaRotateRight />
                                                </span>
                                            </OverlayTrigger>
                                        </span>
                                    </td>
                                    <td className="font-14 align-middle">
                                        <span className="status-finished">Active</span>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div class="form-check form-switch toggle-switch-wrapper ps-0 w-auto d-inline-block">
                                            <input
                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            John Smith
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle">(555) 234-5678</td>
                                    <td className="font-14 align-middle white-nowrap">john.smith@example.com</td>
                                    <td className="font-14 align-middle white-nowrap text-center">Evening</td>
                                    <td className="font-14 align-middle text-center">50</td>
                                    <td className="font-14 align-middle text-center">15</td>
                                    <td className="font-14 align-middle text-center">
                                        <span className="associate-text d-inline-flex align-items-center gap-2">
                                            <span className="associate white-nowrap">Sarah Joe</span>
                                            <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                                <span onClick={handleShowReassign} className="reschedule-btn flex-none">
                                                    <FaRotateRight />
                                                </span>
                                            </OverlayTrigger>
                                        </span>
                                    </td>
                                    <td className="font-14 align-middle">
                                        <span className="status-finished">Active</span>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div class="form-check form-switch toggle-switch-wrapper ps-0 w-auto d-inline-block">
                                            <input
                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-14 align-middle">
                                        <div className="d-flex align-items-center gap-3 white-nowrap">
                                            John Smith
                                        </div>
                                    </td>
                                    <td className="font-14 align-middle">(555) 234-5678</td>
                                    <td className="font-14 align-middle white-nowrap">john.smith@example.com</td>
                                    <td className="font-14 align-middle white-nowrap text-center">Night</td>
                                    <td className="font-14 align-middle text-center">50</td>
                                    <td className="font-14 align-middle text-center">15</td>
                                    <td className="font-14 align-middle text-center">
                                        <span className="associate-text d-inline-flex align-items-center gap-2">
                                            <span className="associate white-nowrap">David Williams</span>
                                            <OverlayTrigger placement="bottom" overlay={reassignEmployee}>
                                                <span onClick={handleShowReassign} className="reschedule-btn flex-none">
                                                    <FaRotateRight />
                                                </span>
                                            </OverlayTrigger>
                                        </span>
                                    </td>
                                    <td className="font-14 align-middle">
                                        <span className="status-finished">Active</span>
                                    </td>
                                    <td className="font-14 align-middle text-center">
                                        <div class="form-check form-switch toggle-switch-wrapper ps-0 w-auto d-inline-block">
                                            <input
                                                class="form-check-input toggle-switch-custom shadow-none cursor-pointer"
                                                type="checkbox"
                                                role="switch"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ReassignTL show={showreassign} handleClose={handleCloseReassign} />
        </>
    )
}
export default SupportAgents;