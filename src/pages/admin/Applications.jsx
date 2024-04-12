import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Nav,
  Row,
  Tab,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  adminApproveReject,
  allApplicationsList,
} from "../../redux/slices/adminDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import RexettPagination from "../../components/atomic/RexettPagination";
import { IoSearch } from "react-icons/io5";
import { RxChevronRight } from "react-icons/rx";
import { IoCheckmark } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { set } from "react-hook-form";

const Applications = () => {
  const dispatch = useDispatch();
  const { allApplications, approvedLoader, screenLoader } = useSelector(
    (state) => state.adminData
  );
  const [expandedRow, setExpandedRow] = useState(null);
  const [arrowactive, setArrowActive] = useState(false);
  const [currentTab, setCurrentTab] = useState("clients");
  const [application, setApplication] = useState([]);
  const [selectedApprovedBtn, setSelectedApprovedBtn] = useState(null);
  const [selectedRejectedBtn, setSelectedRejectedBtn] = useState(null);
  const [page, setPage] = useState(1);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setArrowActive(!arrowactive);
  };

  useEffect(() => {
    dispatch(allApplicationsList(page));
  }, [page]);

  useEffect(() => {
    setApplication(allApplications[currentTab]);
  }, [allApplications]);

  const handleSelect = (key) => {
    setCurrentTab(key);
    setApplication(allApplications[key]);
  };

  const convertToArray = (arr) => {
    const skillsArray = arr?.split(",");
    return skillsArray;
  };

  const handleClick = (e, clientId, status, index) => {
    e.stopPropagation();
    let payload = {
      user_id: clientId,
      status: status,
      "active-tab": currentTab,
    };

    if (status === "approved") {
      setSelectedApprovedBtn(index);
    } else if (status === "rejected") {
      setSelectedRejectedBtn(index);
    }
    dispatch(adminApproveReject(payload));
    dispatch(allApplicationsList(page));
  };
  const approvedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Approve
    </Tooltip>
  );
  const rejectedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Reject
    </Tooltip>
  );

  return (
    <>
      <div className="border-bottom-grey pb-3 mb-4 d-md-flex justify-content-between align-items-center">
        <h2 className="section-head border-0 mb-0 pb-0">Applications</h2>
        <div className="d-flex gap-3">
          <Form.Control
            type="text"
            className="form-field font-14 shadow-none"
            placeholder="Enter Search Keywords"
          />
          <Button variant="transparent" className="main-btn px-3 search-btn">
            <IoSearch />
          </Button>
        </div>
      </div>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="clients"
        onSelect={handleSelect}
      >
        <Nav variant="pills" className="application-pills">
          <Nav.Item className="application-item">
            <Nav.Link eventKey="clients" className="application-link">
              Clients{" "}
              <span className="new-app">
                {allApplications?.clients?.length}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="application-item">
            <Nav.Link eventKey="vendors" className="application-link">
              Vendors{" "}
              <span className="new-app">
                {allApplications?.vendors?.length}
              </span>
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
                  {screenLoader ? (
                    <ScreenLoader />
                  ) : (
                    <>
                      {currentTab == "clients" && application?.length > 0 ? (
                        application?.map((item, index) => (
                          <React.Fragment key={index}>
                            <tr
                              className="application-row"
                              onClick={() => handleRowClick(index)}
                            >
                              <td className="white-nowrap">
                                <span
                                  className={
                                    arrowactive
                                      ? "row-arrow active"
                                      : "row-arrow"
                                  }
                                >
                                  <RxChevronRight />
                                </span>{" "}
                                {item?.name}
                              </td>
                              <td>
                                <span className="application-mail">
                                  {item.email}
                                </span>
                              </td>
                              <td>{item?.phone_number}</td>
                              <td>{item?.jobs[0]?.engagement_type}</td>
                              <td>{item?.jobs[0]?.project_length}</td>
                              <td>{item?.jobs[0]?.status}</td>
                              <td>
                                <div className="d-flex gap-3">
                                  <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={approvedTooltip}
                                  >
                                    <RexettButton
                                      icon={<IoCheckmark />}
                                      className="arrow-btn primary-arrow"
                                      variant="transparent"
                                      onClick={(e) =>
                                        handleClick(
                                          e,
                                          item?.id,
                                          "approved",
                                          index
                                        )
                                      }
                                      isLoading={
                                        selectedApprovedBtn === index
                                          ? approvedLoader
                                          : false
                                      }
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={rejectedTooltip}
                                  >
                                    <RexettButton
                                      icon={<IoCloseOutline />}
                                      className="arrow-btn"
                                      variant={"danger"}
                                      onClick={(e) =>
                                        handleClick(
                                          e,
                                          item?.id,
                                          "rejected",
                                          index
                                        )
                                      }
                                      isLoading={
                                        selectedRejectedBtn === index
                                          ? approvedLoader
                                          : false
                                      }
                                    />
                                  </OverlayTrigger>
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
                                      <Col md={3} className="mb-3">
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
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Skillset Needed
                                          </h3>
                                          <ul className="need-skill-list">
                                            {convertToArray(
                                              item?.jobs[0]?.skills
                                            )?.map((item, index) => {
                                              return (
                                                <>
                                                  <li key={index}>{item}</li>
                                                </>
                                              );
                                            })}
                                          </ul>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Applied on
                                          </h3>
                                          <p className="application-text">
                                            {item?.created_at?.slice(0, 10)}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Job Title
                                          </h3>
                                          <p className="application-text">
                                            {item?.jobs[0]?.title}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Project Length
                                          </h3>
                                          <p className="application-text">
                                            {item?.jobs[0]?.project_length}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Experience
                                          </h3>
                                          <p className="application-text">
                                            {item?.jobs[0]?.experience}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Contract type
                                          </h3>
                                          <p className="application-text">
                                            {item?.jobs[0]?.contract_type}
                                          </p>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))
                      ) : (
                        <td colSpan={8}>
                          <NoDataFound />
                        </td>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {application?.length > 0 ? (
              <div className="d-flex justify-content-between align-items-center mb-4">
                {currentTab == "clients" ? (
                  <p className="showing-result">
                    Showing {allApplications?.items_per_page} results
                  </p>
                ) : (
                  <p className="showing-result">
                    Showing {allApplications?.vendors?.length} results
                  </p>
                )}
                <RexettPagination
                  number={allApplications?.totalClientPages}
                  setPage={setPage}
                  page={page}
                />
              </div>
            ) : (
              ""
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="vendors" className="py-4">
            <div className="table-responsive">
              <table className="table w-100 engagement-table table-ui-custom">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Type Of Company</th>
                    <th>Engagement</th>
                    <th>Engagement Last</th>
                    <th>Availability</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {screenLoader ? (
                    <ScreenLoader />
                  ) : (
                    <>
                      {currentTab == "vendors" && application?.length > 0 ? (
                        application?.map((item, index) => (
                          <React.Fragment key={index}>
                            <tr
                              className="application-row"
                              onClick={() => handleRowClick(index)}
                            >
                              <td className="white-nowrap">{item?.name}</td>
                              <td>
                                <span className="application-mail">
                                  {item?.email}
                                </span>
                              </td>
                              <td>{item?.phone_number}</td>
                              <td>{item?.company?.type_of_company}</td>
                              <td>{item?.company?.total_employees}</td>
                              <td>{item?.company?.website}</td>
                              <td>{item?.company?.yearly_revenue}</td>
                              <td>
                                <div className="d-flex gap-3">
                                  <RexettButton
                                    icon={<IoCheckmark />}
                                    className="arrow-btn primary-arrow"
                                    variant="transparent"
                                    onClick={(e) =>
                                      handleClick(
                                        e,
                                        item?.id,
                                        "approved",
                                        index
                                      )
                                    }
                                    isLoading={
                                      selectedApprovedBtn === index
                                        ? approvedLoader
                                        : false
                                    }
                                  />
                                  <RexettButton
                                    icon={<IoCloseOutline />}
                                    className="arrow-btn"
                                    variant={"danger"}
                                    onClick={(e) =>
                                      handleClick(
                                        e,
                                        item?.id,
                                        "rejected",
                                        index
                                      )
                                    }
                                    isLoading={
                                      selectedRejectedBtn === index
                                        ? approvedLoader
                                        : false
                                    }
                                  />
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
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Company Name
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.name}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Email
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.email}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Total Employees
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.total_employees}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3} className="mb-3">
                                        <div>
                                          <h3 className="application-heading">
                                            Location
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.location}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Phone Number
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.phone_number}
                                          </p>
                                        </div>
                                      </Col>
                                      <Col md={3}>
                                        <div>
                                          <h3 className="application-heading">
                                            Type Of Company
                                          </h3>
                                          <p className="application-text">
                                            {item?.company?.type_of_company}
                                          </p>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))
                      ) : (
                        <td colSpan={8}>
                          <NoDataFound />
                        </td>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {application?.length > 0 ? (
              <div className="d-flex justify-content-between align-items-center mb-4">
                {currentTab == "clients" ? (
                  <p className="showing-result">
                    Showing {allApplications?.items_per_page} results
                  </p>
                ) : (
                  <p className="showing-result">
                    Showing {allApplications?.vendors?.length} results
                  </p>
                )}
                <RexettPagination
                  number={allApplications?.totalVendorPages}
                  setPage={setPage}
                  page={page}
                />
              </div>
            ) : (
              ""
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};
export default Applications;
