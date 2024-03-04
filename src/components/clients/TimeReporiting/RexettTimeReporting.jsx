import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import developerImg from '../../../assets/img/user-img.jpg'
import { useDispatch, useSelector } from "react-redux";
import { timeReporting } from "../../../redux/slices/clientDataSlice";
import RexettTable from "../../../components/clients/TimeReporiting/RexettTable";
import { TABLE_HEADER, getCurrentPeriodFromAPi, weeklyTimeReports } from "../../../components/clients/TimeReporiting/constant";
// import EditTimeModal from "./Modals/EditTimeModal";
import RexettButton from "../../../components/atomic/RexettButton";
const RexettTimeReporting = ({timeReportingData,handleShowModal,role}) => {
    const dispatch = useDispatch()
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const [selectedFilter, setSelectedFilter] = useState({});
    const [currentDayType, setCurrentDayType] = useState("");
    const [timerValue, setTimerValue] = useState("");
    const [error, setError] = useState({ isTrue: false, message: "" })

    const {smallLoader } = useSelector(state => state.clientData)


    useEffect(() => {
        if (timeReportingData[0]?.timeReports) {
            setSelectedPeriod(getCurrentPeriodFromAPi(timeReportingData[0]?.timeReports))
        }
    }, [timeReportingData])

    const handlePeriodChange = (e) => {
        setSelectedPeriod(e.target.value);
        if(selectedFilter.startDate ||  selectedFilter.endDate){
            setSelectedFilter({ startDate: "", endDate: "" })
        }
        setError({ isTrue: false, message: "" })

    };


    const handleDate = (e) => {
        setSelectedFilter({
            ...selectedFilter,
            [e.target.name]: e.target.value
        })
        setError({ isTrue: false, message: "" })


    }
    const handleFilter = () => {
        if ((Object.keys(selectedFilter).length > 0)) {
            if ((!selectedFilter.startDate && !selectedFilter.work_day &&  !selectedFilter.off_day)
             || (!selectedFilter.endDate && !selectedFilter.work_day && !selectedFilter.off_day )
             || (selectedFilter.startDate && !selectedFilter.endDate && selectedFilter.work_day ) 
             || (!selectedFilter.startDate && selectedFilter.endDate && selectedFilter.work_day ) 
             || (selectedFilter.startDate && !selectedFilter.endDate && selectedFilter.off_day ) 
             || (!selectedFilter.startDate && selectedFilter.endDate && selectedFilter.off_day )
             ) {
                
                setError({ isTrue: true, message: "Start date and End Date Required" })

            } else if (selectedFilter.startDate > selectedFilter.endDate) {
                setError({ isTrue: true, message: "End date always greater then Start Day" })
            } else {
                dispatch(timeReporting(selectedFilter))
                setError({ isTrue: false, message: "" })
            }
        }


    }

    const handleOffWorkDay = (e, name) => {
        setCurrentDayType(prevState => ({
            ...prevState,
            day_type: e.target.value
        }));

        setSelectedFilter(prevState => ({
            ...prevState,
            work_day: e.target.value === "work_day" ? true : false,
            off_day: e.target.value === "off_day" ? true : false
        }));
    }

    const handleSearchChange = (e) => {
        setError({ isTrue: false, message: "" })
        setSelectedFilter(prevState => ({
            ...prevState,
            search: e.target.value
        }));
        clearTimeout(timerValue);
        const timer = setTimeout(() => {
            let filterData = {
                ...selectedFilter,
                search: e.target.value
            }
            dispatch(timeReporting(filterData))
        }, 500);
        setTimerValue(timer);

    }
    return (
        <>
            <section>
                <Form className="mb-4">
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-flex gap-3">
                            <div>
                                <Form.Label className="common-label">From</Form.Label>
                                <Form.Control type="date" className="filter-field shadow-none" value={selectedFilter?.startDate} name="startDate" onChange={handleDate}
                                    max={new Date().toISOString().split("T")[0]}
                                ></Form.Control>
                            </div>
                            <div>
                                <Form.Label className="common-label">To</Form.Label>
                                <Form.Control type="date" className="filter-field shadow-none" value={selectedFilter?.endDate} name="endDate" onChange={handleDate}
                                    max={new Date().toISOString().split("T")[0]}
                                ></Form.Control>
                            </div>
                        </div>
                        <div className="flex-none">
                            <Form.Label className="common-label">Select Period</Form.Label>
                            <Form.Select className="filter-select shadow-none" onChange={handlePeriodChange} value={selectedPeriod}>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div className="error-message">{error.isTrue ? error?.message : ""}</div>
                </Form>
                <div className="indicator-time-slot d-flex gap-3 align-items-center flex-wrap mb-4">
                    <div className="d-inline-flex align-items-center gap-1">
                        <input className="slot-indicate offday" type="radio" value="off_day" checked={currentDayType?.day_type === "off_day"} onChange={(e) => handleOffWorkDay(e, "off_day")} />
                        <span>Off Day</span>
                    </div>
                    <div className="d-inline-flex align-items-center gap-1">
                        <input className="slot-indicate workday" type="radio" value="work_day" checked={currentDayType?.day_type === "work_day"} onChange={(e) => handleOffWorkDay(e, "work_day")} />
                        <span>Work Day</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex gap-3 w-50">
                        <Form.Control type="text" placeholder="Search" className="search-field" onChange={handleSearchChange}></Form.Control>
                        <RexettButton
                            text="Filter"
                            className="main-btn px-5"
                            variant="transparent"
                            onClick={handleFilter}
                            isLoading={Object.keys(selectedFilter).length > 0?smallLoader:false}
                        />
                    </div>
                    <div>
                        <Button variant="transparent" onClick={handleShowModal} className="main-btn px-5">{role==="client"?`Edit Time Report`:"Add Time"}</Button>
                    </div>
                </div>
                <RexettTable headerColumn={weeklyTimeReports(timeReportingData[0], selectedPeriod)} selectedPeriod={selectedPeriod} data={timeReportingData} role={role} />

            </section>
        </>
    )
}
export default RexettTimeReporting;