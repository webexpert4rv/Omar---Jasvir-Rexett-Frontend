import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  Tooltip,
  OverlayTrigger,
  Collapse,
  Offcanvas,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import userImage from "../../assets/img/user-img.jpg";
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import companyLogo from "../../assets/img/amazon.png";
import associateLogo from "../../assets/img/aviox-logo.png";
import { HiDownload } from "react-icons/hi";
import InvoicePaidModal from "./Modals/InvoicePaid";
import { FaRegEye } from "react-icons/fa";
import TimeReportingFilterSection from "./TimeReportingFilterSection";
import { getTimeReportsDetails } from "../../redux/slices/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ACTIVE_TABS,
  ACTIVE_TABS_2,
  RAISED_BY_DEVS_COLUMNS,
  RAISED_TO_CLIENT_COLUMNS,
  TIME_REPORTING_DETAIL_PER_PAGE,
  buildQueryFromObjects,
} from "./adminConstant";
import ClientDetailSection from "./ClientDetailSection";
import DeveloperCard from "./DeveloperCard";
import SingleProject from "./SingleProject";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import RaisedToClientTable from "./RaisedToClientTable";
import NoDataFound from "../../components/atomic/NoDataFound";
const TimeReportingDetail = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(ACTIVE_TABS.projects);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    developerName: "",
    projectName: "",
    invoiceStatus: "",
  });
  const [secondActiveTab, setSecondActiveTab] = useState(
    ACTIVE_TABS_2.raisedByDevAndVendor
  );
  const { timeReportDetails, screenLoader } =
    useSelector((state) => state.adminData);
  const { clientId } = useParams();
  const [remarkshow, setremarkShow] = useState(false);
  const handleremarkClose = () => setremarkShow(false);
  const handleremarkShow = () => setremarkShow(true);
  const [totalPages, setTotalPages] = useState(null);
  const [openSecond, setOpenSecond] = useState(false);
  const [showInvoicePaidModal, setShowInvoicePaidModal] = useState(false);
  const handleInvoicePaid = () => {
    setShowInvoicePaidModal(true);
  };
  const handleCloseInvoicePaid = () => {
    setShowInvoicePaidModal(false);
  };

  useEffect(() => {
    if (timeReportDetails?.pagination?.total_pages) {
      setTotalPages(timeReportDetails?.pagination?.total_pages);
    }
    const filtersQuery = buildQueryFromObjects(filters);
    // const query = `page=${page}&perPage=${TIME_REPORT_DETAIL_PER_PAGE}&${filtersQuery}`;
    const query = `${filtersQuery}&page=${page}&perPage=${TIME_REPORTING_DETAIL_PER_PAGE}`;
    handleGetTimeReportDetails(query);
  }, [filters, page]);
  // console.log(totalPages,"total pages");

  useEffect(() => {
    setSecondActiveTab(ACTIVE_TABS_2.raisedByDevAndVendor);
  }, [activeTab]);

  const handleGetTimeReportDetails = (query) => {
    dispatch(getTimeReportsDetails(clientId, query));
  };
  const companyname = (
    <Tooltip id="tooltip">Aviox Technologies Pvt Ltd</Tooltip>
  );
  const downloadinvoice = <Tooltip id="tooltip">Download Invoice</Tooltip>;
  const viewtimesheet = <Tooltip id="tooltip">View Timesheet</Tooltip>;
  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <section className="time-reporting-detail">
          {/* <TimeReportingFilterSection
            filters={filters}
            isHeaderFilter={true}
            setFilters={setFilters}
          /> */}
          <ClientDetailSection
            clientDetails={timeReportDetails?.["client"]}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            totalProjects={timeReportDetails?.total_projects}
          />
          {/* <div className="detail-view">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="hired-developers"
          >
            <div className="card-box mb-4 p-3">
              <div className="detail-view">
                <Row className="flex-wrap gy-3">
                  <Col md={3}>
                    <div className="client-info p-0 bg-transparent">
                      <h3 className="font-15 fw-bold mb-2">Client Name</h3>
                      <p className="client-name-heading mb-0">
                        <img src={userImage} /> Pankaj Pundir
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="client-info p-0 bg-transparent">
                      <h3 className="font-15 fw-bold mb-2">Current Month</h3>
                      <p className="client-name-heading d-flex gap-1 mb-0 align-items-center fw-bold">
                        <span className="d-flex align-items-center gap-1 text-green">
                          <FiCalendar />
                          Jan 2024
                        </span>
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="client-info p-0 bg-transparent">
                      <h3 className="font-15 fw-bold mb-2">Client Status</h3>
                      <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                        <span className="status-progress white-nowrap">
                          Progress
                        </span>
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="client-info p-0 bg-transparent">
                      <h3 className="font-15 fw-bold mb-2">Active Projects</h3>
                      <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                        5
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="client-info p-0 bg-transparent">
                      <h3 className="font-15 fw-bold mb-2">Company Name</h3>
                      <p className="client-name-heading company-name-heading d-flex gap-1 mb-0 align-items-center">
                        <img src={companyLogo} className="company-logo" />{" "}
                        Amazon
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="client-info p-0 bg-transparent">
                      <h3 className="font-15 fw-bold mb-2">Company Address</h3>
                      <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                        20 Cooper Square, New York, NY 10003, USA
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="client-info p-0 bg-transparent">
                      <h3 className="font-15 fw-bold mb-2">Email address</h3>
                      <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                        client@amazon.com
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="client-info p-0 bg-transparent">
                      <h3 className="font-15 fw-bold mb-2">Phone Number</h3>
                      <p className="client-name-heading d-flex gap-1 mb-0 align-items-center">
                        +91 1234567890
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Nav variant="pills" className="weekly-tabs mb-0">
                  <Nav.Item className="weekly-tab-item">
                    <Nav.Link
                      className="weekly-tab-link d-flex align-items-center gap-2"
                      eventKey="hired-developers"
                    >
                      Projects <span className="number">5</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="weekly-tab-item">
                    <Nav.Link
                      className="weekly-tab-link"
                      eventKey="time-reporting"
                    >
                      Time Reporting/Invoicing
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="hired-developers">
                <div className="mb-4">
                  <div
                    className="heading-box mb-3 d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => setOpen(!open)}
                  >
                    <h3 className="mb-0">Figma to UI Project</h3>
                    <Button className="main-btn white-btn font-14 p-0">
                      See All Developers{" "}
                      <span className="number-count-light">7</span>
                    </Button>
                  </div>
                  <Collapse in={open}>
                    <div className="developers-list" id="figma-to-ui-projects">
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">Individual</span>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">Individual</span>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">
                              Associated with
                            </span>{" "}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={companyname}
                            >
                              <span className="white-nowrap">
                                <img src={associateLogo} className="me-2" />{" "}
                                Aviox Technologies Pvt Ltd
                              </span>
                            </OverlayTrigger>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">Individual</span>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">
                              Associated with
                            </span>{" "}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={companyname}
                            >
                              <span className="white-nowrap">
                                <img src={associateLogo} className="me-2" />{" "}
                                Aviox Technologies Pvt Ltd
                              </span>
                            </OverlayTrigger>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">Individual</span>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">
                              Associated with
                            </span>{" "}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={companyname}
                            >
                              <span className="white-nowrap">
                                <img src={associateLogo} className="me-2" />{" "}
                                Aviox Technologies Pvt Ltd
                              </span>
                            </OverlayTrigger>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div>
                  <div
                    className="heading-box mb-3 d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() => setOpenSecond(!openSecond)}
                  >
                    <h3 className="mb-0">AI Chat Bot Project</h3>
                    <Button className="main-btn white-btn font-14 p-0">
                      See All Developers{" "}
                      <span className="number-count-light">7</span>
                    </Button>
                  </div>
                  <Collapse in={openSecond}>
                    <div className="developers-list">
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">Individual</span>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">Individual</span>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">
                              Associated with
                            </span>{" "}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={companyname}
                            >
                              <span className="white-nowrap">
                                <img src={associateLogo} className="me-2" />{" "}
                                Aviox Technologies Pvt Ltd
                              </span>
                            </OverlayTrigger>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">Individual</span>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">
                              Associated with
                            </span>{" "}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={companyname}
                            >
                              <span className="white-nowrap">
                                <img src={associateLogo} className="me-2" />{" "}
                                Aviox Technologies Pvt Ltd
                              </span>
                            </OverlayTrigger>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">Individual</span>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="developer-card">
                        <div className="user-imgbx">
                          <img src={userImage} className="user-img" />
                        </div>
                        <div className="text-center">
                          <h3 className="user-name">Sandeep</h3>
                          <p className="designation-user">Web Developers</p>
                          <p className="email-user">dev@rexett.com</p>
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1">
                              Associated with
                            </span>{" "}
                            <OverlayTrigger
                              placement="bottom"
                              overlay={companyname}
                            >
                              <span className="white-nowrap">
                                <img src={associateLogo} className="me-2" />{" "}
                                Aviox Technologies Pvt Ltd
                              </span>
                            </OverlayTrigger>
                          </p>
                          <ul className="social-icons">
                            <li>
                              <a href="">
                                <FaLinkedinIn />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="time-reporting">
                <div className="card-box">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="raise-by-devs"
                  >
                    <div className="d-flex justify-content-center">
                      <Nav variant="pills" className="weekly-tabs mb-0">
                        <Nav.Item className="weekly-tab-item">
                          <Nav.Link
                            className="weekly-tab-link d-flex align-items-center gap-2"
                            eventKey="raise-by-devs"
                          >
                            Raise By Devs/Vendors
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="weekly-tab-item">
                          <Nav.Link
                            className="weekly-tab-link"
                            eventKey="raise-to-clients"
                          >
                            Raise To Clients
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                    <Tab.Content>
                      <Tab.Pane eventKey="raise-by-devs">
                        <div className="filter-section d-lg-flex align-items-center mt-3 justify-content-between mb-3">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Select Month</option>
                                <option>January</option>
                                <option>Feburary</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Select Year</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Select Developer</option>
                                <option>Rohit Sharma</option>
                                <option>Rohit Sharma</option>
                                <option>Rohit Sharma</option>
                                <option>Rohit Sharma</option>
                                <option>Rohit Sharma</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Select Project</option>
                                <option>Figma to UI</option>
                                <option>Figma to UI</option>
                                <option>Figma to UI</option>
                                <option>Figma to UI</option>
                                <option>Figma to UI</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Invoice Status</option>
                                <option>Paid</option>
                                <option>Unpaid</option>
                                <option>Reject</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Button
                                className="main-btn py-1_5 px-4"
                                variant="transparent"
                              >
                                Filter
                              </Button>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <Form.Control
                              type="text"
                              className="common-field font-14 shadow-none"
                              placeholder="Enter Keyword..."
                            />
                            <Button
                              variant="transparent"
                              className="main-btn px-3 search-btn"
                            >
                              <IoSearch />
                            </Button>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table time-table table-bordered table-ui-custom">
                            <thead>
                              <tr>
                                <th className="time-table-head text-start">
                                  Developer Name
                                </th>
                                <th className="time-table-head text-start">
                                  Project
                                </th>
                                <th className="time-table-head text-start">
                                  Total Hours
                                </th>
                                <th className="time-table-head text-start">
                                  Invoice Month
                                </th>
                                <th className="time-table-head text-start">
                                  Associated with
                                </th>
                                <th className="time-table-head text-start">
                                  Timesheet
                                </th>
                                <th className="time-table-head text-start">
                                  Remarks
                                </th>
                                <th className="time-table-head text-start">
                                  Invoice Status
                                </th>
                                <th className="time-table-head text-start">
                                  Project Status
                                </th>
                                <th className="time-table-head text-start">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2 white-nowrap">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start white-nowrap">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data">
                                  <p className="associate-text font-14 mt-2 mb-2">
                                    <span className="associate mb-1 font-14">
                                      Individual
                                    </span>
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex gap-2 align-items-center justify-content-between">
                                    <span className="status-finished white-nowrap">
                                      Approved
                                    </span>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={viewtimesheet}
                                    >
                                      <Button
                                        variant="transparent"
                                        className="main-btn view-time-btn"
                                      >
                                        <FaRegEye />
                                      </Button>
                                    </OverlayTrigger>
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  <p
                                    className="remarks-text white-nowrap"
                                    onClick={handleremarkShow}
                                  >
                                    View Remarks
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Progress
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <Button
                                    className="main-btn px-3 py-1 font-14 white-nowrap"
                                    onClick={handleInvoicePaid}
                                  >
                                    Invoice Paid
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="time-table-data text-start white-nowrap">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start white-nowrap">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data">
                                  <p className="associate-text font-14 mt-2 mb-2">
                                    <span className="associate mb-1 font-14">
                                      Individual
                                    </span>
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex gap-2 align-items-center justify-content-between">
                                    <span className="status-progress white-nowrap">
                                      Under Review
                                    </span>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={viewtimesheet}
                                    >
                                      <Button
                                        variant="transparent"
                                        className="main-btn view-time-btn"
                                      >
                                        <FaRegEye />
                                      </Button>
                                    </OverlayTrigger>
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  <p
                                    className="remarks-text white-nowrap"
                                    onClick={handleremarkShow}
                                  >
                                    View Remarks
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Progress
                                  </span>
                                </td>
                                <td className="time-table-data text-start white-nowrap">
                                  <Button
                                    className="main-btn px-3 py-1 font-14"
                                    disabled
                                  >
                                    Paid
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data">
                                  <p className="associate-text font-14 mt-2 mb-2">
                                    <span className="associate mb-1 font-14">
                                      Individual
                                    </span>
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex gap-2 align-items-center justify-content-between">
                                    <span className="status-finished white-nowrap">
                                      Approved
                                    </span>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={viewtimesheet}
                                    >
                                      <Button
                                        variant="transparent"
                                        className="main-btn view-time-btn"
                                      >
                                        <FaRegEye />
                                      </Button>
                                    </OverlayTrigger>
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  <p
                                    className="remarks-text white-nowrap"
                                    onClick={handleremarkShow}
                                  >
                                    View Remarks
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Progress
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <Button
                                    className="main-btn px-3 py-1 font-14 white-nowrap"
                                    onClick={handleInvoicePaid}
                                  >
                                    Invoice Paid
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data">
                                  <p className="associate-text font-14 mt-2 mb-2">
                                    <span className="associate mb-1 font-14">
                                      Individual
                                    </span>
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex gap-2 align-items-center justify-content-between">
                                    <span className="status-finished white-nowrap">
                                      Approved
                                    </span>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={viewtimesheet}
                                    >
                                      <Button
                                        variant="transparent"
                                        className="main-btn view-time-btn"
                                      >
                                        <FaRegEye />
                                      </Button>
                                    </OverlayTrigger>
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  <p
                                    className="remarks-text white-nowrap"
                                    onClick={handleremarkShow}
                                  >
                                    View Remarks
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-finished white-nowrap">
                                    Paid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-finished white-nowrap">
                                    Completed
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <Button
                                    className="main-btn px-3 py-1 font-14 white-nowrap"
                                    disabled
                                  >
                                    Paid
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data text-start">
                                  <OverlayTriggers
                                    placement="bottom"
                                    overlay={companyname}
                                  >
                                    <div className="text-center">
                                      <div className="user-imgbx d-inline-block associated-logo application-imgbx mx-0 mb-0">
                                        <img
                                          src={associateLogo}
                                          className="user-img"
                                        />
                                      </div>
                                    </div>
                                  </OverlayTrigger>
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex gap-2 align-items-center justify-content-between">
                                    <span className="status-finished white-nowrap">
                                      Approved
                                    </span>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={viewtimesheet}
                                    >
                                      <Button
                                        variant="transparent"
                                        className="main-btn view-time-btn"
                                      >
                                        <FaRegEye />
                                      </Button>
                                    </OverlayTrigger>
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  <p
                                    className="remarks-text white-nowrap"
                                    onClick={handleremarkShow}
                                  >
                                    View Remarks
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-finished white-nowrap">
                                    Paid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-finished white-nowrap">
                                    Completed
                                  </span>
                                </td>
                                <td className="time-table-data text-start white-nowrap">
                                  <Button
                                    className="main-btn px-3 py-1 font-14"
                                    disabled
                                  >
                                    Paid
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data text-start">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={companyname}
                                  >
                                    <div className="text-center">
                                      <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                                        <img
                                          src={associateLogo}
                                          className="user-img"
                                        />
                                      </div>
                                    </div>
                                  </OverlayTrigger>
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex gap-2 align-items-center justify-content-between">
                                    <span className="status-progress white-nowrap">
                                      Under Review
                                    </span>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={viewtimesheet}
                                    >
                                      <Button
                                        variant="transparent"
                                        className="main-btn view-time-btn"
                                      >
                                        <FaRegEye />
                                      </Button>
                                    </OverlayTrigger>
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  <p
                                    className="remarks-text white-nowrap"
                                    onClick={handleremarkShow}
                                  >
                                    View Remarks
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Progress
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <Button className="main-btn px-3 py-1 font-14 white-nowrap">
                                    Invoice Paid
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="raise-to-clients">
                        <div className="filter-section d-lg-flex align-items-center mt-3 justify-content-between mb-3">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Select Month</option>
                                <option>January</option>
                                <option>Feburary</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Select Year</option>
                                <option>2024</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Select Developer</option>
                                <option>Rohit Sharma</option>
                                <option>Rohit Sharma</option>
                                <option>Rohit Sharma</option>
                                <option>Rohit Sharma</option>
                                <option>Rohit Sharma</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Select Project</option>
                                <option>Figma to UI</option>
                                <option>Figma to UI</option>
                                <option>Figma to UI</option>
                                <option>Figma to UI</option>
                                <option>Figma to UI</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Form.Select className="time-filter-select shadow-none">
                                <option>Invoice Status</option>
                                <option>Paid</option>
                                <option>Unpaid</option>
                                <option>Reject</option>
                              </Form.Select>
                            </div>
                            <div>
                              <Button
                                className="main-btn py-1_5 px-4"
                                variant="transparent"
                              >
                                Filter
                              </Button>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-3">
                            <Form.Control
                              type="text"
                              className="common-field font-14 shadow-none"
                              placeholder="Enter Keyword..."
                            />
                            <Button
                              variant="transparent"
                              className="main-btn px-3 search-btn"
                            >
                              <IoSearch />
                            </Button>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table time-table table-bordered table-ui-custom">
                            <thead>
                              <th className="time-table-head text-start">
                                Project Name
                              </th>
                              <th className="time-table-head text-start">
                                Developer Name
                              </th>
                              <th className="time-table-head text-start">
                                Total Hours
                              </th>
                              <th className="time-table-head text-start">
                                Invoice Month
                              </th>
                              <th className="time-table-head text-start">
                                Associated with
                              </th>
                              <th className="time-table-head text-start">
                                Invoice Status
                              </th>
                              <th className="time-table-head text-start">
                                Action
                              </th>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="time-table-data text-start">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data">
                                  <p className="associate-text font-14 mt-2 mb-2">
                                    <span className="associate mb-1 font-14">
                                      Individual
                                    </span>
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <Button className="main-btn px-3 py-1 font-14">
                                    Raise Invoice
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="time-table-data text-start">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data">
                                  <p className="associate-text font-14 mt-2 mb-2">
                                    <span className="associate mb-1 font-14">
                                      Individual
                                    </span>
                                  </p>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress white-nowrap">
                                    Unpaid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <Button
                                    className="main-btn px-3 py-1 font-14"
                                    disabled
                                  >
                                    Invoice Raised
                                  </Button>
                                </td>
                              </tr>
                              <tr>
                                <td className="time-table-data text-start">
                                  Figma to UI
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="user-imgbx application-imgbx mx-0 mb-0">
                                      <img
                                        src={userImage}
                                        className="user-img"
                                      />
                                    </div>
                                    Rohit Sharma
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  140 hrs
                                </td>
                                <td className="time-table-data text-start">
                                  Jan 2024
                                </td>
                                <td className="time-table-data text-start">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={companyname}
                                  >
                                    <div className="text-center">
                                      <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                                        <img
                                          src={associateLogo}
                                          className="user-img"
                                        />
                                      </div>
                                    </div>
                                  </OverlayTrigger>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-finished white-nowrap">
                                    Paid
                                  </span>
                                </td>
                                <td className="time-table-data text-start">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={downloadinvoice}
                                  >
                                    <Button
                                      variant="transparent"
                                      className="arrow-btn primary-arrow"
                                    >
                                      <HiDownload />
                                    </Button>
                                  </OverlayTrigger>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div> */}
          <Tab.Content>
            {activeTab === ACTIVE_TABS.projects &&
              timeReportDetails.projects?.length > 0 &&
              timeReportDetails.projects.map((curElem, idx) => (
                <SingleProject
                  key={idx}
                  projectName={curElem?.job?.title}
                  developerData={curElem?.developer}
                />
              ))}

            {activeTab === ACTIVE_TABS.timeReportingOrInvoicing && (
              <div className="card-box">
                <div id="left-tabs-example">
                  <div className="d-flex justify-content-center">
                    <div variant="pills" className="weekly-tabs mb-0">
                      <div
                        className={`weekly-tab-item pointer`}
                        onClick={() =>
                          setSecondActiveTab(ACTIVE_TABS_2.raisedByDevAndVendor)
                        }
                      >
                        <div
                          className={`weekly-tab-link d-flex align-items-center gap-2 ${
                            secondActiveTab ===
                              ACTIVE_TABS_2.raisedByDevAndVendor && "active"
                          }`}
                          eventKey="raise-by-devs"
                        >
                          Raise By Devs/Vendors
                        </div>
                      </div>
                      <div
                        className={`weekly-tab-item pointer`}
                        onClick={() =>
                          setSecondActiveTab(ACTIVE_TABS_2.raisedToClients)
                        }
                      >
                        <div
                          className={`weekly-tab-link  ${
                            secondActiveTab === ACTIVE_TABS_2.raisedToClients &&
                            "active"
                          }`}
                          eventKey="raise-to-clients"
                        >
                          Raise To Clients
                        </div>
                      </div>
                    </div>
                  </div>
                  <Tab.Content>
                    <TimeReportingFilterSection
                      filters={filters}
                      setFilters={setFilters}
                    />
                    {activeTab === ACTIVE_TABS.timeReportingOrInvoicing &&
                      secondActiveTab ===
                        ACTIVE_TABS_2.raisedByDevAndVendor && (
                        <div>
                          {/* <div className="filter-section d-lg-flex align-items-center mt-3 justify-content-between mb-3">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Select Month</option>
                                  <option>January</option>
                                  <option>Feburary</option>
                                  <option>March</option>
                                  <option>April</option>
                                  <option>May</option>
                                  <option>June</option>
                                  <option>July</option>
                                  <option>August</option>
                                  <option>September</option>
                                  <option>October</option>
                                  <option>November</option>
                                  <option>December</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Select Year</option>
                                  <option>2024</option>
                                  <option>2023</option>
                                  <option>2022</option>
                                  <option>2021</option>
                                  <option>2020</option>
                                  <option>2019</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Select Developer</option>
                                  <option>Rohit Sharma</option>
                                  <option>Rohit Sharma</option>
                                  <option>Rohit Sharma</option>
                                  <option>Rohit Sharma</option>
                                  <option>Rohit Sharma</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Select Project</option>
                                  <option>Figma to UI</option>
                                  <option>Figma to UI</option>
                                  <option>Figma to UI</option>
                                  <option>Figma to UI</option>
                                  <option>Figma to UI</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Invoice Status</option>
                                  <option>Paid</option>
                                  <option>Unpaid</option>
                                  <option>Reject</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Button
                                  className="main-btn py-1_5 px-4"
                                  variant="transparent"
                                >
                                  Filter
                                </Button>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <Form.Control
                                type="text"
                                className="common-field font-14 shadow-none"
                                placeholder="Enter Keyword..."
                              />
                              <Button
                                variant="transparent"
                                className="main-btn px-3 search-btn"
                              >
                                <IoSearch />
                              </Button>
                            </div>
                          </div> */}
                          <RaisedToClientTable
                            columns={RAISED_BY_DEVS_COLUMNS}
                            data={
                              timeReportDetails?.invoices_time_reporting
                                ?.raised_by_dev_vendor
                            }
                            isRaisedByDevAndVendor={true}
                            totalPages={totalPages}
                            page={page}
                            setPage={setPage}
                          />
                        </div>
                      )}
                    {activeTab === ACTIVE_TABS.timeReportingOrInvoicing &&
                      secondActiveTab === ACTIVE_TABS_2.raisedToClients && (
                        <div>
                          {/* <TimeReportingFilterSection filters={filters} setFilters={setFilters}/> */}
                          {/* <div className="filter-section d-lg-flex align-items-center mt-3 justify-content-between mb-3">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Select Month</option>
                                  <option>January</option>
                                  <option>Feburary</option>
                                  <option>March</option>
                                  <option>April</option>
                                  <option>May</option>
                                  <option>June</option>
                                  <option>July</option>
                                  <option>August</option>
                                  <option>September</option>
                                  <option>October</option>
                                  <option>November</option>
                                  <option>December</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Select Year</option>
                                  <option>2024</option>
                                  <option>2023</option>
                                  <option>2022</option>
                                  <option>2021</option>
                                  <option>2020</option>
                                  <option>2019</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Select Developer</option>
                                  <option>Rohit Sharma</option>
                                  <option>Rohit Sharma</option>
                                  <option>Rohit Sharma</option>
                                  <option>Rohit Sharma</option>
                                  <option>Rohit Sharma</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Select Project</option>
                                  <option>Figma to UI</option>
                                  <option>Figma to UI</option>
                                  <option>Figma to UI</option>
                                  <option>Figma to UI</option>
                                  <option>Figma to UI</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Form.Select className="time-filter-select shadow-none">
                                  <option>Invoice Status</option>
                                  <option>Paid</option>
                                  <option>Unpaid</option>
                                  <option>Reject</option>
                                </Form.Select>
                              </div>
                              <div>
                                <Button
                                  className="main-btn py-1_5 px-4"
                                  variant="transparent"
                                >
                                  Filter
                                </Button>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <Form.Control
                                type="text"
                                className="common-field font-14 shadow-none"
                                placeholder="Enter Keyword..."
                              />
                              <Button
                                variant="transparent"
                                className="main-btn px-3 search-btn"
                              >
                                <IoSearch />
                              </Button>
                            </div>
                          </div> */}
                          <RaisedToClientTable
                            columns={RAISED_TO_CLIENT_COLUMNS}
                            data={
                              timeReportDetails?.invoices_time_reporting
                                ?.raised_to_client
                            }
                            totalPages={totalPages}
                            page={page}
                            setPage={setPage}
                          />
                        </div>
                      )}
                  </Tab.Content>
                </div>
              </div>
            )}
          </Tab.Content>
        </section>
      )}
      <Offcanvas
        className="time-detail-sidepanel"
        show={remarkshow}
        onHide={handleremarkClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Remarks</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="remarks-section">
            <div className="remark-card-wrapper">
              <div className="remark-card">
                <div className="remark-user">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <img src={userImage} /> Client Name
                  </div>
                  <p>25 Apr, 11:20 AM</p>
                </div>
                <div className="remark-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod totam cupiditate ipsa eveniet ea magni recusandae
                    similique rerum aspernatur facilis? Minus quo quae aliquid
                    culpa vero incidunt blanditiis quibusdam dolorem? Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit. Beatae
                    accusantium eius, dolor deserunt eum aperiam sed repudiandae
                    possimus nisi, sunt id. Culpa voluptatum vero sint
                    praesentium non autem veritatis doloribus.
                  </p>
                </div>
              </div>
              <div className="remark-card">
                <div className="remark-user">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <img src={userImage} /> Admin
                  </div>
                  <p>25 Apr, 11:20 AM</p>
                </div>
                <div className="remark-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod totam cupiditate ipsa eveniet ea magni recusandae
                    similique rerum aspernatur facilis? Minus quo quae aliquid
                    culpa vero incidunt blanditiis quibusdam dolorem? Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit. Beatae
                    accusantium eius, dolor deserunt eum aperiam sed repudiandae
                    possimus nisi, sunt id. Culpa voluptatum vero sint
                    praesentium non autem veritatis doloribus.
                  </p>
                </div>
              </div>
              <div className="remark-card">
                <div className="remark-user">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <img src={userImage} /> Me (Rohit Sharma)
                  </div>
                  <p>25 Apr, 11:20 AM</p>
                </div>
                <div className="remark-content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod totam cupiditate ipsa eveniet ea magni recusandae
                    similique rerum aspernatur facilis? Minus quo quae aliquid
                    culpa vero incidunt blanditiis quibusdam dolorem? Lorem
                    ipsum dolor sit, amet consectetur adipisicing elit. Beatae
                    accusantium eius, dolor deserunt eum aperiam sed repudiandae
                    possimus nisi, sunt id. Culpa voluptatum vero sint
                    praesentium non autem veritatis doloribus.
                  </p>
                </div>
              </div>
            </div>
            <div className="remark-input-wrapper">
              <div>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Enter your remark"
                  className="common-field font-14"
                />
                <Button className="main-btn font-14 mt-2 py-2 px-3">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <InvoicePaidModal
        show={showInvoicePaidModal}
        handleClose={handleCloseInvoicePaid}
      />

      <div className="helper-text-section mt-4">
        <h3>Guiding You Through: Helpful Text to Navigate Time Reporting</h3>
        <p>
          Admin can effortlessly review daily time sheets and promptly raise
          invoices for clients. Click on any client's name in the table above to
          delve deeper into their project and time reporting details. Gain
          insights and manage project progress with precision. Also you can
          raise invoice for clients and track the invoices for Devs , Vendors
          and Clients.
        </p>
      </div>
    </>
  );
};
export default TimeReportingDetail;
