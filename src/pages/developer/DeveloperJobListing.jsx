import React, { useEffect, useState } from 'react'
import JobListing from '../../components/common/JobListing/JobListing'
import JobTabs from '../../components/atomic/JobTabs'
import Tabs from "../../components/common/LeaveRequest/Tabs";
import { Nav, Tab } from 'react-bootstrap'
import { developerGetJobListing, developerJobListing } from '../../redux/slices/developerDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getJobCategoryList } from '../../redux/slices/clientDataSlice';


const DeveloperJobListing = () => {
  let userId = localStorage.getItem("userId");
  const dispatch = useDispatch()
  const [currentTab , setCurrentTab] = useState("new_jobs")
  const { jobCategoryList } = useSelector(state => state.clientData)
  const { jobList, screenLoader } = useSelector(state => state.developerData)
  console.log(jobList, "jobList")

  useEffect(() => {
    dispatch(getJobCategoryList())
  }, [])

  useEffect(() => {
    let payload = {
      current_page: 1,
      active_tab: "new_jobs",
      developer_id: userId
    }
    dispatch(developerGetJobListing(payload))
  }, [])


  const handleSelect = (selectedTab) => {
    let payload = {
      current_page: 1,
      active_tab: selectedTab,
      developer_id: userId
    }
    console.log(payload, "payload")
    dispatch(developerGetJobListing(payload))
    setCurrentTab(selectedTab)
  }

  

  return (
    <>
      <Tab.Container defaultActiveKey="new_jobs" onSelect={handleSelect} >
        <Nav variant="pills" className="mb-4 application-pills">
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="new_jobs">
              New Jobs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="applied_jobs">
              Applied Jobs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="in_progress_jobs">
              In Progress
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="new_jobs">
            <JobTabs jobListing={jobList?.jobs}  jobCategoryList={jobCategoryList}  screenLoader={screenLoader} currentTab={currentTab}/>
          </Tab.Pane>
          <Tab.Pane eventKey="applied_jobs">
            <JobTabs jobListing={jobList?.jobs} jobCategoryList={jobCategoryList}  screenLoader={screenLoader} currentTab={currentTab}/>
          </Tab.Pane>
           <Tab.Pane eventKey="in_progress_jobs">
            <JobTabs jobListing={jobList?.jobs} jobCategoryList={jobCategoryList}  screenLoader={screenLoader} currentTab={currentTab}/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>






    </>
  )
}

export default DeveloperJobListing