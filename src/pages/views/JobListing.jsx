import React, { useEffect } from "react";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllJobPostedList, getJobCategoryList } from "../../redux/slices/clientDataSlice";
import RexettPagination from "../../components/atomic/RexettPagination";
import ScreenLoader from "../../components/atomic/ScreenLoader";
const JobListing = () => {
    const dispatch=useDispatch();
    const {allJobPostedList,jobCategoryList,screenLoader}=useSelector(state=>state.clientData)
    useEffect(()=>{
        dispatch(getAllJobPostedList("3"))
        dispatch(getJobCategoryList())
    },[dispatch])

    const getCategory=(cat)=>{
       let data= jobCategoryList.find((item)=>item.id==cat)
       return data?.title
    }


    const convertToArray=(arr)=>{
        const skillsArray = arr.split(", ");
        return skillsArray
    }
    return(
        <>
            {screenLoader? 
            <ScreenLoader/>:
            <>
            <section className="job-posted-section">
                <div className="job-posted-wrapper">
                   {allJobPostedList?.map((item)=>{
                    return (
                        <>
                        <div className="job-posted-list" key={item.id}>
                        <div>
                            <h2 className="job-title">{item.title}</h2>
                            <h4 className="job-category">{getCategory(item.category)}</h4>
                            <div className="profile-req">
                                <p className="grid-text">{item?.experience} of exp</p>
                                <p className="grid-text">{item?.contract_type}</p>
                                <p className="grid-text">{item.job_type}</p>
                            </div>
                            <p className="job-description">{item?.description}</p>
                            <Row>
                                <Col md="12">
                                    <div className="info-grid">
                                        <h4 className="grid-heading">Skills Req.</h4>
                                        <ul className="skills-listing">
                                            {
                                                convertToArray(item.skills)?.map((item)=>{
                                                    return (
                                                        <>
                                                         <li>{item}</li>
                                                        </>
                                                    )
                                                })
                                            }
                                           
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="status-wrapper">
                            <div className="d-flex gap-3 align-items-center mb-2">
                                <h3 className="status-heading mb-0">Status</h3>
                                <p className="status-text inprogress mb-0">{item.status}</p>
                            </div>
                            <p className="font-15">Posted Date: <strong>{item.created_at.slice(0,10)}</strong></p>
                            <Link to={`/single-job/${item.id}`} className="px-4 font-14 mb-2 main-btn text-decoration-none">View Details</Link>
                        </div>
                    </div>
                        </>
                    )
                   }) }
                    
                </div>
            </section>
           {/* <RexettPagination/> */}
            </>
            }
        </>
    )
}
export default JobListing;