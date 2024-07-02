import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { addFileInvoice, getDeveloperList, getClientList } from "../../redux/slices/vendorDataSlice";
import { filePreassignedUrlGenerate } from "../../redux/slices/clientDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import timeSheetIcon from '../../assets/img/timesheet-icon.svg';
import invoiceIcon from '../../assets/img/invoice-icon.svg'
import { IoSearch } from "react-icons/io5";
import userImage from "../../assets/img/user-img.jpg"
import { RxChevronRight } from "react-icons/rx";
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
                            <option>Select Project</option>
                            <option>AI Chat bot</option>
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
                            Project name
                        </th>
                        <th className="time-table-head text-start">
                            Total hired developers
                        </th>
                        <th className="time-table-head text-start">
                            Total invoice raised
                        </th>
                        <th className="time-table-head text-start">
                            Total hours spend
                        </th>
                        <th className="time-table-head text-start">
                            Start date
                        </th>
                        <th className="time-table-head text-start">
                            Invoice Month
                        </th>
                        <th className="time-table-head text-start">
                            Project Status
                        </th>
                    </thead>
                    <tbody>
                        <tr className="application-row">
                            <td className="time-table-data text-start">
                                <span className="developers row-arrow">
                                    <RxChevronRight />
                                </span>
                                Figma to UI
                            </td>
                            <td className="time-table-data text-start">
                                3
                            </td>
                            <td className="time-table-data text-start">
                                5
                            </td>
                            <td className="time-table-data text-start">
                                3000hrs.
                            </td>
                            <td className="time-table-data text-start">
                                10-04-2024
                            </td>
                            <td className="time-table-data text-start">
                                Jun 2024
                            </td>
                            <td className="time-table-data text-start">
                                <span className="status-progress">Progress</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7">
                                <div className="table-responsive">
                                    <table className="table time-table table-bordered table-ui-custom mb-0">
                                        <thead>
                                            <th className="time-table-head text-start">
                                                Developer Name
                                            </th>
                                            <th className="time-table-head text-start">
                                                Total hours spend
                                            </th>
                                            <th className="time-table-head text-start">
                                                Invoice Month
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
                                                        John Smith
                                                    </div>
                                                </td>
                                                <td className="time-table-data text-start">140 hrs</td>
                                                <td className="time-table-data text-start">Jun 2024</td>
                                                <td className="time-table-data text-start">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                            <Button className="main-btn font-14">
                                                                <img src={timeSheetIcon} className="timesheet-icon" />
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                            <Button className="main-btn font-14">
                                                                <img src={invoiceIcon} className="invoice-icon" />
                                                            </Button>
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
                                                        Emily Davis
                                                    </div>
                                                </td>
                                                <td className="time-table-data text-start">140 hrs</td>
                                                <td className="time-table-data text-start">Jun 2024</td>
                                                <td className="time-table-data text-start">
                                                <div className="d-flex align-items-center gap-2">
                                                        <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                            <Button className="main-btn font-14">
                                                                <img src={timeSheetIcon} className="timesheet-icon" />
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                            <Button className="main-btn font-14">
                                                                <img src={invoiceIcon} className="invoice-icon" />
                                                            </Button>
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
                                                        James Taylor
                                                    </div>
                                                </td>
                                                <td className="time-table-data text-start">140 hrs</td>
                                                <td className="time-table-data text-start">Jun 2024</td>
                                                <td className="time-table-data text-start">
                                                <div className="d-flex align-items-center gap-2">
                                                        <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                                                            <Button className="main-btn font-14">
                                                                <img src={timeSheetIcon} className="timesheet-icon" />
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                                                            <Button className="main-btn font-14">
                                                                <img src={invoiceIcon} className="invoice-icon" />
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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