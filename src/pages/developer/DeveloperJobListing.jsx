import React, { useEffect } from 'react'
import JobListing from '../../components/common/JobListing/JobListing'
import JobTabs from '../../components/atomic/JobTabs'
import { Nav, Tab } from 'react-bootstrap'
import { developerGetJobListing, developerJobListing } from '../../redux/slices/developerDataSlice'
import { useDispatch } from 'react-redux'

const DeveloperJobListing = () => {
 let userId= localStorage.getItem("userId");
 const dispatch=useDispatch()

  useEffect(() => {
    let payload={
      current_page:1,
      active_tab:"new_jobs",
      developer_id:userId
    }
    dispatch(developerGetJobListing(payload))
}, [])

  return (
    <>
      <Tab.Container defaultActiveKey="new-jobs">
        <Nav variant="pills" className="mb-4 application-pills">
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="new-jobs">
              New Jobs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="applied-jobs">
              Applied Jobs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="application-item">
            <Nav.Link className="application-link" eventKey="in-progress-jobs">
              In Progress
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="new-jobs">
            <JobTabs />
          </Tab.Pane>
          <Tab.Pane eventKey="applied-jobs">
            <JobTabs />
          </Tab.Pane>
          <Tab.Pane eventKey="in-progress-jobs">
            <JobTabs />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  )
}

export default DeveloperJobListing