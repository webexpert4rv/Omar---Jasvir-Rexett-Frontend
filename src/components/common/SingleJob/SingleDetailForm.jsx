import React, { useEffect, useRef, useState } from "react";

import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IoCheckmarkOutline } from 'react-icons/io5';
import sidebarLogo from "../../../assets/img/rexett-logo.png";
import RexettButton from "../../atomic/RexettButton";


function SingleDetailForm({handleBack,handleSave}) {
    const [documentOwner, setDocumentOwner] = useState('');
    const[details,setDetails] = useState()
    const {setValue ,reset, register,handleSubmit} = useForm({})
    const printRef = useRef();
    console.log(details,"details")




    const onSubmit = (values) => {
        console.log(values,"values")
        setDetails(values)

    }

    const handleOwnerSelect = (e) => {
        setDocumentOwner(e.target.value);
        setDetailsFilled(false);
        setDocumentSaved(false);
    };

    return (
        <div>
                <div id="fill-details">
                    <h4 className="text-center">Fill Details</h4>
                    <p className="text-center mb-4">Fill all the details</p>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Row className="justify-content-center">
                                <Col md={6}>
                                    <div>
                                        <Row>
                                            <Col lg={12}>
                                                <div>
                                                    <Form.Label className="font-14 fw-medium">Select Candidate</Form.Label>
                                                    <div>
                                                        {[...Array(6)].map((_, i) => (
                                                            <div className="d-inline-block me-3" key={i}>
                                                                <input type="checkbox" name="candidate_check" className="candidate_checkbox" id={`candidate_short${i + 1}`} />
                                                                <Form.Label htmlFor={`candidate_short${i + 1}`} className="select_candidate_label">
                                                                    <div className="position-relative">
                                                                        {/* <img src={devImg} alt="Candidate" /> */}
                                                                        <span className="checkmark-icon">
                                                                            <IoCheckmarkOutline />
                                                                        </span>
                                                                    </div>
                                                                    johndoe@gmail.com
                                                                </Form.Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label className="font-14 fw-medium">Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    //  value="Aviox Technologies" 
                                                    className="common-field font-14"
                                                    {...register("name", {
                                                        required: "name is required",
                                                    })}
                                                />
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label className="font-14 fw-medium">Address</Form.Label>
                                                <Form.Control
                                                 type="text" 
                                                //  value="" 
                                                 className="common-field font-14" 
                                                 {...register("address", {
                                                    required: "Address is required",
                                                })} />
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label className="font-14 fw-medium">Start Date</Form.Label>
                                                <Form.Control
                                                 type="date"
                                                 className="common-field font-14"
                                                 {...register("date", {
                                                    required: "Date is required",
                                                })} />
                                                 
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label className="font-14 fw-medium">Work Location</Form.Label>
                                                <Form.Control 
                                                type="text"
                                                // value="" 
                                                className="common-field font-14"
                                                {...register("location", {
                                                    required: "Work Location is required",
                                                })}
                                                />
                                            </Col>
                                            <Col md={12} className="mb-0">
                                                <Form.Label>Working Hours</Form.Label>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label className="font-14 fw-medium">Start Time</Form.Label>
                                                <Form.Control 
                                                type="time"
                                                className="common-field font-14" 
                                                {...register("start_time", {
                                                    required: "Start Time is required",
                                                })}
                                                />
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Label className="font-14 fw-medium">End Time</Form.Label>
                                                <Form.Control 
                                                type="time"
                                                 className="common-field font-14" 
                                                 {...register("end_time", {
                                                    required: "End Time is required",
                                                })}
                                                 />
                                            </Col>
                                            <Col md={8} className="mb-3">
                                                <Form.Label className="font-14 fw-medium">Price (in dollars)</Form.Label>
                                                <div className="d-flex align-items-center gap-3">
                                                    <Form.Control 
                                                    type="text" 
                                                    className="common-field font-14"
                                                    {...register("price", {
                                                        required: "End Time is required",
                                                    })}
                                                    />
                                                    <Form.Check 
                                                    type="checkbox" 
                                                    name="gst"
                                                    label="Inc. GST" 
                                                    className="font-14 flex-none" />
                                                </div>
                                            </Col>
                                            <Col md={12} className="mb-3">
                                                <Form.Label className="font-14 fw-medium">Scope of work</Form.Label>
                                                <Form.Control 
                                                type="text" as="textarea" rows={3} 
                                                className="common-field font-14" 
                                                {...register("work_scope", {
                                                    required: "This field is required",
                                                })}/>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="text-center">
                                        <Button variant="transparent" className="font-14 outline-main-btn main-btn px-5 me-2" onClick={handleBack}>Back</Button>
                                        <RexettButton 
                                        variant="transparent" 
                                        text="Save"
                                        type="submit"
                                        className="font-14 main-btn px-5"
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div>
                                        <h5>Preview Document</h5>
                                        <div className="docs-container" ref={printRef} >
                                            <div className="sidebar-logo mt-3 mb-2 text-center">
                                                <a href="https://www.rexett.com/">
                                                    <img src={sidebarLogo} alt="Sidebar Logo" />
                                                </a>
                                            </div>
                                            <header>
                                                <h1 className="docs-head">Statement of Work – Time and Material</h1>
                                            </header>
                                            <section className="docs-introduction">
                                                <p>This Statement of Work (“SOW”) dated 04th July 2024 is made part of the Master Service Agreement executed between <strong>Digital Aptech Pvt. Ltd.</strong>, an Indian company, with its registered office at EN-34 (9th Floor), Block-EN, Sector – V, Salt Lake City, Kolkata – 700091, (hereinafter referred to as “Company”)</p>
                                                <p>and</p>
                                                <p><strong>Aviox Technologies Private Limited</strong>, with its registered office at office no-26, prosperity square, d- 185, Sector 74, Sahibzada Ajit Singh Nagar, Punjab, Pin Code : 160055 (herein referred to as “Subcontractor”)</p>
                                                <p>In the event of a conflict between the terms and conditions of the Agreement and the terms of this SOW, the terms of this SOW shall control only for the purposes of setting forth the Services performed herein.</p>
                                                <p>All capitalized terms used herein without definition shall have the meanings assigned to them in the Agreement; all capitalized terms defined herein shall have the meaning set forth in this SOW.</p>
                                            </section>
                                            <section className="terms-conditions">
                                                <h2 className="docs-head-section">Terms and Conditions</h2>
                                                <p>Parties agree to the following terms herein:</p>
                                                <ul>
                                                    <li><strong>Contractual Resource Name:</strong> </li>
                                                    <li><strong>Contract Duration:</strong> 3 Months </li>
                                                    <li><strong>Start Date:</strong>{details?.date}</li>
                                                    <li><strong>Contract End Date:</strong> N/A</li>
                                                </ul>
                                                <h3 className="docs-head-section">Scope of Work</h3>
                                                <p>For consideration of the Fees as specified below, Subcontractor agrees to provide the full-time services of the assigned developer, to work on projects and assignments as required by the Company on a day-to-day basis.</p>
                                                <h3 className="docs-head-section">Obligations of Parties</h3>
                                                <ul>
                                                    <li><strong>Company’s Obligations:</strong> To provide a clear requirement of the tasks to be performed and to monitor and guide the output of the assigned developer.</li>
                                                    <li><strong>Subcontractor’s Obligations:</strong> To make the assigned developer available to the Company during all normal working hours of the Company.</li>
                                                </ul>
                                                <h3 className="docs-head-section">Notice Period</h3>
                                                <ul>
                                                    <li><strong>For Termination:</strong> Either party can serve notice of 30 days for the termination of this Statement of Work, without any cause.</li>
                                                    <li><strong>In Case of Non-performance:</strong> Immediate.</li>
                                                </ul>
                                                <h3 className="docs-head-section">Fees</h3>
                                                <p>The following rates shall be applicable for the Services:</p>
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr. No</th>
                                                            <th>Resource Name</th>
                                                            <th>Monthly Rates</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Pankaj Pundir</td>
                                                            <td>85K + GST</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <p>Rates specified in the table above are exclusive of applicable taxes and shall be charged extra.</p>
                                                <p>A person's month shall comprise a number of working days with asked hours of work per day.</p>
                                                <p>Invoices shall be raised at the end of each month. Invoice would be payable within 30 days of the receipt of the Invoice. Invoice processing cycle and other statutory requirements are expressly defined in Annexure A to this SOW.</p>
                                                <p>Any leaves if required need to pre-inform Digital Aptech Pvt Ltd & End client.</p>
                                                <p><strong>Leave:</strong> The Contractor’s personnel and/or its independent contractors will be granted with no paid leaves. (No work No Pay)</p>
                                                <h3 className="docs-head-section">Work Location</h3>
                                                <p>{details?.location? details?.location:"Remotely"}</p>
                                                <p><strong>Working Hours:</strong> 10:00 AM to 7:00 PM</p>
                                            </section>
                                            <section className="signatures">
                                                <h3 className="docs-head-section">SOW#[•] Approved and Acknowledged</h3>
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="signature">
                                                            <p className="mb-0"><strong>Aviox Technology</strong></p>
                                                            <p className="mb-0">Name - <strong>{details?.name}</strong></p>
                                                            <p className="mb-0">Designation - <strong>Software Developer</strong></p>
                                                            <p>Date - <strong>23-7-2024</strong></p>
                                                            <hr className="mb-1 mt-5" />
                                                            <p>Signature</p>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="signature">
                                                            <p className="mb-0"><strong>Rv Technloggy</strong></p>
                                                            <p className="mb-0">Name - <strong>John</strong></p>
                                                            <p className="mb-0">Designation - <strong>Manager</strong></p>
                                                            <p>Date - <strong>23-7-2024</strong></p>
                                                            <hr className="mb-1 mt-5" />
                                                            <p>Signature</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </section>
                                            <section className="annexure-a">
                                                <h2 className="docs-head-section">Annexure A</h2>
                                                <h3 className="docs-head-section">Invoice Processing Cycle and Statutory Documents</h3>
                                                <h4 className="docs-head-section">One Time Registration</h4>
                                                <p>Company will require the following set of documents for registering Subcontractor in Company’s payment system:</p>
                                                <ul>
                                                    <li>Filled vendor consent Form (attached in the email shared with the Subcontractor)</li>
                                                    <li>Copy of GST Certificate</li>
                                                    <li>Copy of PAN</li>
                                                    <li>Copy of canceled cheque</li>
                                                    <li>Copy of MSME Certificate (if applicable)</li>
                                                </ul>
                                                <h4 className="docs-head-section">Invoice Processing Cycle</h4>
                                                <ul>
                                                    <li><strong>Timesheet:</strong> Timesheets need to be shared on the last day of every month after receiving the approved timesheet from the Resource.</li>
                                                    <li><strong>Invoice from Subcontractor:</strong> Based on the timesheet, Subcontractor may raise the invoice for the previous month. Company will require a signed copy of the invoice.</li>
                                                </ul>
                                                <h4 className="docs-head-section">Payment</h4>
                                                <p>Company will release the payment as per the terms agreed in the SOW after receiving the signed invoice along with the following set of statutory documents:</p>
                                                <ul>
                                                    <li>Copy of Provident Fund Challan</li>
                                                    <li>Copy of Provident Fund ECR (Electronic Challan cum Return) Acknowledgement</li>
                                                    <li>Copy of Provident Fund signed ECR</li>
                                                    <li>Copy of Provident Fund Payment acknowledgement</li>
                                                    <li>Profession Tax Challan</li>
                                                    <li>Labour welfare challan (Only in the month of June and Dec - MLWF)</li>
                                                    <li>ESIC (Employees' State Insurance Corporation)</li>
                                                </ul>
                                                <p>In case, any of the above listed statutory documents are not applicable to the Subcontractor, Subcontractor shall mention the same on its company letterhead, stamp and sign it and share it with the Company so that Company does not ask for the same in future.</p>
                                            </section>

                                            <footer className="confidential">
                                                <p><strong>PRIVATE AND CONFIDENTIAL</strong></p>
                                            </footer>

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default SingleDetailForm