import React, { useEffect, useState } from "react";
import {
  Button,
  OverlayTrigger,
  Tooltip,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFileInvoice,
  getDeveloperList,
  getClientList,
} from "../../redux/slices/vendorDataSlice";
import { filePreassignedUrlGenerate } from "../../redux/slices/clientDataSlice";
import RexettButton from "../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import timeSheetIcon from "../../assets/img/timesheet_approved.png";
import companyLogo from "../../assets/img/amazon.png";
import invoiceIcon from "../../assets/img/invoice_paid.png";
import timeSheetNotApproved from "../../assets/img/timesheet_notapproved.png";
import invoiceUnpaid from "../../assets/img/invoice_unpaid.png";
import { IoSearch } from "react-icons/io5";
import userImage from "../../assets/img/user-img.jpg";
import { RxChevronRight } from "react-icons/rx";
import { convertDateIntoRequiredFormat } from "../../pages/websiteRegisterForm/developer/developeStepConstant";
// dummy data
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

const dummyColumns = {
  projectInfo: [
    // if data is inside different objects  then key and subkey concept will be used otherwise not
    // { label: "projectName", key: "project", subkey: "title" }, //project name can be in title key
    { label: "projectName", key: "projectName" },
    { label: "totalHiredDevelopers", key: "totalHiredDevelopers" },
    { label: "totalInvoiceRaised", key: "totalInvoiceRaised" },
    { label: "totalHoursSpend", key: "totalHoursSpend", isHours: true },
    { label: "startDate", key: "startDate", isDate: true },
    { label: "invoiceMonth", key: "invoiceMonth" },
    { label: "projectStatus", key: "projectStatus", isStatus: true },
  ],
  developerInfo: [
    {
      label: "developerName",
      //   key: "developers",
      key: "developerName",
      profilePictureKey: "profile_picture",
    },
    {
      label: "totalHoursSpend",
      key: "totalHoursSpend",
      isHours: true,
    },
    {
      label: "invoiceMonth",
      key: "invoiceMonth",
    },
    {
      // need to change this key
      label: "projectStatus",
      key: "projectStatus",
      isAction: true,
      invoiceUrlKey: "invoiceUrl",
      timesheetUrlKey: "timesheetUrl",
    },
  ],
};

const CommonInvoiceTable = ({ data, columns }) => {
  const downloadinvoice = <Tooltip id="tooltip">Download Invoice</Tooltip>;
  const downloadtimesheet = <Tooltip id="tooltip">Download Timesheet</Tooltip>;
  const { t } = useTranslation();
  const [expandedRow, setExpandedRow] = useState(null);
  const [arrowActive, setArrowActive] = useState(null);
  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setArrowActive(index == arrowActive ? null : index);
  };
  const handleDownload = (fileUrl) => {
    if (fileUrl) {
      const newTab = window.open(fileUrl, "_blank");
      if (newTab) {
        newTab.focus();
      } else {
        // If the popup blocker prevents opening the new tab
        alert(
          "Please allow pop-ups for this site to download the file in a new tab."
        );
      }
    }
  };
  return (
    <div className="table-responsive">
      <table className="table time-table table-bordered table-ui-custom">
        <thead>
          {
            // add columns instead of dummy columns
            dummyColumns?.projectInfo.map(({ label }) => (
              <th className="time-table-head text-start">{t(label)}</th>
            ))
          }
        </thead>
        <tbody>
          {/* {dummyProjects?.projectInfo?.map((curRow, rowIndex) => ( */}
          {data?.map((curRow, rowIndex) => (
            <>
              <tr
                className="application-row"
                onClick={() => handleRowClick(rowIndex)}
              >
                {dummyColumns?.projectInfo?.map(
                  ({ key, subkey, isHours, isDate, isStatus }, index) => (
                    <td key={index} className="time-table-data text-start">
                      {index === 0 && (
                        <span
                          className={
                            arrowActive == rowIndex
                              ? "row-arrow active"
                              : "row-arrow"
                          }
                        >
                          <RxChevronRight />
                        </span>
                      )}
                      {!subkey && (
                        <>
                          {isDate &&
                            convertDateIntoRequiredFormat(
                              curRow[key],
                              "DD-MM-YYYY"
                            )}
                          {isStatus && (
                            <span className="status-progress">Progress</span>
                          )}
                          {!isDate && !isStatus && curRow[key]}{" "}
                          {isHours && " hrs"}
                        </>
                      )}
                    </td>
                  )
                )}
              </tr>
              {expandedRow === rowIndex && (
                <tr>
                  <td colSpan="7">
                    <div className="table-responsive">
                      <table className="table time-table table-bordered table-ui-custom mb-0">
                        <thead>
                          {dummyColumns?.developerInfo?.map(
                            ({ label }, index) => (
                              <th
                                key={index}
                                className="time-table-head text-start"
                              >
                                {t(label)}
                              </th>
                            )
                          )}
                        </thead>
                        <tbody>
                          {curRow?.developers?.map((curExpandedRow) => (
                            <tr>
                              {dummyColumns?.developerInfo?.map(
                                ({
                                  key,
                                  subkey,
                                  profilePictureKey,
                                  isAction,
                                  isHours,
                                  invoiceUrlKey,
                                  timesheetUrlKey,
                                }) => (
                                  <>
                                    <td className="time-table-data text-start">
                                      {profilePictureKey && (
                                        <div className="d-flex align-items-center gap-2">
                                          <div className="user-imgbx application-imgbx mx-0 mb-0">
                                            <img
                                              src={
                                                curExpandedRow?.[
                                                  profilePictureKey
                                                ]
                                                  ? curExpandedRow?.[
                                                      profilePictureKey
                                                    ]
                                                  : "/demo-user.png"
                                              }
                                              className="user-img"
                                            />
                                          </div>
                                          {curExpandedRow?.[key]}
                                        </div>
                                      )}
                                      {isAction && (
                                        <div className="d-flex align-items-center gap-2">
                                          <OverlayTrigger
                                            placeholder="bottom"
                                            overlay={downloadtimesheet}
                                          >
                                            <img
                                              onClick={() => {
                                                handleDownload(
                                                  curExpandedRow?.[
                                                    timesheetUrlKey
                                                  ]
                                                );
                                              }} //if invoice url key is same for both eveloper and vendr than ads that statically no need to create invoice and timesheet url key
                                              src={timeSheetIcon}
                                              className="approved_icon"
                                            />
                                          </OverlayTrigger>
                                          <OverlayTrigger
                                            placeholder="bottom"
                                            overlay={downloadinvoice}
                                          >
                                            <img
                                              onClick={() => {
                                                handleDownload(
                                                  curExpandedRow?.[
                                                    invoiceUrlKey
                                                  ]
                                                );
                                              }} //if invoice url key is same for both eveloper and vendr than ads that statically no need to create invoice and timesheet url key
                                              src={invoiceIcon} //timesheet icon according to status is pending
                                              className="approved_icon"
                                            />
                                          </OverlayTrigger>
                                        </div>
                                      )}
                                      {!profilePictureKey &&
                                        !isAction &&
                                        curExpandedRow?.[key]}
                                      {isHours && "hrs"}
                                    </td>
                                  </>
                                )
                              )}

                              {/* <td className="time-table-data text-start">
                                140 hrs
                              </td>
                              <td className="time-table-data text-start">
                                Jun 2024
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
                              </td> */}
                            </tr>
                          ))}
                          {/* <tr>
                            <td className="time-table-data text-start">
                              <div className="d-flex align-items-center gap-2">
                                <div className="user-imgbx application-imgbx mx-0 mb-0">
                                  <img src={userImage} className="user-img" />
                                </div>
                                Emily Davis
                              </div>
                            </td>
                            <td className="time-table-data text-start">
                              140 hrs
                            </td>
                            <td className="time-table-data text-start">
                              Jun 2024
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
                                James Taylor
                              </div>
                            </td>
                            <td className="time-table-data text-start">
                              140 hrs
                            </td>
                            <td className="time-table-data text-start">
                              Jun 2024
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
                                    src={invoiceUnpaid}
                                    className="approved_icon"
                                  />
                                </OverlayTrigger>
                              </div>
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonInvoiceTable;
