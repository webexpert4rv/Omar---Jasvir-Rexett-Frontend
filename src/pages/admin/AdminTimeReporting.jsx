import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { HiUpload } from "react-icons/hi";
import EditTimeReport from "./Modals/EditTimeReportModal";
import UploadInvoice from "./Modals/UploadInvoice";
import { useDispatch, useSelector } from "react-redux";
import { adminTimeReporting } from "../../redux/slices/adminDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getClientList } from "../../redux/slices/vendorDataSlice";
import { useTranslation } from "react-i18next";
import NoDataFound from "../../components/atomic/NoDataFound";


const AdminTimeReporting = () => {
    const dispatch = useDispatch()
    const { adminTimeReportingList, screenLoader, adminClientList } = useSelector(state => state.adminData)
    const { clientList } = useSelector(state => state.vendorData)
    const [contractId, setContractID] = useState(null)
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const [developerData, setDeveloperData] = useState([])
    const { t } = useTranslation()


    useEffect(() => {
        let newContacts = [...adminTimeReportingList]
        let d = newContacts.map((item, index) => {
            return {
                ...item,
                newData: item.contracts[index] ? item.contracts[index] : item.contracts[0]
            };
        });

        setDeveloperData(d)

    }, [adminTimeReportingList])


    console.log(adminClientList, "adminClientList")
    // useEffect(()=>{
    //     dispatch(getClientList())
    //      },[])


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
        dispatch(adminTimeReporting())
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

    const handleClientClick = (e) => {
        dispatch(adminTimeReporting(e))
    }
    return (
        <>
            <section>
                <div className="filter-section mb-4">
                    <Form>
                        <div className="d-md-flex gap-3 justify-content-between align-items-end">
                            <div className="mb-md-0 mb-3">
                                <div>
                                    <Form.Select className="filter-select shadow-none" onClick={(e) => handleClientClick(e.target.value)}>
                                        <option value="" selected disabled>{t("selectClients")}</option>
                                        {
                                            adminClientList?.map((item, index) => {
                                                return (<>
                                                    <option key={index} value={item.id}  >{item?.name}</option>
                                                </>)
                                            })
                                        }
                                    </Form.Select>
                                </div>
                            </div>
                            <div>
                                <Button className="main-btn px-5" onClick={handleShowEditTimeModal}>{t("editTimeReport")}</Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div>
                    <div className="table-responsive">
                        <table className="table time-table table-bordered table-ui-custom">
                            <thead>
                                <th className="time-table-head">
                                    {t("clientName")}
                                </th>
                                <th className="time-table-head">
                                    {t("noOfDevelopersHired")}
                                </th>
                                <th className="time-table-head">
                                    {t("nameOfDevelopers")}
                                </th>
                                <th className="time-table-head">
                                    {t("totalHours")}
                                </th>
                                <th className="time-table-head">
                                    {t("location")}
                                </th>
                                <th className="time-table-head">
                                    {t("redeem")}
                                </th>
                                <th className="time-table-head">
                                    {t("invoice")}
                                </th>
                                <th className="time-table-head">
                                    {t("contract")}
                                </th>
                            </thead>
                            <tbody>
                                {screenLoader ? <ScreenLoader /> : <>
                                    {developerData?.length > 0 ?
                                        developerData?.map((item, index) => {
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
                                        : <td colSpan={6}><NoDataFound /></td>}
                                </>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <EditTimeReport show={showEditTimeModal} handleClose={handleCloseEditTimeModal} adminTimeReportingList={adminTimeReportingList} />
            <UploadInvoice show={showUploadInvoice} handleClose={handleCloseUploadInvoice} contractId={contractId} role={"admin"} />
        </>
    )
}
export default AdminTimeReporting;