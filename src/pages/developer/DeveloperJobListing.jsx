import React from 'react'
import JobListing from '../../components/common/JobListing/JobListing'
import JobTabs from '../../components/atomic/JobTabs'
import { Nav, Tab } from 'react-bootstrap'

const DeveloperJobListing = () => {
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