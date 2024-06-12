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
  TIME_REPORTING_FILTER_FIELDS,
  buildQueryFromObjects,
} from "./adminConstant";
import ClientDetailSection from "./ClientDetailSection";
import DeveloperCard from "./DeveloperCard";
import SingleProject from "./SingleProject";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import RaisedToClientTable from "./RaisedToClientTable";
import NoDataFound from "../../components/atomic/NoDataFound";
import CommonFilterSection from "../../components/atomic/CommonFilterSection";
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
  const { timeReportDetails, screenLoader,timeReportingDetailTotalPage } = useSelector(
    (state) => state.adminData
  );
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
            activeProjects ={timeReportDetails?.activeProjects}
            totalProjects={timeReportDetails?.total_projects}
          />
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
                    <div variant="pills" className="weekly-tabs d-flex mb-3">
                      <div className="weekly-tab-item pointer">
                        <div
                          className={`weekly-tab-link d-flex align-items-center gap-2 ${
                            secondActiveTab === ACTIVE_TABS_2.raisedByDevAndVendor && "active"
                          }`}
                          eventKey="raise-by-devs"
                          onClick={() =>
                            setSecondActiveTab(ACTIVE_TABS_2.raisedByDevAndVendor)
                          }
                        >
                          Raise By Devs/Vendors
                        </div>
                      </div>
                      <div className="weekly-tab-item pointer">
                        <div
                          className={`weekly-tab-link ${
                            secondActiveTab === ACTIVE_TABS_2.raisedToClients &&
                            "active"
                          }`}
                          onClick={() =>
                            setSecondActiveTab(ACTIVE_TABS_2.raisedToClients)
                          }
                        >
                          Raise To Clients
                        </div>
                      </div>
                    </div>
                  </div>
                  <Tab.Content>
                    {/* <TimeReportingFilterSection
                      filters={filters}
                      setFilters={setFilters}
                    /> */}
                    <CommonFilterSection filters={filters} setFilters={setFilters} filterFields={TIME_REPORTING_FILTER_FIELDS}/>
                    {activeTab === ACTIVE_TABS.timeReportingOrInvoicing &&
                      secondActiveTab ===
                        ACTIVE_TABS_2.raisedByDevAndVendor && (
                        <div>
                          <RaisedToClientTable
                            columns={RAISED_BY_DEVS_COLUMNS}A
                            data={
                              timeReportDetails?.invoices_time_reporting
                                ?.raised_by_dev_vendor
                            }
                            isRaisedByDevAndVendor={true}
                            totalPages={timeReportingDetailTotalPage}
                            page={page}
                            setPage={setPage}
                          />
                        </div>
                      )}
                    {activeTab === ACTIVE_TABS.timeReportingOrInvoicing &&
                      secondActiveTab === ACTIVE_TABS_2.raisedToClients && (
                        <div>
                          <RaisedToClientTable
                            columns={RAISED_TO_CLIENT_COLUMNS}
                            data={
                              timeReportDetails?.invoices_time_reporting
                                ?.raised_to_client
                            }
                            totalPages={timeReportingDetailTotalPage}
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
      {/* <Offcanvas
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
      </Offcanvas> */}
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
