import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa6";
import amazonImg from '../../assets/img/amazon.png'
import NoDataFound from './NoDataFound';

const JobTabs = ({jobListing,jobCategoryList}) => {
    const getCategory=(cat)=>{
        let data= jobCategoryList.find((item)=>item.id==cat)
        return data?.title
     }

     const convertToArray=(arr)=>{
        const skillsArray = arr?.split(",");
        return skillsArray
    }
    const currentStatusCssClass=(status)=>{
          switch(status){
            case "ended":
                return "endcontract"
            case "Initiated":
               return "inprogress"
            case "completed":
                return "completed"
            default :
            return 
          }
    }


    
  return (
    <div className="job-posted-wrapper">
    {
     jobListing?.length>0  ?  jobListing.map((item,index)=>{
        return(
            <>
             <div className="job-posted-list">
        <div>
            {/* <h2 className="jobclient-name"><img src={amazonImg} /> Amazon</h2> */}
            <div>
                <h2 className="job-title">{item?.title}</h2>
                <h4 className="job-category">{getCategory(item.category)}</h4>
                <div className="profile-req">
                    <p className="grid-text">{item?.experience}</p>
                    <p className="grid-text">{item?.contract_type}</p>
                    <p className="grid-text">{item?.job_type}</p>
                </div>
                <p className="job-description">{item?.description}</p>
                <Row>
                    <Col md="12">
                        <div className="info-grid">
                            <h4 className="grid-heading">Skills Req.</h4>
                            <ul className="skills-listing">
                                 {
                        convertToArray(item?.skills)?.map((item)=>{
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
        </div>
        <div className="status-wrapper">
            <div>
                {/* <p className="newjob-status">New Job Post</p> */}

                {/* <h3 className="status-heading">Status</h3> */}
                <p className={`status-text ${currentStatusCssClass(item?.status)}`}>{item?.status}</p>
            </div>
            <p className="font-15">Posted Date:<strong>{item.created_at.slice(0,10)}</strong></p>

            <Link to={`/admin-single-job/${item?.id}`} className="px-3 mb-2 main-btn text-decoration-none"><FaEye /></Link>
        </div>
    </div>
            </>
        )
       }) 
    :<NoDataFound/>}
   
   
  
</div>
  )
}

export default JobTabs