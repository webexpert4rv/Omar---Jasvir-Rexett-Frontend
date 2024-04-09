import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getClientList, getVendorTimeReporting, getVendorWithClient } from "../../redux/slices/vendorDataSlice";
import UploadInvoice from "../admin/Modals/UploadInvoice";
import NoDataFound from "../../components/atomic/NoDataFound"

const VendorTimeReporting = () => {
    const dispatch = useDispatch()
    const { vendorTimeReport, screenLoader,clientList} = useSelector(state => state.vendorData)
    const [contractId, setContractID] = useState(null)
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const [developerData, setDeveloperData] = useState([])

    useEffect(() => {
        let newContacts = [...vendorTimeReport]
        let d = newContacts.map((item, index) => {
            return {
                ...item,
                newData: item.contracts[index] ? item.contracts[index] : item.contracts[0]
            };
        });

        setDeveloperData(d)

    }, [vendorTimeReport])

    useEffect(()=>{
        dispatch(getClientList())
         },[])


    const handleShowEditTimeModal = () => {
        setShowEditTimeModal(true);
    };
    const handleCloseEditTimeModal = () => {
        setShowEditTimeModal(false);
    };

    const [showUploadInvoice, setShowUploadInvoice] = useState(false);
    const handleShowUploadInvoice = (id) => {
        setShowUploadInvoice(true);
        setContractID(id)
    };

    const handleCloseUploadInvoice = () => {
        setShowUploadInvoice(false);
    };
    useEffect(() => {
        dispatch(getVendorTimeReporting())
    }, [])

    const contractName = (data) => {
        let devName = data.map((item) => {
            return { dev: item?.contractDetails?.developer.name }
        })
        return devName
    }

    const handleDeveloper = (e, inx) => {
        let newInx = e.target.value
        let newDev = [...developerData]
        newDev[inx].newData = newDev[inx].contracts[newInx]
        setDeveloperData(newDev)
    }

    const handleClient=(e)=>{
    dispatch(getVendorWithClient(e.target.value))
    }
    return (
        <>
            <section>
                <div className="filter-section mb-4">
                    <Form>
                        <div className="d-flex gap-3 justify-content-between align-items-end">
                            <div className="d-flex gap-3">
                                <div>
                                    <Form.Select className="filter-select shadow-none" onChange={handleClient} >
                                        <option value="" selected disabled>Select Clients</option>
                                        {
                                            clientList?.map((item) => {
                                                return (<>
                                                    <option value={item?.id}>{item?.name}</option>
                                                </>)
                                            })
                                        }
                                    </Form.Select>
                                </div>
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
                            {screenLoader ? <ScreenLoader /> : <tbody>
                                {
                                   developerData.length>0? developerData?.map((item, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td className="time-table-data">{item?.client_details?.name}</td>
                                                    <td className="time-table-data">{item?.contracts?.length}</td>
                                                    <td className="time-table-data">
                                                        <Form.Select className="status-select shadow-none" onChange={(e) => handleDeveloper(e, index)}>
                                                            {
                                                                contractName(item?.contracts)?.map((el, inx) => {
                                                                    return (
                                                                        <>
                                                                            <option value={inx}>{el?.dev}</option>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </td>
                                                    <td className="time-table-data">{item?.newData?.time_report?.totalDuration}hr</td>
                                                    <td className="time-table-data">{item?.newData?.contractDetails?.job_type}</td>
                                                    <td className="time-table-data">N/A</td>
                                                    <td className="time-table-data">
                                                        <label className="upload-invoice-label" onClick={() => handleShowUploadInvoice(item?.newData?.contractDetails?.id)}>Upload Invoice <HiUpload /></label>
                                                    </td>
                                                    <td className="time-table-data">{item?.newData?.contractDetails?.employment_type}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                :<td colSpan={9}><NoDataFound/></td>}

                            </tbody>}
                        </table>
                    </div>
                </div>
            </section>
            <UploadInvoice show={showUploadInvoice} handleClose={handleCloseUploadInvoice} contractId={contractId} />
        </>
    )
}
export default VendorTimeReporting;