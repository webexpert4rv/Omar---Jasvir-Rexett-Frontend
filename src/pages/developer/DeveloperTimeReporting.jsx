import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../assets/img/user-img.jpg'
import AddTimingModal from "./Modals/AddTiming";
const DeveloperTimeReporting = () => {
    const [showAddTimingModal, setShowAddTimingModal] = useState(false);
    const handleShowAddTimingModal = () => {
        setShowAddTimingModal(true);
    };

    const handleCloseAddTimingModal = () => {
        setShowAddTimingModal(false);
    };
    return (
        <>
            <section>
                <Form className="mb-4">
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-flex gap-3">
                            <div>
                                <Form.Label className="common-label">From</Form.Label>
                                <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                            </div>
                            <div>
                                <Form.Label className="common-label">To</Form.Label>
                                <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                            </div>
                        </div>
                        <div className="flex-none">
                            <Form.Label className="common-label">Select Period</Form.Label>
                            <Form.Select className="filter-select shadow-none">
                                <option value="1">Weekly</option>
                                <option value="2">Monthly</option>
                                <option value="3">Yearly</option>
                            </Form.Select>
                        </div>
                    </div>
                </Form>
                <div className="indicator-time-slot d-flex gap-3 align-items-center flex-wrap mb-4">
                    <div className="d-inline-flex align-items-center gap-1">
                        <span className="slot-indicate offday"></span>
                        <span>Off Day</span>
                    </div>
                    <div className="d-inline-flex align-items-center gap-1">
                        <span className="slot-indicate workday"></span>
                        <span>Work Day</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-3 w-50">
                        <Form.Control type="text" placeholder="Search" className="search-field"></Form.Control>
                        <button className="main-btn px-5">Filter</button>
                    </div>
                    <div>
                        <Button variant="transparent" onClick={handleShowAddTimingModal} className="main-btn px-5">Add Time</Button>
                    </div>
                </div>
                <div>
                    <div className="table-responsive">
                        <table className="table time-table table-bordered">
                            <thead>
                                <th className="time-table-head">
                                    Developer Name
                                </th>
                                <th className="time-table-head">
                                    Client Name
                                </th>
                                <th className="time-table-head">
                                    Image of Developer
                                </th>
                                <th className="time-table-head">
                                    Mon 22
                                </th>
                                <th className="time-table-head">
                                    Tue 23
                                </th>
                                <th className="time-table-head">
                                    Wed 24
                                </th>
                                <th className="time-table-head">
                                    Thu 25
                                </th>
                                <th className="time-table-head">
                                    Fri 26
                                </th>
                                <th className="time-table-head">
                                    Total Hours
                                </th>
                                <th className="time-table-head">
                                    Contract
                                </th>
                                <th className="time-table-head">
                                    Time Report Submit
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="time-table-data">Rohit Sharma</td>
                                    <td className="time-table-data">Facebook</td>
                                    <td className="time-table-data"><img src={developerImg} className="developer-img" alt="" /></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data offday-data"></td>
                                    <td className="time-table-data">08:00 - 17:00</td>
                                    <td className="time-table-data">36 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                    <td className="time-table-data">
                                        <Button variant="transparent" className="outline-main-btn">Submit</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <AddTimingModal show={showAddTimingModal} handleClose={handleCloseAddTimingModal} />
        </>
    )
}
export default DeveloperTimeReporting;