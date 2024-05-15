import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import userImage from "../../assets/img/user-img.jpg"
import companyLogo from "../../assets/img/amazon.png"
import associateLogo from "../../assets/img/aviox-logo.png"
import { IoSearch } from "react-icons/io5";
import { HiDownload } from "react-icons/hi";
import timeSheetIcon from '../../assets/img/timesheet-icon.svg';
import invoiceIcon from '../../assets/img/invoice-icon.svg'

const DeveloperInvoice = () => {
    const downloadinvoice = (
        <Tooltip id="tooltip">
            Download Invoice
        </Tooltip>
    );
    const downloadtimesheet = (
        <Tooltip id="tooltip">
            Download Timesheet
        </Tooltip>
    );
    const companyname = (

        <Tooltip id="tooltip">
            Aviox Technologies Pvt Ltd
        </Tooltip>
    );
    return (
        <>
            <div className="filter-section d-lg-flex align-items-center mt-3 justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div>
                        <Form.Select className="time-filter-select shadow-none">
                            <option>Select Month</option>
                            <option>January</option>
                            <option>Feburary</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </Form.Select>
                    </div>
                    <div>
                        <Form.Select className="time-filter-select shadow-none">
                            <option>Select Year</option>
                            <option>2024</option>
                            <option>2023</option>
                            <option>2022</option>
                            <option>2021</option>
                            <option>2020</option>
                            <option>2019</option>
                        </Form.Select>
                    </div>
                    <div>
                        <Form.Select className="time-filter-select shadow-none">
                            <option>Select Project</option>
                            <option>Figma to UI</option>
                            <option>Figma to UI</option>
                            <option>Figma to UI</option>
                            <option>Figma to UI</option>
                            <option>Figma to UI</option>
                        </Form.Select>
                    </div>
                    <div>
                        <Form.Select className="time-filter-select shadow-none">
                            <option>Invoice Status</option>
                            <option>Paid</option>
                            <option>Unpaid</option>
                            <option>Cancelled</option>
                        </Form.Select>
                    </div>
                    <div>
                        <Button className="main-btn py-1_5 px-4" variant="transparent">Filter</Button>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <Form.Control
                        type="text"
                        className="common-field font-14 shadow-none"
                        placeholder="Enter Keyword..."
                    />
                    <Button variant="transparent" className="main-btn px-3 search-btn">
                        <IoSearch />
                    </Button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table time-table table-bordered table-ui-custom">
                    <thead>
                        <th className="time-table-head text-start">
                            Client Name
                        </th>
                        <th className="time-table-head text-start">
                            Project
                        </th>
                        <th className="time-table-head text-start">
                            Total Hours
                        </th>
                        <th className="time-table-head text-start">
                            Invoice Month
                    </th>
                        <th className="time-table-head text-start">
                            Invoice Status
                        </th>
                        <th className="time-table-head text-start">
                            Project Status
                        </th>
                        <th className="time-table-head text-start">
                            Action
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                    </div>
                                    Amazon
                                </div>
                            </td>
                            <td className="time-table-data text-start">AI Bot Project</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-progress">Unpaid</span></td>
                            <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={timeSheetIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={invoiceIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                    </div>
                                    Amazon
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-finished">Paid</span></td>
                            <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={timeSheetIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={invoiceIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                    </div>
                                    Amazon
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-progress">Unpaid</span></td>
                            <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={timeSheetIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={invoiceIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                    </div>
                                    Amazon
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-finished">Paid</span></td>
                            <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={timeSheetIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={invoiceIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                    </div>
                                    Amazon
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-finished">Paid</span></td>
                            <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={timeSheetIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={invoiceIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                    </div>
                                    Amazon
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-progress">Unpaid</span></td>
                            <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={timeSheetIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <Button className="main-btn download-btn p-0 font-14 white-nowrap">
                                            <img src={invoiceIcon} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </>
    )
}
export default DeveloperInvoice;