import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const EditTimeReport = ({ show, handleClose,adminTimeReportingList }) => {
    const [devloperState,setDeveloperState]=useState([])
    const [time,setTime]=useState(null)

    const handleClient=(e)=>{
     let copyList=[...adminTimeReportingList]
     let findData=copyList.find((item)=>item.client_details.id==e.target.value)
     let devName=findData?.contracts.map((item)=>{
        return { dev:item?.contractDetails?.developer.name,
        time:item?.time_report?.totalDuration
        }
    })
    setDeveloperState(devName)
     console.log(devName)
    }

    const handleDeveloper=(e)=>{
        console.log(e.target.value)
        setTime(e.target.value)

    }
    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>End Time Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row>
                        <Col md="12">
                            <Form.Group className="mb-4">
                                <Form.Label>Select Client</Form.Label>
                                <Form.Select onChange={handleClient}>
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
                                <Form.Label>Select Developer</Form.Label>
                                <Form.Select onChange={handleDeveloper}>
                                    <option selected disabled>Select Client</option>
                                     {
                                       devloperState?.map((item)=>{
                                        return( <>
                                          <option value={item.time}>{item?.dev}</option>
                                        </>)
                                       }) 
                                     }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="12">
                            <Form.Group className="mb-4">
                                <Form.Label>Total Hours</Form.Label>
                                <Form.Control type="text" value={time} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default EditTimeReport;