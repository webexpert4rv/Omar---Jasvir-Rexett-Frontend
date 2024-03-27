import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminEngagementList } from "../../redux/slices/adminDataSlice";
const Engagements = () => {
    const dispatch =useDispatch();
    const [search,setSearch]=useState('')
    const {engagement}=useSelector(state=>state.adminData)
    useEffect(()=>{
        dispatch(adminEngagementList())
    },[])

    const handleSearch=()=>{

     let data={
        search:search
     }
     dispatch(adminEngagementList(data))
    }
    return(
        <>
            <h2 className="section-head mb-4">Engagements</h2>
            <Row className="mb-3">
                <Col xl={6} lg={7}>
                    <div className="d-flex gap-3">
                        <Form.Control type="text" className="cv-field" placeholder="Enter Search Keywords" onChange={(e)=>setSearch(e.target.value)}></Form.Control>
                        <Button variant="transparent" className="main-btn px-4" onClick={handleSearch}>Search</Button>
                    </div>
                </Col>
            </Row>
            <div className="table-responsive">
                <table className="table w-100 engagement-table table-ui-custom">
                    <thead>
                        <th>Client Name</th>
                        <th>Developer Name</th>
                        <th>Developer associated with</th>
                        <th>Job Title</th>
                        <th>Contract Type</th>
                        <th>Location</th>
                        <th>Total Hours</th>
                    </thead>
                    <tbody>
                     
                        {
                            engagement?.map((item,index)=>{
                                return (
                                    <>
                                       <tr>
                            <td>{item?.contract?.client?.name}</td>
                            <td>{item?.contract?.developer?.name}</td>
                            <td>Rexett</td>
                            <td>{item?.contract?.job?.title}</td>
                            <td>{item?.contract?.employment_type}</td>
                            <td>{item?.contract?.job_type}</td>
                            <td>{item?.total_duration}</td>
                        </tr>
                                    </>
                                )
                            })

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Engagements;