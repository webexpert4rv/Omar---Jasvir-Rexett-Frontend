import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../assets/img/user-img.jpg'
import AddTimingModal from "../../components/common/Modals/AddTiming";
import RexettTimeReporting from "../../components/clients/TimeReporiting/RexettTimeReporting";
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../redux/slices/clientDataSlice";
const DeveloperTimeReporting = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const [selectedFilter, setSelectedFilter] = useState({});
    const { timeReportingData, smallLoader } = useSelector(state => state.clientData)   
    // useEffect(() => {
    //     let filterData = {
    //         ...selectedFilter,
    //         filter: selectedPeriod
    //     }
    //     dispatch(timeReporting(filterData,"developer"))
    // }, [dispatch])

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseAddTimingModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <RexettTimeReporting  timeReportingData={timeReportingData} handleShowModal={handleShowModal} role="developer"/>
            {showModal?<AddTimingModal show={showModal} handleClose={handleCloseAddTimingModal} role="developer" />:""}
        </>
    )
}
export default DeveloperTimeReporting;