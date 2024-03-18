import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Collapse } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { getAllContracts, getPreviousTimeReports, saveTimeReports } from "../../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";
const AddTimingModal = ({ show, handleClose }) => {
    const dispatch =useDispatch()
    const [selectDay, setDaySelection] = useState(null);
    const [disabledWorkDay, setDisabledWorkDay] = useState([]);
    const [selectedFilter,setSelectedFilter]=useState()
    const [open, setOpen] = useState(false);
    const [timeReportingData,setTimeReportingData]=useState([])
    const { register, control, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "addTime" });
    const {allContracts,addTimeReports}=useSelector(state=>state.developerData)

    console.log(addTimeReports,"addTimeReports")

    useEffect(()=>{
        dispatch(getAllContracts())
    },[])

    console.log(allContracts,"allContracts")

    const getCurrentWeekDates = () => {
        const today = new Date();
        const currentDay = today.getDay();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - currentDay);
       let formattedDate="";
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
             formattedDate = date.getFullYear() + '-' + 
            ('0' + (date.getMonth() + 1)).slice(-2) + '-' + 
            ('0' + date.getDate()).slice(-2);
            weekDates.push({report_date:formattedDate});
        }
        setTimeReportingData(weekDates)
    };

    useEffect(()=>{
        if(addTimeReports.length>0){
            setTimeReportingData(addTimeReports)
        }else{
            getCurrentWeekDates()
        }
    },[addTimeReports])

    useEffect(() => {
        if(timeReportingData?.length>0){
        timeReportingData?.forEach((item) => {
                append({
                    "report_date": item?.report_date,
                    "is_off_day": false,
                    "start_time": item?.start_time?item?.start_time:null,
                    "end_time":item?.start_time?item?.end_time:null,
                    "memo":item?.memo?item?.memo:null,
                });
                setDisabledWorkDay(prevState => [...prevState, item.is_off_day?item.is_off_day:false]);
            });
        }   
        
    }, [timeReportingData]);

console.log(timeReportingData,"timeReportingData")

const handleWorkDaysChange = (e,index,state) => {
    if(state){
      const updatedDisabledEndDates = [...disabledWorkDay];
      updatedDisabledEndDates[index] = true;
      setDisabledWorkDay(updatedDisabledEndDates);
    }else{
      const updatedDisabledEndDates = [...disabledWorkDay];
      updatedDisabledEndDates[index] = false;
      setDisabledWorkDay(updatedDisabledEndDates);
    }
    
}
console.log(disabledWorkDay,"disabledWorkDay")

    const onSubmit=(values)=>{
console.log(values,"hhhh")
let payloadData={
    contract_id:+selectedFilter?.contract_id,
     reports:values?.addTime
}
dispatch(saveTimeReports(payloadData))
    }
console.log(fields,"fields")
const handleChange=(e,select)=>{
    setSelectedFilter({
        ...selectedFilter,
        [select]:e.target.value
    })
 }

 const handlePrevTimeReporting=()=>{
    dispatch(getPreviousTimeReports(selectedFilter))
    remove();
 }

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg" scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Add Time</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="experience-container">
                        <div className="mb-3">
                            <Button variant="transparent" className="main-btn px-3" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} >
                                Update Previous Time Report
                            </Button>
                            <Collapse in={open}>
                                <div className="mt-2">
                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <div>
                                                <Form.Label className="common-label">Select Year</Form.Label>
                                                <Form.Select className="shadow-none"
                                                 onChange={(e)=>handleChange(e,"year")}
                                                >     <option disabled selected >Select Year</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2017">2017</option>
                                                </Form.Select>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <div>
                                                <Form.Label className="common-label">Select Month</Form.Label>
                                                <Form.Select className="shadow-none"
                                                onChange={(e)=>handleChange(e,"month")}
                                                >
                                                        <option disabled selected >Select Month</option>
                                                    <option value="1">January</option>
                                                    <option value="2">Feburary</option>
                                                    <option value="3">March</option>
                                                    <option value="4">April</option>
                                                    <option value="5">May</option>
                                                    <option value="6">June</option>
                                                    <option value="7">July</option>
                                                    <option value="8">August</option>
                                                    <option value="9">September</option>
                                                    <option value="10">October</option>
                                                    <option value="11">November</option>
                                                    <option value="12">December</option>
                                                </Form.Select>
                                            </div>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <div>
                                                <Form.Label className="common-label">Select Week</Form.Label>
                                                <Form.Select className="shadow-none"
                                                onChange={(e)=>handleChange(e,"week")}
                                                >
                                                    <option disabled selected >Select Week</option>
                                                    <option value="1">Week 1</option>
                                                    <option value="2">Week 2</option>
                                                    <option value="3">Week 3</option>
                                                    <option value="4">Week 4</option>
                                                </Form.Select>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>
                          
                        </div>
                        <Row>
                            <Col md={12} className="border-bottom mb-2 pb-4">
                                <Form.Group>
                                    <Form.Label>Client Name</Form.Label>
                                    <Form.Select className="shadow-none"
                                     onChange={(e)=>handleChange(e,"contract_id")}
                                    >
                                             <option disabled selected >Select Client Name</option>
                                       
                                        {
                                            allContracts?.map((item)=>{
                                                return (
                                                    <>
                                                     <option value={item?.id}>{item?.client?.name}</option>
                                                    </>
                                                )
                                            })
                                        }

                                    </Form.Select>
                                </Form.Group>
                          {open ?      <div className="text-center mt-2">
                        <Button variant="transparent" onClick={handlePrevTimeReporting} className="main-btn px-4">Get Previous Time Report</Button>
                    </div>:""}
                            </Col>
                            
                        </Row>
                        
                        {
                            fields?.map((item, index) => {
                                
                                return (
                                    <>
                                        <div className="time-row">
                                            <Row>
                                                <Col md={3}>
                                                    <Form.Label>{item?.report_date}</Form.Label>
                                                </Col>
                                                <Col md={9}>
                                                    <Form.Group className="">
                                                        <Form.Label className="d-block font-15 mb-1">Select Day</Form.Label>
                                                        <Form.Check inline type="radio" value="work-day" name="day-select"   onChange={(e) => handleWorkDaysChange(e,index,true)} className="font-15" id="work-day" label="Work Day" />
                                                        <Form.Check inline type="radio" value="off-day" name="day-select"     onChange={(e) => handleWorkDaysChange(e,index,false)} className="font-15" id="off-day" label="Holiday Day"/>
                                                    </Form.Group>
                                                    <div className={disabledWorkDay[index]  ? '' : 'cv-template-section cv-template1 d-none'}>
                                                        <Row className="mt-0">
                                                            <Col md="6">
                                                                <Form.Group>
                                                                    <Form.Label className="font-13">Start Time</Form.Label>
                                                                    <Form.Control type="time" className="cv-field font-13"
                                                                    {...register(`addTime.${index}.start_time`, { required: false })}
                                                                    defaultValue={item.start_time}
                                                                  
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md="6">
                                                                <Form.Group>
                                                                    <Form.Label className="font-13">End Time</Form.Label>
                                                                    <Form.Control type="time" className="cv-field font-13"
                                                                      {...register(`addTime.${index}.end_time`, { required: false })}
                                                                      defaultValue={item.end_time}
                                                                  
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="font-13">Memo</Form.Label>
                                                        <Form.Control type="text" className="cv-field font-13" placeholder="Add Memo"
                                                         {...register(`addTime.${index}.memo`, { required: false })}
                                                         defaultValue={item.memo}
                                                        
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                    <div className="text-center mt-2">
                        <Button variant="transparent" type="submit" className="main-btn px-4">Submit</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default AddTimingModal;