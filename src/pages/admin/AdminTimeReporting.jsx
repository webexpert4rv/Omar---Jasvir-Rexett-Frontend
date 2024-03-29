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
    const [contractId,setContractID]=useState(null)
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const [developerData,setDeveloperData]=useState([])


    useEffect(()=>{
        let newContacts= [...adminTimeReportingList]
        let d = newContacts.map((item,index) => {
            return {...item,
              newData:  item.contracts[index]?item.contracts[index] :item.contracts[0]};
        });
        
        console.log(d, "opp");
        setDeveloperData(d)
        
    },[adminTimeReportingList])
 
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
    useEffect(()=>{
    dispatch(adminTimeReporting())
    },[])

    const contractName=(data)=>{
        let devName=data.map((item)=>{
            return { dev:item?.contractDetails?.developer.name}
        })
        return devName
    }

    const handleDeveloper=(e,inx)=>{
        let newInx=e.target.value
        let newDev= [...developerData]
       newDev[inx].newData=newDev[inx].contracts[newInx]
       setDeveloperData(newDev)   
    }
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
                                        {
                                       adminTimeReportingList?.map((item)=>{
                                        return( <>
                                          <option value={item?.client_details?.name}>{item?.client_details?.name}</option>
                                        </>)
                                       }) 
                                     }
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
                                    developerData?.map((item,index)=>{
                                        return (
                                            <>
                                               <tr>
                                    <td className="time-table-data">{item?.client_details?.name}</td>
                                    <td className="time-table-data">{item?.contracts?.length}</td>
                                    <td className="time-table-data">
                                        <Form.Select className="status-select shadow-none" onChange={(e)=>handleDeveloper(e,index)}>
                                            {
                                              contractName(item?.contracts)?.map((el,inx)=>{
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
                                        <label className="upload-invoice-label" onClick={()=>handleShowUploadInvoice(item?.newData?.contractDetails?.id)}>Upload Invoice <HiUpload /></label>
                                    </td>
                                    <td className="time-table-data">{item?.newData?.contractDetails?.employment_type}</td>
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
            <EditTimeReport show={showEditTimeModal} handleClose={handleCloseEditTimeModal} adminTimeReportingList={adminTimeReportingList} />
            <UploadInvoice show={showUploadInvoice} handleClose={handleCloseUploadInvoice} contractId={contractId} />
        </>
    )
}
export default AdminTimeReporting;