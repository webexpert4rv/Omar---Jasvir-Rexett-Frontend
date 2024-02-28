import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllJobPostedList, getJobCategoryList } from "../../redux/slices/clientDataSlice";
const JobListing = () => {
    const dispatch=useDispatch();
    const {allJobPostedList,jobCategoryList}=useSelector(state=>state.clientData)
    useEffect(()=>{
        dispatch(getAllJobPostedList())
        dispatch(getJobCategoryList())
    },[dispatch])

    const getCategory=(cat)=>{
       let data= jobCategoryList.find((item)=>item.id==cat)
       console.log(data,"ppppp")
       return data?.title
    }

    console.log(allJobPostedList,"allJobPostedList")

    const convertToArray=(arr)=>{
        const skillsArray = arr.split(", ");
        return skillsArray
    }
    return(
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
                            <div>
                                <h3 className="status-heading">Status</h3>
                                <p className="status-text inprogress">{item.status}</p>
                            </div>
                            <p className="font-15">Posted Date: <strong>{item.created_at.slice(0,10)}</strong></p>
                            <Link to={'/single-job'} className="px-5 mb-2 main-btn text-decoration-none">View Details</Link>
                        </div>
                    </div>
                        </>
                    )
                   }) }
                    {/* <div className="job-posted-list">
                        <div>
                            <h2 className="job-title">Want to Convert Figma to HTML</h2>
                            <h4 className="job-category">Website Design</h4>
                            <div className="profile-req">
                                <p className="grid-text">1 - 2 years of exp</p>
                                <p className="grid-text">Hourly</p>
                                <p className="grid-text">Remote</p>
                            </div>
                            <p className="job-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <Row>
                                <Col md="12">
                                    <div className="info-grid">
                                        <h4 className="grid-heading">Skills Req.</h4>
                                        <ul className="skills-listing">
                                            <li>HTML</li>
                                            <li>CSS</li>
                                            <li>Bootstrap</li>
                                            <li>JavaScript</li>
                                            <li>jQuery</li>
                                            <li>Tailwind CSS</li>
                                            <li>Sass</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="status-wrapper">
                            <div>
                                <h3 className="status-heading">Status</h3>
                                <p className="status-text completed">Completed</p>
                            </div>
                            <Link to={'/single-job'} className="px-5 mb-2 main-btn text-decoration-none">View Details</Link>
                        </div>
                    </div>
                    <div className="job-posted-list">
                        <div>
                            <h2 className="job-title">Want to Convert Figma to HTML</h2>
                            <h4 className="job-category">Website Design</h4>
                            <div className="profile-req">
                                <p className="grid-text">1 - 2 years of exp</p>
                                <p className="grid-text">Hourly</p>
                                <p className="grid-text">Remote</p>
                            </div>
                            <p className="job-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <Row>
                                <Col md="12">
                                    <div className="info-grid">
                                        <h4 className="grid-heading">Skills Req.</h4>
                                        <ul className="skills-listing">
                                            <li>HTML</li>
                                            <li>CSS</li>
                                            <li>Bootstrap</li>
                                            <li>JavaScript</li>
                                            <li>jQuery</li>
                                            <li>Tailwind CSS</li>
                                            <li>Sass</li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="status-wrapper">
                            <div>
                                <h3 className="status-heading">Status</h3>
                                <p className="status-text endcontract">End contract</p>
                            </div>
                            <Link to={'/single-job'} className="px-5 mb-2 main-btn text-decoration-none">View Details</Link>
                        </div>
                    </div> */}
                </div>
            </section>
        </>
    )
}
export default JobListing;