import React, {useEffect, useState} from "react";
import { Form, Button } from "react-bootstrap";
import { HiUpload } from "react-icons/hi";
import EditTimeReport from "./Modals/EditTimeReportModal";
import UploadInvoice from "./Modals/UploadInvoice";
import { useDispatch, useSelector } from "react-redux";
import { adminTimeReporting } from "../../redux/slices/adminDataSlice";
const AdminTimeReporting = () => {
    const dispatch =useDispatch()
    const {adminTimeReportingList}=useSelector(state=>state.adminData)
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const handleShowEditTimeModal = () => {
        setShowEditTimeModal(true);
    };
console.log(adminTimeReportingList,"|adminTimeReportingList")
    const handleCloseEditTimeModal = () => {
        setShowEditTimeModal(false);
    };

    const [showUploadInvoice, setShowUploadInvoice] = useState(false);
    const handleShowUploadInvoice = () => {
        setShowUploadInvoice(true);
    };

    const handleCloseUploadInvoice = () => {
        setShowUploadInvoice(false);
    };
    useEffect(()=>{
    dispatch(adminTimeReporting())
    },[])
    return (
        <>
            <section>
                <div className="filter-section mb-4">
                    <Form>
                        <div className="d-flex gap-3 justify-content-between align-items-end">
                            <div className="d-flex gap-3">
                                <div>
                                    <Form.Select className="filter-select shadow-none">
                                        <option value="" selected disabled>Select Clients</option>
                                        <option value="bmw">BMW</option>
                                        <option value="volvo">Volvo</option>
                                        <option value="amazon">Amazon</option>
                                    </Form.Select>
                                </div>
                            </div>
                            <div>
                                <Button className="main-btn px-5" onClick={handleShowEditTimeModal}>Edit Time Report</Button>
                            </div>
                        </div>
                    </Form>
                </div>
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
                                    Invoice
                                </th>
                                <th className="time-table-head">
                                    Contract
                                </th>
                            </thead>
                            <tbody>
                                {
                                    adminTimeReportingList?.map((item,index)=>{
                                        return (
                                            <>
                                               <tr>
                                    <td className="time-table-data">{item?.client_details?.name}</td>
                                    <td className="time-table-data">{item?.contracts.length}</td>
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
                                    <td className="time-table-data">
                                        <label className="upload-invoice-label" onClick={handleShowUploadInvoice}>Upload Invoice <HiUpload /></label>
                                    </td>
                                    <td className="time-table-data">Hourly</td>
                                </tr>
                                            </>
                                        )
                                    })
                                }
                             
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <EditTimeReport show={showEditTimeModal} handleClose={handleCloseEditTimeModal} />
            <UploadInvoice show={showUploadInvoice} handleClose={handleCloseUploadInvoice} />
        </>
    )
}
export default AdminTimeReporting;