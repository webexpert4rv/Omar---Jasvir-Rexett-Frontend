import React, { useEffect } from "react";
import { Col, Row, Pagination, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import amazonImg from '../../assets/img/amazon.png'
import facebookImg from '../../assets/img/facebook.png'
import { useDispatch, useSelector } from "react-redux";
import { adminJobListing } from "../../redux/slices/adminDataSlice";
import { getJobCategoryList } from "../../redux/slices/clientDataSlice";
import JobTabs from "../../components/atomic/JobTabs";
const AdminJobListing = () => {
    const dispatch =useDispatch()
    const {jobListing}=useSelector(state=>state.adminData)
    const {jobCategoryList}=useSelector(state=>state.clientData)

    useEffect(()=>{
        dispatch(adminJobListing("1"))
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
                       <JobTabs  jobListing={jobListing} jobCategoryList={jobCategoryList}/>
                    </Tab>
                    <Tab eventKey="new" title="New Job Posts">
                    <JobTabs  jobListing={jobListing} jobCategoryList={jobCategoryList}/>
                    </Tab>
                    <Tab eventKey="in-progress" title="In Progress">
                    <JobTabs  jobListing={jobListing} jobCategoryList={jobCategoryList}/>
                    </Tab>
                    <Tab eventKey="completed" title="Completed">
                    <JobTabs  jobListing={jobListing} jobCategoryList={jobCategoryList}/>
                    </Tab>
                    <Tab eventKey="ended" title="End Jobs">
                    <JobTabs  jobListing={jobListing} jobCategoryList={jobCategoryList}/>
                    </Tab>
                </Tabs>
            </section>
            {/* <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="showing-result">Showing 1 - 10 results</p>
                <Pagination className="custom-pagination">
                    <Pagination.Prev className="custom-pagination-item custom-pagination-arrow" />
                    <Pagination.Item className="custom-pagination-item" active>{1}</Pagination.Item>
                    <Pagination.Item className="custom-pagination-item">{2}</Pagination.Item>
                    <Pagination.Item className="custom-pagination-item">{3}</Pagination.Item>
                    <Pagination.Ellipsis className="custom-pagination-item" />
                    <Pagination.Item className="custom-pagination-item">{8}</Pagination.Item>
                    <Pagination.Item className="custom-pagination-item">{9}</Pagination.Item>
                    <Pagination.Item className="custom-pagination-item">{10}</Pagination.Item>
                    <Pagination.Next className="custom-pagination-item custom-pagination-arrow" />
                </Pagination>
            </div> */}
        </>
    )
}
export default AdminJobListing;