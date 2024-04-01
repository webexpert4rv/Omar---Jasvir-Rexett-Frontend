import React, { useEffect, useState } from "react";
import { Col, Row, Pagination, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import amazonImg from '../../assets/img/amazon.png'
import facebookImg from '../../assets/img/facebook.png'
import { useDispatch, useSelector } from "react-redux";
import { adminJobListing } from "../../redux/slices/adminDataSlice";
import { getJobCategoryList } from "../../redux/slices/clientDataSlice";
import JobTabs from "../../components/atomic/JobTabs";
import RexettPagination from "../../components/atomic/RexettPagination";
import ScreenLoader from "../../components/atomic/ScreenLoader";



const AdminJobListing = () => {
    const dispatch =useDispatch()
    const {jobListing ,screenLoader}=useSelector(state=>state.adminData)
    const {jobCategoryList}=useSelector(state=>state.clientData)


    useEffect(()=>{
        dispatch(adminJobListing())
        dispatch(getJobCategoryList())
    },[])

    const handleSelect=(key)=>{
        let filter={
            type:key,
            page:1
        }
        dispatch(adminJobListing(filter))
    }  
    

    return (
        <>
            

            <section className="job-posted-section">
                <Tabs
                    defaultActiveKey="all"
                    id="justify-tab-example"
                    className="mb-3 notification-tabs"
                    justify
                    onSelect={handleSelect}
                >
                   
                    <Tab eventKey="all" title="All">
                       <JobTabs  jobListing={jobListing?.data} jobCategoryList={jobCategoryList}/>
                    </Tab>
                    <Tab eventKey="new" title="New Job Posts">
                    <JobTabs  jobListing={jobListing?.data} jobCategoryList={jobCategoryList}/>
                    </Tab>
                    <Tab eventKey="in-progress" title="In Progress">
                    <JobTabs  jobListing={jobListing?.data} jobCategoryList={jobCategoryList}/>
                    </Tab>
                    <Tab eventKey="ended" title="End Jobs">
                    <JobTabs  jobListing={jobListing?.data} jobCategoryList={jobCategoryList}/>
                    </Tab>
                </Tabs>
            </section>
            <RexettPagination />
            
        </>
    )
}
export default AdminJobListing;