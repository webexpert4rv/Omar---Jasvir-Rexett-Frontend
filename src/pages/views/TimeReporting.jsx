import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditTimeModal from "./Modals/EditTimeModal";
import RexettTimeReporting from "../../components/clients/TimeReporiting/RexettTimeReporting";
const TimeReporting = () => {
    
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const { timeReportingData, smallLoader } = useSelector(state => state.clientData)
   
    const handleShowEditTimeModal = () => {
        setShowEditTimeModal(true);
    };

    const handleCloseEditTimeModal = () => {
        setShowEditTimeModal(false);
    };



    return (
        <>
            <RexettTimeReporting  timeReportingData={timeReportingData} handleShowModal={handleShowEditTimeModal} role="developer"/>
            <EditTimeModal show={showEditTimeModal} handleClose={handleCloseEditTimeModal} data={timeReportingData} smallLoader={smallLoader} />
        </>
    )
}
export default TimeReporting;