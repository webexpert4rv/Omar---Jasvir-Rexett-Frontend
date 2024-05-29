import React, { useEffect, useState } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../../redux/slices/clientDataSlice";
import SingleInvoiceRow from "../../components/common/Single Invoice/SingleInvoiceRow";
import RexettPagination from "../../components/atomic/RexettPagination";
import RexettInvoiceFilter from "../../components/common/Invoice filter/RexettInvoiceFilter";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import timeSheetIcon from '../../assets/img/timesheet_approved.png';
import associateLogo from "../../assets/img/aviox-logo.png"
import invoiceIcon from '../../assets/img/invoice_paid.png'
import timeSheetNotApproved from '../../assets/img/timesheet_notapproved.png';
import invoiceUnpaid from '../../assets/img/invoice_unpaid.png'
import { IoSearch } from "react-icons/io5";
import userImage from "../../assets/img/user-img.jpg"
const INVOICE_HEADER_DATA = [
  "developerName",
  "date",
  "amount",
  "status",
  "action",
];
const Invoice = () => {
  const dispatch = useDispatch();
  const { invoiceList, screenLoader } = useSelector(
    (state) => state.clientData
  );
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    developerName: "",
    year: "",
    month: "",
    status: "",
  });
  const [showFolderView, setShowFolderView] = useState(false);

  useEffect(() => {
    let data = {
      page: page,
      ...selectedFilters,
    };
    dispatch(getInvoice(data));
  }, [page, selectedFilters]);

  const { t } = useTranslation();

  const handleDownload = (url) => {
    const newTab = window.open(url, '_blank');
    if (newTab) {
      newTab.focus();
    } else {
      // If the popup blocker prevents opening the new tab
      alert('Please allow pop-ups for this site to download the file in a new tab.');
    }
  };
  const downloadinvoice = (
    <Tooltip id="tooltip">
      Download Invoice
    </Tooltip>
  );
  const downloadtimesheet = (
    <Tooltip id="tooltip">
      Download Timesheet
    </Tooltip>
  );
  const companyname = (

    <Tooltip id="tooltip">
      Aviox Technologies Pvt Ltd
    </Tooltip>
  );

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        // <section style={{ display: showFolderView ? "none" : "block" }}>
        //   <div>
        //     <div className="filter-section">
        //       <RexettInvoiceFilter
        //         setSelectedFilters={setSelectedFilters}
        //         selectedFilters={selectedFilters}
        //       />
        //       {/* <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        //       <Form>
        //         <div className="d-flex gap-3 align-items-end">
        //           <div>
        //             <Form.Select className="w-auto w-1 shadow-none">
        //               <option value="">Select Developer</option>
        //               <option value="rohit">Rohit Sharma</option>
        //               <option value="rohit">Rohit Sharma</option>
        //               <option value="rohit">Rohit Sharma</option>
        //             </Form.Select>
        //           </div>
        //           <div>
        //             <Form.Select className="w-auto w-1 shadow-none">
        //               <option value="">Select Status</option>
        //               <option value="approved">Approved</option>
        //               <option value="pending">Pending</option>
        //             </Form.Select>
        //           </div>
        //           <div>
        //             <Form.Label className="common-label">Select Year</Form.Label>
        //             <Form.Select className="w-auto shadow-none">
        //               <option value="">Select Year</option>
        //               <option value="2024">2024</option>
        //               <option value="2023">2023</option>
        //               <option value="2022">2022</option>
        //               <option value="2021">2021</option>
        //               <option value="2020">2020</option>
        //               <option value="2019">2019</option>
        //               <option value="2018">2018</option>
        //               <option value="2017">2017</option>
        //             </Form.Select>
        //           </div>

        //           <Form.Select className="w-auto shadow-none" value="">
        //             <option value="">{t("selectMonth")}</option>
        //             <option value="1">{t("january")}</option>
        //             <option value="2">{t("feburary")}</option>
        //             <option value="3">{t("march")}</option>
        //             <option value="4">{t("april")}</option>
        //             <option value="5">{t("may")}</option>
        //             <option value="6">{t("june")}</option>
        //             <option value="7">{t("july")}</option>
        //             <option value="8">{t("august")}</option>
        //             <option value="9">{t("september")}</option>
        //             <option value="10">{t("october")}</option>
        //             <option value="11">{t("november")}</option>
        //             <option value="12">{t("december")}</option>
        //           </Form.Select>
        //           <div className="d-flex gap-3">
        //             <Form.Control type="text" placeholder="Search" className="search-field" onChange={handleSearchChange}></Form.Control>
        //             <RexettButton
        //               type="submit"
        //               text="Filter"
        //               className="main-btn py-1_5 px-4"
        //               variant="transparent"
        //               isLoading={false}
        //             />
        //           </div>
        //         </div>
        //       </Form>
        //     </div> */}
        //     </div>
        //     <div>
        //       <div className="table-responsive">
        //         <table className="table table-ui-custom">
        //           <thead>
        //             <tr>
        //               {INVOICE_HEADER_DATA.map((title, idx) => (
        //                 <th key={idx}>{t(title)}</th>
        //               ))}
        //               {/* <th>{t("developerName")}</th>
        //             <th>{t("date")}</th>
        //             <th>{t("status")}</th>
        //             <th>{t("action")}</th> */}
        //             </tr>
        //           </thead>
        //           <tbody>
        //             {invoiceList?.data?.length > 0 &&
        //               invoiceList.data.map((curInvoice, idx) => (
        //                 <SingleInvoiceRow key={idx} curInvoice={curInvoice} />
        //               ))}
        //             {/* <tr>
        //             <td className="align-middle">Rohit Sharma</td>
        //             <td className="align-middle">12-09-2023</td>
        //             <td className="align-middle">
        //               <span className="status-finished fw-semibold">
        //                 Approved
        //               </span>
        //             </td>
        //             <td>
        //               <div>
        //                 <OverlayTrigger
        //                   placement="bottom"
        //                   overlay={actiontooltip}
        //                 >
        //                   <Button className="action-btn">
        //                     <HiDownload />
        //                   </Button>
        //                 </OverlayTrigger>
        //               </div>
        //             </td>
        //           </tr>
        //           <tr>
        //             <td className="align-middle">Rohit Sharma</td>
        //             <td className="align-middle">12-09-2023</td>
        //             <td className="align-middle">
        //               <span className="status-progress fw-semibold">
        //                 Pending
        //               </span>
        //             </td>
        //             <td>
        //               <div>
        //                 <OverlayTrigger
        //                   placement="bottom"
        //                   overlay={actiontooltip}
        //                 >
        //                   <Button className="action-btn" disabled>
        //                     <HiDownload />
        //                   </Button>
        //                 </OverlayTrigger>
        //               </div>
        //             </td>
        //           </tr> */}
        //           </tbody>
        //         </table>
        //       </div>
        //     </div>
        //     {invoiceList?.pagination?.totalPages > 1 && (
        //       <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
        //         <p className="showing-result">
        //           {t("showing")} {invoiceList?.pagination?.perPage}{" "}
        //           {t("results")}
        //         </p>
        //         <RexettPagination
        //           number={invoiceList?.pagination?.totalPages}
        //           setPage={setPage}
        //           page={page}
        //         />
        //       </div>
        //     )}
        //   </div>
        // </section>
        <>
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
                </Form.Select>
              </div>
              <div>
                <Form.Select className="time-filter-select shadow-none">
                  <option>Invoice Status</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                  <option>Cancelled</option>
                </Form.Select>
              </div>
              <div>
                <Button className="main-btn py-1_5 px-4" variant="transparent">Filter</Button>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Form.Control
                type="text"
                className="common-field font-14 shadow-none"
                placeholder="Enter Keyword..."
              />
              <Button variant="transparent" className="main-btn px-3 search-btn">
                <IoSearch />
              </Button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table time-table table-bordered table-ui-custom">
              <thead>
                <th className="time-table-head text-start">
                  Developer Name
                </th>
                <th className="time-table-head text-start">
                  Associated With
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
                  Project Status
                </th>
                <th className="time-table-head text-start">
                  Action
                </th>
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
                    <span className="associate-text">
                      <span className="associate">Individual</span>
                    </span>
                  </td>
                  <td className="time-table-data text-start">AI Bot Project</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                        <img src={invoiceIcon} className="approved_icon" />
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
                    <OverlayTrigger placement="bottom" overlay={companyname}>
                      <div className="text-start">
                        <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                          <img src={associateLogo} className="user-img" />
                        </div>
                      </div>
                    </OverlayTrigger>
                  </td>
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <img src={timeSheetNotApproved} className="approved_icon" />
                      <img src={invoiceUnpaid} className="approved_icon" />
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
                    <span className="associate-text">
                      <span className="associate">Individual</span>
                    </span>
                  </td>
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start"><span className="status-progress">Progress</span></td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                        <img src={invoiceIcon} className="approved_icon" />
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
                    <OverlayTrigger placement="bottom" overlay={companyname}>
                      <div className="text-start">
                        <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                          <img src={associateLogo} className="user-img" />
                        </div>
                      </div>
                    </OverlayTrigger>
                  </td>
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                        <img src={invoiceIcon} className="approved_icon" />
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
                    <OverlayTrigger placement="bottom" overlay={companyname}>
                      <div className="text-start">
                        <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                          <img src={associateLogo} className="user-img" />
                        </div>
                      </div>
                    </OverlayTrigger>
                  </td>
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                        <img src={invoiceIcon} className="approved_icon" />
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
                    <span className="associate-text">
                      <span className="associate">Individual</span>
                    </span>
                  </td>
                  <td className="time-table-data text-start">Figma to UI</td>
                  <td className="time-table-data text-start">140 hrs</td>
                  <td className="time-table-data text-start">Jan 2024</td>
                  <td className="time-table-data text-start"><span className="status-finished">Completed</span></td>
                  <td className="time-table-data text-start">
                    <div className="d-flex align-items-center gap-2">
                      <OverlayTrigger placeholder="bottom" overlay={downloadtimesheet}>
                        <img src={timeSheetIcon} className="approved_icon" />
                      </OverlayTrigger>
                      <OverlayTrigger placeholder="bottom" overlay={downloadinvoice}>
                        <img src={invoiceIcon} className="approved_icon" />
                      </OverlayTrigger>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </>
      )}
    </>
  );
};

export default Invoice;
