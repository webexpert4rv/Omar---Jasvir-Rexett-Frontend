import React, { Fragment, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { adminTimeReporting } from "../../redux/slices/adminDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getClientList, getVendorTimeReporting } from "../../redux/slices/vendorDataSlice";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import NoDataFound from "../../components/atomic/NoDataFound";
import { useNavigate } from "react-router-dom";
import EditTimeReport from "../admin/Modals/EditTimeReportModal";


const TimeReporting = () => {
    const dispatch = useDispatch()
    const { vendorTimeReport,screenLoader } = useSelector(state => state.vendorData);
    const [contractId, setContractID] = useState(null);
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const [developerData, setDeveloperData] = useState([])
    const { t } = useTranslation()
    const navigate=useNavigate()

    useEffect(() => {
        dispatch(getVendorTimeReporting())
    }, [])

    const handleShowEditTimeModal = () => {
        setShowEditTimeModal(true);
    };
    const handleCloseEditTimeModal = () => {
        setShowEditTimeModal(false);
    };
    const handleRowClick = ()=>{
        navigate("/vendor-time-detail")
    }

    console.log(vendorTimeReport,"vendorTimeReport")


    const [showUploadInvoice, setShowUploadInvoice] = useState(false);
    const handleShowUploadInvoice = (id) => {
        setShowUploadInvoice(true);
        setContractID(id)
    };

    const handleCloseUploadInvoice = () => {
        setShowUploadInvoice(false);
    };
    

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
    
    const redirectToTimeReporting = (id) => {
        navigate(`/vendor-time-detail/${id}`)
    }
    return (
        <>
            <section>
                <div className="filter-section mb-4">
                    <Form>
                        <div className="d-md-flex gap-3 justify-content-between align-items-end">
                            <div className="mb-md-0 mb-3">
                                {/* <div>
                                    <Form.Selxect className="filter-select shadow-none" onClick={(e) => handleClientClick(e.target.value)}>
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
                                <th className="time-table-head text-start">
                                    Project Name
                                </th>
                                <th className="time-table-head text-start">
                                    Project start date
                                </th>
                                <th className="time-table-head text-start">
                                    {t("totalHiredDevelopers")}
                                </th>
                                <th className="time-table-head text-start">
                                    Total hours spend
                                </th>
                                {/* <th className="time-table-head">
                                    {t("contract")}
                                </th> */}
                            </thead>
                            <tbody>
                
                                {screenLoader ? <ScreenLoader /> : <>
                                    {vendorTimeReport?.length > 0 ?
                                        vendorTimeReport?.map(({id,developers_count,project_name,start_date,total_hours}, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <tr key={id} className="row-hover" onClick={()=>{redirectToTimeReporting(id)}}>
                                                        <td className="time-table-data">{project_name}</td>
                                                        <td className="time-table-data">{start_date?.slice(0,10)}</td>
                                                        <td className="time-table-data">{developers_count}</td>
                                                        <td className="time-table-data">{total_hours}</td>
                                                    </tr>
                                                </Fragment>
                                            )
                                        })
                                        : <td colSpan={10}> <div className="simple-no-data">  <NoDataFound/></div>  </td>
                                        }
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
        </>
    )
}
export default TimeReporting;