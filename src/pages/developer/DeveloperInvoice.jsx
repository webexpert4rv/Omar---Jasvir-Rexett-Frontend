import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import CommonFilterSection from "../../components/atomic/CommonFilterSection";
import { useDispatch, useSelector } from "react-redux";
import {
  INVOICE_OPTIONS,
  INVOICE_STATUS_OPTIONS,
  MONTH_FILTER_OPTIONS,
  PROJECT_FILTER_OPTIONS,
  YEAR_FILTER_OPTIONS,
  buildQueryFromObjects,
} from "../admin/adminConstant";
import { getPaySlips } from "../../redux/slices/developerDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import TableComponentOne from "../../components/atomic/TableComponentOne";
import { DEVELOPER_INVOICE_COLUMNS } from "./developerConstant";
const DEVELOPER_INVOICE_PER_PAGE = 5;

const FILTER_FIELDS = {
  selectFilters:[
    {
      filterLabel: "Select Month",
      key: "month",
      options: MONTH_FILTER_OPTIONS,
    },
    {
      filterLabel: "Select Year",
      key: "year",
      options: YEAR_FILTER_OPTIONS,
    },
    {
      filterLabel: "Select Project",
      key: "projectName",
      options: PROJECT_FILTER_OPTIONS,
    },
    {
      filterLabel: "Invoice Status",
      key: "invoiceStatus",
      options: INVOICE_OPTIONS,
    },
  ],
  // searchFilter:{key:"",placeholder:""}
}
const DeveloperInvoice = () => {
  const dispatch = useDispatch();
  const { screenLoader, totalPaySlipPages, paySlips } = useSelector(
    (state) => state.developerData
  );
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    invoiceStatus: "",
    projectName: "",
  });
  useEffect(() => {
    const filterQuery = buildQueryFromObjects(filters);
    const query = `${filterQuery}&page=${page}&perPage=${DEVELOPER_INVOICE_PER_PAGE}`;
    handleGetPaySlips(query);
  }, [filters, page]);

  const handleGetPaySlips = (query) => {
    dispatch(getPaySlips(query));
  };
  const downloadinvoice = <Tooltip id="tooltip">Download Invoice</Tooltip>;
  const downloadtimesheet = <Tooltip id="tooltip">Download Timesheet</Tooltip>;
  const companyname = (
    <Tooltip id="tooltip">Aviox Technologies Pvt Ltd</Tooltip>
  );
  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <>
          <CommonFilterSection
            filters={filters}
            setFilters={setFilters}
            filterFields={FILTER_FIELDS}
            isSearchFilterRequired={false}
          />
          {/* <div className="table-responsive">
            <table className="table time-table table-bordered table-ui-custom">
              <thead>
                <th className="time-table-head text-start">Client Name</th>
                <th className="time-table-head text-start">Project</th>
                <th className="time-table-head text-start">Total Hours</th>
                <th className="time-table-head text-start">Invoice Month</th>
                <th className="time-table-head text-start">Project Status</th>
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
                  <td className="time-table-data text-start">AI Bot Project</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start">
                    <span className="status-progress">Progress</span>
                  </td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadtimesheet}
                      >
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadinvoice}
                      >
                        <img src={invoiceIcon} className="approved_icon" />
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
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start">
                    <span className="status-progress">Progress</span>
                  </td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={timeSheetNotApproved}
                        className="approved_icon"
                      />
                      <img src={invoiceUnpaid} className="approved_icon" />
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
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start">
                    <span className="status-progress">Progress</span>
                  </td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadtimesheet}
                      >
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadinvoice}
                      >
                        <img src={invoiceIcon} className="approved_icon" />
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
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start">
                    <span className="status-finished">Completed</span>
                  </td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadtimesheet}
                      >
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadinvoice}
                      >
                        <img src={invoiceIcon} className="approved_icon" />
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
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start">
                    <span className="status-finished">Completed</span>
                  </td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadtimesheet}
                      >
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadinvoice}
                      >
                        <img src={invoiceIcon} className="approved_icon" />
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
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start">
                    <span className="status-finished">Completed</span>
                  </td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadtimesheet}
                      >
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger
                        placeholder="bottom"
                        overlay={downloadinvoice}
                      >
                        <img src={invoiceIcon} className="approved_icon" />
                      </OverlayTrigger>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <TableComponentOne
            data={paySlips}
            columns={DEVELOPER_INVOICE_COLUMNS}
            page={page}
            setPage={setPage}
            totalPages={totalPaySlipPages}
          />
        </>
      )}
    </>
  );
};
export default DeveloperInvoice;
