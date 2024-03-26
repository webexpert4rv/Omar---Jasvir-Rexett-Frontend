import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { HiUpload } from "react-icons/hi";
const VendorTimeReporting = () => {

    return (
        <>
            <section>
                <Form className="mb-4 filter-section">
                    <div className="d-flex gap-3 justify-content-between align-items-end">
                        <div className="d-flex gap-3">
                            <div>
                                <Form.Control type="date" className="filter-field shadow-none"></Form.Control>
                            </div>
                            <div>
                                <Form.Select className="filter-select shadow-none">
                                    <option value="" selected disabled>Select Clients</option>
                                    <option value="bmw">BMW</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="amazon">Amazon</option>
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                </Form>
                <div>
                    <div className="table-responsive">
                        <table className="table time-table table-bordered table-ui-custom">
                            <thead>
                                <th className="time-table-head">
                                    Client Name
                                </th>
                                <th className="time-table-head">
                                    No of Developers Hired
                                </th>
                                <th className="time-table-head">
                                    Name of Developers
                                </th>
                                <th className="time-table-head">
                                    Total Hours
                                </th>
                                <th className="time-table-head">
                                    Location
                                </th>
                                <th className="time-table-head">
                                    Redeem
                                </th>
                                <th className="time-table-head">
                                    Contract
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="time-table-data">Amazon</td>
                                    <td className="time-table-data">8</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="" selected disabled>Developer</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">400 hrs</td>
                                    <td className="time-table-data">Remote</td>
                                    <td className="time-table-data">N/A</td>
                                    <td className="time-table-data">Hourly</td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Amazon</td>
                                    <td className="time-table-data">8</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="" selected disabled>Developer</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">400 hrs</td>
                                    <td className="time-table-data">Remote</td>
                                    <td className="time-table-data">N/A</td>
                                    <td className="time-table-data">Hourly</td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Amazon</td>
                                    <td className="time-table-data">8</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="" selected disabled>Developer</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">400 hrs</td>
                                    <td className="time-table-data">Remote</td>
                                    <td className="time-table-data">28 hrs</td>
                                    <td className="time-table-data">Hourly</td>
                                </tr>
                                <tr>
                                    <td className="time-table-data">Amazon</td>
                                    <td className="time-table-data">8</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none">
                                            <option value="" selected disabled>Developer</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                            <option value="rohit_sharma">Rohit Sharma</option>
                                        </Form.Select>
                                    </td>
                                    <td className="time-table-data">400 hrs</td>
                                    <td className="time-table-data">Remote</td>
                                    <td className="time-table-data">N/A</td>
                                    <td className="time-table-data">Hourly</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}
export default VendorTimeReporting;