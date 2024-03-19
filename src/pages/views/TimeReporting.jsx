import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditTimeModal from "./Modals/EditTimeModal";
import RexettTimeReporting from "../../components/clients/TimeReporiting/RexettTimeReporting";
import { timeReporting } from "../../redux/slices/clientDataSlice";
const TimeReporting = () => {
    const dispatch = useDispatch()
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const [selectedFilter, setSelectedFilter] = useState({});
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const { timeReportingData, smallLoader } = useSelector(state => state.clientData)
    
    useEffect(() => {
        let filterData = {
            ...selectedFilter,
            filter: selectedPeriod
        }
        dispatch(timeReporting(filterData,"client"))
    }, [dispatch])
   
    const handleShowEditTimeModal = () => {
        setShowEditTimeModal(true);
    };

    const handleCloseEditTimeModal = () => {
        setShowEditTimeModal(false);
    };

    return (
        <>
            <RexettTimeReporting  timeReportingData={timeReportingData} handleShowModal={handleShowEditTimeModal} role="client"/>
            <EditTimeModal show={showEditTimeModal} handleClose={handleCloseEditTimeModal} data={timeReportingData} smallLoader={smallLoader} />
        </>
    )
}
export default TimeReporting;