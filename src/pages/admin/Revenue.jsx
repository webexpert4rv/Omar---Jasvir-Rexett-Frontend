import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { IoTrendingUpSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getRevenue } from "../../redux/slices/vendorDataSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import userImage from "../../assets/img/user-img.jpg";
import companyLogo from "../../assets/img/amazon.png";
import associateLogo from "../../assets/img/aviox-logo.png";
import { IoSearch } from "react-icons/io5";
import { HiDownload } from "react-icons/hi";
import InvoicePaidModal from "./Modals/InvoicePaid";
import timeSheetIcon from "../../assets/img/timesheet_approved.png";
import invoiceIcon from "../../assets/img/invoice_paid.png";
import timeSheetPendingIcon from "../../assets/img/timesheet_notapproved.png";
import invoicePendingIcon from "../../assets/img/invoice_unpaid.png";
import {
  FILTER_1_FILTER_FIELDS,
  FILTER_2_FILTER_FIELDS,
  INVOICE_PER_PAGE,
  INVOICE_TABS,
  RAISED_BY_CLIENT_INVOICE_COLUMNS,
  RAISED_BY_DEV_INVOICE_COLUMNS,
  buildQueryFromObjects,
} from "./adminConstant";
import { getInvoiceDetails } from "../../redux/slices/adminDataSlice";
import TimeReportingFilterSection from "./TimeReportingFilterSection";
import RaisedToClientTable from "./RaisedToClientTable";
import InvoiceTable from "./InvoiceTable";
import RexettPagination from "../../components/atomic/RexettPagination";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import CommonFilterSection from "../../components/atomic/CommonFilterSection";
import CommonInvoiceTable from "../../components/common/CommonInvoiceTable";

const dummyProjects = [
  {
    projectName: "Figma to UI",
    totalHiredDevelopers: 3,
    totalInvoiceRaised: 5,
    totalHoursSpend: "3000",
    startDate: "10-04-2024",
    invoiceMonth: "Jun 2024",
    developers: [
      {
        developerName: "John Smith",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Emily Davis",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "James Taylor",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Michael Brown",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Sarah Wilson",
        totalHoursSpend: "140 ",
        invoiceMonth: "Jun 2024",
        projectStatus: "Paid",
      },
    ],
  },
  {
    projectName: "Backend API Development",
    totalHiredDevelopers: 4,
    totalInvoiceRaised: 8,
    totalHoursSpend: "5000 ",
    startDate: "01-05-2024",
    invoiceMonth: "Jul 2024",
    developers: [
      {
        developerName: "Anna Lee",
        totalHoursSpend: "160 ",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "David Kim",
        totalHoursSpend: "160 ",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Sophia Martinez",
        totalHoursSpend: "160",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Robert Johnson",
        totalHoursSpend: "160",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Jessica White",
        totalHoursSpend: "160",
        invoiceMonth: "Jul 2024",
        projectStatus: "Paid",
      },
    ],
  },
  {
    projectName: "Mobile App Development",
    totalHiredDevelopers: 5,
    totalInvoiceRaised: 10,
    totalHoursSpend: "7000",
    startDate: "15-06-2024",
    invoiceMonth: "Aug 2024",
    developers: [
      {
        developerName: "Kevin Wang",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Laura Brown",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Steven Clark",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Rachel Adams",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
      {
        developerName: "Daniel Rodriguez",
        totalHoursSpend: "180",
        invoiceMonth: "Aug 2024",
        projectStatus: "Paid",
      },
    ],
  },
];

const Revenue = () => {
  const minOffset = 0;
  const maxOffset = 10;
  const dispatch = useDispatch();
  const { invoiceDetails, invoiceTotalPage, screenLoader } = useSelector(
    (state) => state.adminData
  );
  const [yearOptionsValue, setYearOptionsValue] = useState([]);
  const [activeTab, setActiveTab] = useState(INVOICE_TABS?.raisedByDev);
  const thisYear = new Date().getFullYear();
  const { t } = useTranslation();
  const [showInvoicePaidModal, setShowInvoicePaidModal] = useState(false);

    console.log(invoiceDetails,'detailsssss');

  const handleInvoicePaid = () => {
    setShowInvoicePaidModal(true);
  };
  const handleCloseInvoicePaid = () => {
    setShowInvoicePaidModal(false);
  };
  //   for tab 1
  const [filters1, setFilters1] = useState({
    month: "",
    year: "",
    developerName: "",
    projectName: "",
    invoiceStatus: "",
  });
  //   for tab 2
  const [filters2, setFilters2] = useState({
    month: "",
    year: "",
    // developerName: "",
    projectName: "",
    invoiceStatus: "",
    clientName: "",
  });

  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  const downloadinvoice = <Tooltip id="tooltip">Download Invoice</Tooltip>;
  const downloadtimesheet = <Tooltip id="tooltip">Download Timesheet</Tooltip>;
  const companyname = (
    <Tooltip id="tooltip">Aviox Technologies Pvt Ltd</Tooltip>
  );

  useEffect(() => {
    const optionsValue = [];
    for (let i = minOffset; i <= maxOffset; i++) {
      const year = thisYear - i;
      optionsValue.push(year);
    }
    setYearOptionsValue(optionsValue);
  }, []);

  const monthlyData = (data) => {
    let newData = [];
    data?.forEach((item) => {
      newData.push(item.totalAmount);
    });

    return newData;
  };
  useEffect(() => {
    const filters =
      activeTab === INVOICE_TABS.raisedByDev ? filters1 : filters2;
    const page = activeTab === INVOICE_TABS.raisedByDev ? page1 : page2;
    const filtersQuery = buildQueryFromObjects(filters);
    const query = `${filtersQuery}&page=${page}&perPage=${INVOICE_PER_PAGE}&tab=${activeTab}`;
    handleGetInvoiceDetails(query);
  }, [filters1, filters2, activeTab, page1, page2]);

  const handleGetInvoiceDetails = (query) => {
    dispatch(getInvoiceDetails(query));
  };

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <div className="card-box">
          <Tab.Container id="left-tabs-example">
            <div className="d-flex justify-content-center">
              <div variant="pills" className="weekly-tabs d-flex mb-3">
                <div className="weekly-tab-item pointer">
                  <div
                    className={`weekly-tab-link d-flex align-items-center gap-2 ${
                      activeTab === INVOICE_TABS?.raisedByDev && "active"
                    }`}
                    eventKey="raise-by-devs"
                    onClick={() => setActiveTab(INVOICE_TABS?.raisedByDev)}
                  >
                    Raise By Devs/Vendors
                  </div>
                </div>
                <div className="weekly-tab-item pointer">
                  <div
                    className={`weekly-tab-link ${
                      activeTab === INVOICE_TABS?.raisedToClients && "active"
                    }`}
                    onClick={() => setActiveTab(INVOICE_TABS?.raisedToClients)}
                  >
                    Raise To Clients
                  </div>
                </div>
              </div>
            </div>
            <Tab.Content>
              {activeTab === INVOICE_TABS?.raisedByDev && (
                <div eventKey="raise-by-devs">
                  <CommonFilterSection filters={filters1} setFilters={setFilters1} filterFields={FILTER_1_FILTER_FIELDS} />
                  {/* <TimeReportingFilterSection
                    filters={filters1}
                    setFilters={setFilters1}
                  /> */}
                  {/* <InvoiceTable
                    columns={RAISED_BY_DEV_INVOICE_COLUMNS}
                    data={invoiceDetails?.invoices}
                    isRaisedByDev={true}
                  /> */}
                  <CommonInvoiceTable data={dummyProjects}/>
                  {invoiceTotalPage > 1 ? (
                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                      <p className="showing-result">
                        {/* {t("showing")} {timeReportDetails?.length} {t("results")} */}
                      </p>
                      {/* <RexettPagination
                        number={invoiceTotalPage}
                        setPage={setPage1}
                        page={page1}
                      /> */}
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <RaisedToClientTable  data={invoiceDetails} columns={RAISED_BY_CLIENT_INVOICE_COLUMNS} totalPages={totalPage1}/> */}
                  {/* <div className="table-responsive">
                  <table className="table time-table table-bordered table-ui-custom">
                    <thead>
                      <th className="time-table-head text-start">
                        Developer Name
                      </th>
                      <th className="time-table-head text-start">Project</th>
                      <th className="time-table-head text-start">
                        Client Name
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
                        Project Status
                      </th>
                      <th className="time-table-head text-start">Action</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          AI Bot Project
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1 font-14">
                              Individual
                            </span>
                          </p>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-progress">Progress</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadtimesheet}
                            >
                              <img
                                src={timeSheetIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadinvoice}
                            >
                              <img
                                src={invoiceIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          Figma to UI
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1 font-14">
                              Individual
                            </span>
                          </p>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-progress">Progress</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadtimesheet}
                            >
                              <img
                                src={timeSheetIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadinvoice}
                            >
                              <img
                                src={invoiceIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          Figma to UI
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <OverlayTrigger
                            placement="bottom"
                            overlay={companyname}
                          >
                            <div>
                              <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                                <img src={associateLogo} className="user-img" />
                              </div>
                            </div>
                          </OverlayTrigger>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-progress">Progress</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadtimesheet}
                            >
                              <img
                                src={timeSheetIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadinvoice}
                            >
                              <img
                                src={invoicePendingIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          Figma to UI
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1 font-14">
                              Individual
                            </span>
                          </p>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-finished">Completed</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadtimesheet}
                            >
                              <img
                                src={timeSheetIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadinvoice}
                            >
                              <img
                                src={invoicePendingIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          Figma to UI
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1 font-14">
                              Individual
                            </span>
                          </p>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-finished">Completed</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadtimesheet}
                            >
                              <img
                                src={timeSheetPendingIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadinvoice}
                            >
                              <img
                                src={invoicePendingIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          Figma to UI
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1 font-14">
                              Individual
                            </span>
                          </p>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-finished">Completed</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadtimesheet}
                            >
                              <img
                                src={timeSheetIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadinvoice}
                            >
                              <img
                                src={invoiceIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                </div>
              )}
              {activeTab === INVOICE_TABS?.raisedToClients && (
                <div eventKey="raise-to-clients">
                  <CommonFilterSection filters={filters1} setFilters={setFilters1} filterFields={FILTER_2_FILTER_FIELDS} /> 
                  {/* <TimeReportingFilterSection
                    filters={filters2}
                    setFilters={setFilters2}
                    isInvoiceClientFilter={true}
                  /> */}
                  <InvoiceTable
                    columns={RAISED_BY_CLIENT_INVOICE_COLUMNS}
                    data={invoiceDetails?.invoices}
                  />

                  {invoiceTotalPage > 1 ? (
                    <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                      <p className="showing-result">
                        {/* {t("showing")} {timeReportDetails?.length} {t("results")} */}
                      </p>
                      <RexettPagination
                        number={invoiceTotalPage}
                        setPage={setPage2}
                        page={page2}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <div className="table-responsive">
                  <table className="table time-table table-bordered table-ui-custom">
                    <thead>
                      <th className="time-table-head text-start">
                        Client Name
                      </th>
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
                        Project Status
                      </th>
                      <th className="time-table-head text-start">Action</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          Figma to UI
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1 font-14">
                              Individual
                            </span>
                          </p>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-progress">Progress</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <OverlayTrigger
                              placeholder="bottom"
                              overlay={downloadinvoice}
                            >
                              <img
                                src={invoiceIcon}
                                className="approved_icon"
                              />
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          Figma to UI
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <p className="associate-text font-14 mt-2 mb-2">
                            <span className="associate mb-1 font-14">
                              Individual
                            </span>
                          </p>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-finished">Completed</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={invoicePendingIcon}
                              className="approved_icon"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={companyLogo} className="user-img" />
                            </div>
                            Amazon
                          </div>
                        </td>
                        <td className="time-table-data text-start">
                          Figma to UI
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <div className="user-imgbx application-imgbx mx-0 mb-0">
                              <img src={userImage} className="user-img" />
                            </div>
                            Rohit Sharma
                          </div>
                        </td>
                        <td className="time-table-data text-start">140 hrs</td>
                        <td className="time-table-data text-start">Jan 2024</td>
                        <td className="time-table-data text-start">
                          <OverlayTrigger
                            placement="bottom"
                            overlay={companyname}
                          >
                            <div>
                              <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                                <img src={associateLogo} className="user-img" />
                              </div>
                            </div>
                          </OverlayTrigger>
                        </td>
                        <td className="time-table-data text-start">
                          <span className="status-finished">Completed</span>
                        </td>
                        <td className="time-table-data text-start">
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={invoicePendingIcon}
                              className="approved_icon"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                </div>
              )}
            </Tab.Content>
          </Tab.Container>
        </div>
      )}
      <InvoicePaidModal
        show={showInvoicePaidModal}
        handleClose={handleCloseInvoicePaid}
      />
    </>
  );
};
export default Revenue;
