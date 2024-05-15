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
import { IoSearch } from "react-icons/io5";
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
                                {/* <div>
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
                                </div> */}
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
                            {/* <div>
                                <Button className="main-btn px-5" onClick={handleShowEditTimeModal}>{t("editTimeReport")}</Button>
                            </div> */}
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
                                    Total Hired Developers
                                </th>
                                <th className="time-table-head">
                                    Total Projects
                                </th>
                                <th className="time-table-head">
                                    Total Vendor's Dev
                                </th>
                                <th className="time-table-head">
                                    Total Individual Dev
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
                                                    <tr className="row-hover">
                                                        <td className="time-table-data">{item?.client_details?.name}</td>
                                                        <td className="time-table-data">{item?.contracts?.length}</td>
                                                        <td className="time-table-data">5</td>
                                                        <td className="time-table-data">4</td>
                                                        <td className="time-table-data">3</td>
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
                    <div className="helper-text-section">
                        <h3>Guiding You Through: Helpful Text to Navigate Time Reporting</h3>
                        <p>Admin can effortlessly review daily time sheets and promptly raise invoices for clients. Click on any client's name in the table above to delve deeper into their project and time reporting details. Gain insights and manage project progress with precision. Also you can raise invoice for clients and track the invoices for Devs , Vendors and Clients.</p>
                    </div>
                </div>
            </section>
            <EditTimeReport show={showEditTimeModal} handleClose={handleCloseEditTimeModal} adminTimeReportingList={adminTimeReportingList} />
            <UploadInvoice show={showUploadInvoice} handleClose={handleCloseUploadInvoice} contractId={contractId} role={"admin"} />
        </>
    )
}
export default AdminTimeReporting;