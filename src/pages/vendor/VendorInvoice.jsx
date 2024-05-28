import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { addFileInvoice, getDeveloperList, getClientList } from "../../redux/slices/vendorDataSlice";
import { filePreassignedUrlGenerate } from "../../redux/slices/clientDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import timeSheetIcon from '../../assets/img/timesheet_approved.png';
import companyLogo from "../../assets/img/amazon.png"
import invoiceIcon from '../../assets/img/invoice_paid.png'
import timeSheetNotApproved from '../../assets/img/timesheet_notapproved.png';
import invoiceUnpaid from '../../assets/img/invoice_unpaid.png'
import { IoSearch } from "react-icons/io5";
import userImage from "../../assets/img/user-img.jpg"
const VendorInvoice = () => {
    const dispatch = useDispatch()
    const [ids, setIds] = useState({
        client: '',
        developer: ''
    })
    const [file, setFile] = useState(null)
    const { clientList, developerList, } = useSelector(state => state.vendorData)
    const { smallLoader } = useSelector(state => state.clientData)
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getClientList())
    }, [])


    const handleClient = (e) => {
        setIds({ ...ids, client: e.target.value })
        dispatch(getDeveloperList(e.target.value))
    }

    const handleDeveloper = (e) => {
        setIds({ ...ids, developer: e.target.value })
    }


    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const submitFile = (e) => {
        e.preventDefault()
        let fileData = new FormData();
        fileData.append("file", file);
        console.log(file?.type, "file")
        if (file?.type !== "application/pdf") {
            alert("Only PDF files are allowed for Invoices .");
            return;
        }
        if (ids.client !== '' && ids.developer !== '' && file !== null) {
            dispatch(filePreassignedUrlGenerate(fileData, (url) => {
                let payload = {
                    "client_id": +ids.client,
                    "developer_id": +ids.developer,
                    "file_type": 1,
                    "parent_id": 0,
                    "type": 3,
                    "s3_path": url,
                    "file_extension": "0"
                }
                dispatch(addFileInvoice(payload))
            }))
        }
    }
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
    //   const companyname = (

    //     <Tooltip id="tooltip">
    //       Aviox Technologies Pvt Ltd
    //     </Tooltip>
    //   );
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
                            <option>Select Client</option>
                            <option>Amazon</option>
                            <option>Amazon</option>
                            <option>Amazon</option>
                            <option>Amazon</option>
                            <option>Amazon</option>
                        </Form.Select>
                    </div>
                    <div>
                        <Form.Select className="time-filter-select shadow-none">
                            <option>Select Developer</option>
                            <option>Rohit Sharma</option>
                        </Form.Select>
                    </div>
                    <div>
                        <Form.Select className="time-filter-select shadow-none">
                            <option>Invoice Status</option>
                            <option>Paid</option>
                            <option>Unpaid</option>
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
                            Developer Name
                        </th>
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
                                        <img src={userImage} className="user-img" />
                                    </div>
                                    Rohit Sharma
                                </div>
                            </td>
                            <td className="time-table-data text-start">
                                <div className="text-start">
                                    <div className="user-imgbx d-inline-flex align-items-center gap-2 application-imgbx associated-logo mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                        Amazon
                                    </div>
                                </div>
                            </td>
                            <td className="time-table-data text-start">AI Bot Project</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <img src={timeSheetIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <img src={invoiceIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                </div>
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
                                <div className="text-start">
                                    <div className="user-imgbx d-inline-flex align-items-center gap-2 application-imgbx associated-logo mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                        Amazon
                                    </div>
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <img src={timeSheetNotApproved} className="approved_icon" />
                                    <img src={invoiceUnpaid} className="approved_icon" />
                                </div>
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
                                <div className="text-start">
                                    <div className="user-imgbx d-inline-flex align-items-center gap-2 application-imgbx associated-logo mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                        Amazon
                                    </div>
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <img src={timeSheetIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <img src={invoiceIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                </div>
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
                                <div className="text-start">
                                    <div className="user-imgbx d-inline-flex align-items-center gap-2 application-imgbx associated-logo mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                        Amazon
                                    </div>
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <img src={timeSheetIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <img src={invoiceIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                </div>
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
                                <div className="text-start">
                                    <div className="user-imgbx d-inline-flex align-items-center gap-2 application-imgbx associated-logo mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                        Amazon
                                    </div>
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <img src={timeSheetIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <img src={invoiceIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                </div>
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
                                <div className="text-start">
                                    <div className="user-imgbx d-inline-flex align-items-center gap-2 application-imgbx associated-logo mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                        Amazon
                                    </div>
                                </div>
                            </td>
                            <td className="time-table-data text-start">Figma to UI</td>
                            <td className="time-table-data text-start">140 hrs</td>
                            <td className="time-table-data text-start">Jan 2024</td>
                            <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                            <td className="time-table-data text-start">
                                <div className="d-flex align-items-center gap-2">
                                    <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                        <img src={timeSheetIcon} className="approved_icon" />
                                    </OverlayTrigger>
                                    <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                        <img src={invoiceIcon} className="approved_icon" />
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
export default VendorInvoice;