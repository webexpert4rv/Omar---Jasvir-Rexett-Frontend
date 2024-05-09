import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
import { adminTimeReporting, editTimeReporting } from "../../../redux/slices/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
const EditTimeReport = ({ show, handleClose,adminTimeReportingList }) => {
    const [devloperState,setDeveloperState]=useState([])
    const {smallLoader}=useSelector(state=>state.adminData)
    const dispatch =useDispatch()
    const [time,setTime]=useState(null)
    const [hours,setHours]=useState(null)

    const handleClient=(e)=>{
     let copyList=[...adminTimeReportingList]
     let findData=copyList.find((item)=>item.client_details.id==e.target.value)
     let devName=findData?.contracts.map((item)=>{
        return { dev:item?.contractDetails?.developer.name,
        time:item?.time_report?.totalDuration,
        contract_id:item?.contractDetails?.id
        }
    })
    setDeveloperState(devName)
    }

    useEffect(()=>{
      return ()=>{
        setTime(null)
      }
    },[])

    const handleDeveloper=(e)=>{
    let obj=JSON.parse(e.target.value)
        setTime(obj)
    }

    const handleEditTime=async (e)=>{
        e.preventDefault()
        if(time==null){
            return 
        }

   let paylaod={
    "contract_id": time?.contract_id,
    "total_hours": hours
  }
  console.log(time.contractId,"contractId");
  await dispatch(editTimeReporting(paylaod))
  dispatch(adminTimeReporting())
  setTime(null)
  
  handleClose()
    }

    const handleChange=(e)=>{
        setHours(e.target.value)
        setTime({
            ...time,
            time:e.target.value
        })
    }
    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Edit Time Report</h3>
                <Form>
                    <Row>
                        <Col md="12">
                            <Form.Group className="mb-4">
                                <Form.Select className="common-field" onChange={handleClient}>
                                    <option selected disabled>Select Client</option>
                                     {
                                       adminTimeReportingList?.map((item)=>{
                                        return( <>
                                          <option value={item?.client_details?.id}>{item?.client_details?.name}</option>
                                        </>)
                                       }) 
                                     }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="12">
                            <Form.Group className="mb-4">
                                <Form.Select className="common-field" onChange={handleDeveloper}>
                                    <option selected disabled>Select Developer</option>
                                     {
                                       devloperState?.map((item)=>{
                                        return( <>
                                          <option value={JSON.stringify(item)}>{item?.dev}</option>
                                        </>)
                                       }) 
                                     }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="12">
                            <Form.Group className="mb-4">
                                <Form.Control type="text" className="common-field" placeholder="Enter Total Hours" value={time?.time} name="name" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-center">
                        <RexettButton
                            type="submit"
                            text="Submit"
                            className="main-btn px-4 font-14 fw-semibold"
                            variant="transparent"
                            onClick={handleEditTime}
                            isLoading={smallLoader}
                        />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default EditTimeReport;