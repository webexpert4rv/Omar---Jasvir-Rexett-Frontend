import React, { useState } from "react";
import { Form, Button, Row, Col, Table, Tooltip , OverlayTrigger  } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import userImage from "../../assets/img/user-img.jpg"
import { IoSearch } from "react-icons/io5";
import { HiDownload } from "react-icons/hi";

const AdminInvoice = () => {
    const [showFolderView, setShowFolderView] = useState(false);

    const toggleFolderView = () => {
        setShowFolderView(!showFolderView);
    };
    const downloadinvoice = (
        <Tooltip id="tooltip">
          Download Invoice
        </Tooltip>
      );

    return (
        <>
            <section>
                <section className="invoice-details">
                    <div className="filter-section d-lg-flex align-items-center mb-4 justify-content-between">
                        <div className="d-flex align-items-center gap-2 mb-lg-0 mb-3 flex-wrap">
                            <div>
                                <Form.Select className="time-filter-select shadow-none">
                                    <option>Select Week</option>
                                    <option>Week 1</option>
                                    <option>Week 2</option>
                                    <option>Week 3</option>
                                    <option>Week 4</option>
                                </Form.Select>
                            </div>
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
                                    <option>Invoice Status</option>
                                    <option>Unpaid</option>
                                    <option>Paid</option>
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
                    <div className="detail-view">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="raise-by-devs">
                            <div className="card-box mb-4 p-3">
                                <div className="d-flex justify-content-center mb-4">
                                    <Nav variant="pills" className="weekly-tabs mb-0">
                                        <Nav.Item className='weekly-tab-item'>
                                            <Nav.Link className='weekly-tab-link d-flex align-items-center gap-2' eventKey="raise-by-devs">Raise By</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className='weekly-tab-item'>
                                            <Nav.Link className='weekly-tab-link' eventKey="raise-to-clients">Raise To</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <Tab.Content>
                                    <Tab.Pane eventKey="raise-by-devs">
                                        <div>
                                            <div className="table-responsive">
                                                <table className="table time-table table-bordered table-ui-custom mb-0">
                                                    <thead>
                                                        <th className="time-table-head text-start">
                                                            Developer Name
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Client Name
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Month
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Total Hours
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Amount
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Status
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
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Rohit Sharma
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Amazon
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">Jan 2024</td>
                                                            <td className="time-table-data text-start">140 hrs</td>
                                                            <td className="time-table-data text-start">$100.00</td>
                                                            <td className="time-table-data text-start">
                                                                <span className="status-progress">Unpaid</span>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <Button className="main-btn font-14 py-2 px-3">Pay</Button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="time-table-data text-start">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Rohit Sharma
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Amazon
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">Jan 2024</td>
                                                            <td className="time-table-data text-start">140 hrs</td>
                                                            <td className="time-table-data text-start">$100.00</td>
                                                            <td className="time-table-data text-start">
                                                                <span className="status-finished">Invoice Paid</span>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <Button className="main-btn font-14 py-2 px-3" disabled>Paid</Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="raise-to-clients">
                                        <div>
                                            <div className="table-responsive">
                                                <table className="table time-table table-bordered table-ui-custom mb-0">
                                                    <thead>
                                                        <th className="time-table-head text-start">
                                                            Client Name
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Developer Name
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Month
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Total Hours
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Amount
                                                        </th>
                                                        <th className="time-table-head text-start">
                                                            Status
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
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Rohit Sharma
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Amazon
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">Jan 2024</td>
                                                            <td className="time-table-data text-start">140 hrs</td>
                                                            <td className="time-table-data text-start">$100.00</td>
                                                            <td className="time-table-data text-start">
                                                                <span className="status-progress">Unpaid</span>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <Button className="main-btn font-14 py-2 px-3">Raise Invoice</Button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="time-table-data text-start">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Rohit Sharma
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Amazon
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">Jan 2024</td>
                                                            <td className="time-table-data text-start">140 hrs</td>
                                                            <td className="time-table-data text-start">$100.00</td>
                                                            <td className="time-table-data text-start">
                                                                <span className="status-progress">Unpaid</span>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <Button className="main-btn font-14 py-2 px-3" disabled>Invoice Raised</Button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="time-table-data text-start">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Rohit Sharma
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                                                        <img src={userImage} className="user-img" />
                                                                    </div>
                                                                    Amazon
                                                                </div>
                                                            </td>
                                                            <td className="time-table-data text-start">Jan 2024</td>
                                                            <td className="time-table-data text-start">140 hrs</td>
                                                            <td className="time-table-data text-start">$100.00</td>
                                                            <td className="time-table-data text-start">
                                                                <span className="status-finished">Invoice Paid</span>
                                                            </td>
                                                            <td className="time-table-data text-start">
                                                                <OverlayTrigger placement="bottom" overlay={downloadinvoice}>
                                                                    <Button variant="transparent" className="arrow-btn primary-arrow"><HiDownload /></Button>
                                                                </OverlayTrigger>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </Tab.Container>
                    </div>
                </section>
            </section>
        </>
    );
};

export default AdminInvoice;
