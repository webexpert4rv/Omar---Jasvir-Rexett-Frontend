import React, { useEffect, useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminApproveReject, allApplicationsList } from "../../redux/slices/adminDataSlice";
const Applications = () => {
  const dispatch = useDispatch();
  const { allApplications,approvedLoader } = useSelector((state) => state.adminData);
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentTab, setCurrentTab] = useState("clients");
  const [application, setApplication] = useState([]);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  console.log(allApplications, "allApplications");

  useEffect(() => {
    dispatch(allApplicationsList());
  }, []);

  useEffect(() => {
    setApplication(allApplications[currentTab]);
  }, [allApplications]);

  const handleSelect = (key) => {
    setCurrentTab(key)
    setApplication(allApplications[key]);
  };
  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
  };

  const handleClick=  (e,clientId,status)=>{
    e.stopPropagation(); 
    let payload={
      
        "user_id": clientId,
        "status": status
      
    }
    dispatch(adminApproveReject(payload))
   dispatch(allApplicationsList());
  }
  return (
    <>
      <h2 className="section-head mb-4">Applications</h2>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="clients"
        onSelect={handleSelect}
      >
        <Nav variant="pills" className="application-pills">
          <Nav.Item className="application-item">
            <Nav.Link eventKey="clients" className="application-link">
              Clients <span className="new-app">{allApplications?.clients?.length}</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="application-item">
            <Nav.Link eventKey="vendors" className="application-link">
              Vendors <span className="new-app">{allApplications?.vendors?.length}</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="clients" className="py-4">
            <div className="table-responsive">
              <table className="table w-100 engagement-table table-ui-custom">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Engagement</th>
                    <th>Engagement Last</th>
                    <th>Availability</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTab=="clients"? application?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className="application-row"
                        onClick={() => handleRowClick(index)}
                      >
                        <td className="white-nowrap">{item?.name}</td>
                        <td>
                          <span className="application-mail">{item.email}</span>
                        </td>
                        <td>{item?.phone_number}</td>
                        <td>{item?.jobs[0]?.engagement_type}</td>
                        <td>{item?.jobs[0]?.project_length}</td>
                        <td>{item?.jobs[0]?.status}</td>
                        <td>
                          <div className="d-flex gap-3">
                            <Button 
                              variant="transparent"
                              className="main-btn px-4 py-2 font-13"
                              onClick={(e)=>handleClick(e,item?.id , "approved")}
                              isLoading={approvedLoader}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13"
                              onClick={(e)=>handleClick(e,item?.id , "rejected")}
                              isLoading={approvedLoader}
                            >
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {expandedRow === index && (
                        <tr
                          className={`collapsible-row ${
                            expandedRow === index ? "open" : ""
                          }`}
                        >
                          <td colSpan="8">
                            <div>
                              <Row>
                                <Col md={4}>
                                  <div>
                                    <h3 className="application-heading">
                                      New Team Member Start{" "}
                                    </h3>
                                    <p className="application-text">
                                      {
                                        item?.jobs[0]
                                          ?.development_should_start_in
                                      }
                                    </p>
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div>
                                    <h3 className="application-heading">
                                      Skillset Needed
                                    </h3>
                                    <ul className="need-skill-list">
                                      {convertToArray(
                                          item?.jobs[0]?.skills
                                      )?.map((item, index) => {
                                        console.log(item,"item")
                                        return (
                                          <>
                                            <li key={index}>{item}</li>
                                          </>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div>
                                    <h3 className="application-heading">
                                      Applied on
                                    </h3>
                                    <p className="application-text">
                                      {item?.created_at?.slice(0, 11)}
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )):""}
                </tbody>
              </table>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="vendors" className="py-4">
            <div className="table-responsive">
              <table className="table w-100 engagement-table table-ui-custom">
                <thead>
                  <th>Company Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Type of Company</th>
                  <th>Total Employees</th>
                  <th>Website Address</th>
                  <th>Yearly Avenue</th>
                  <th>Action</th>
                  <th></th>
                </thead>
                <tbody>
                  { currentTab ==="vendors"?application?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className="application-row"
                      >
                        <td className="white-nowrap">{item?.name}</td>
                        <td>
                          <span className="application-mail">{item?.email}</span>
                        </td>
                        <td>{item?.phone_number}</td>
                        <td>{item?.company?.type_of_company}</td>
                        <td>{item?.company?.total_employees}</td>
                        <td>{item?.company?.website}</td>
                        <td>{item?.company?.yearly_revenue}</td>
                        <td>
                          <div className="d-flex gap-3">
                            <Button
                              variant="transparent"
                              className="main-btn px-4 py-2 font-13"
                              onClick={(e)=>handleClick(e,item?.id , "approved")}

                            >
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              className="main-btn text-danger border-danger bg-transparent px-4 py-2 font-13"
                              onClick={(e)=>handleClick(e,item?.id , "rejected")}

                            >
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  )):""}
                </tbody>
              </table>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};
export default Applications;
