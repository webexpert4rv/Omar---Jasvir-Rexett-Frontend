import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../redux/slices/clientDataSlice";
import RexettTable from "../../components/clients/TimeReporiting/RexettTable";
import { TABLE_HEADER, getCurrentPeriodFromAPi, weeklyTimeReports } from "../../components/clients/TimeReporiting/constant";
import EditTimeModal from "./Modals/EditTimeModal";
import RexettButton from "../../components/atomic/RexettButton";
import RexettTimeReporting from "../../components/clients/TimeReporiting/RexettTimeReporting";
const TimeReporting = () => {
    const dispatch = useDispatch()
    const [showEditTimeModal, setShowEditTimeModal] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const [selectedFilter, setSelectedFilter] = useState({});
    const { timeReportingData, smallLoader } = useSelector(state => state.clientData)

    useEffect(() => {
        let filterData = {
            ...selectedFilter,
            filter: selectedPeriod
        }
        dispatch(timeReporting(filterData))
    }, [dispatch, selectedPeriod])

    const handleCloseEditTimeModal = () => {
        setShowEditTimeModal(false);
    };

    const handleShowModal = () => {
        setShowEditTimeModal(true);
    };


    return (
        <>
        <RexettTimeReporting  timeReportingData={timeReportingData} handleShowModal={handleShowModal} role="client"/>
          <EditTimeModal show={showEditTimeModal} handleClose={handleCloseEditTimeModal} data={timeReportingData} smallLoader={smallLoader} />
        </>
    )
}
export default TimeReporting;