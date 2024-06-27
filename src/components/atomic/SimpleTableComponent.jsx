import React from "react";
import { useTranslation } from "react-i18next";
import RexettPagination from "./RexettPagination";
import { getDateInRequiredFormat } from "../utils";
import NoDataFound from "./NoDataFound";

const SimpleTableComponent = ({
  data,
  columns,
  totalPages,
  projectDetail,
  page,
  setPage,
  onClick,
  keyToSendOnClick,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div className="table-responsive">
          <table className="table table-ui-custom">
            <thead>
              <tr>
                <>
                  {columns?.map(({ label }) => (
                    <th className="text-capitalize">{t(label)}</th>
                  ))}
                </>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data?.map((curData, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="application-row"
                    onClick={() =>
                      onClick && onClick(curData[keyToSendOnClick])
                    }
                  >
                    {columns?.map(({ key, isDate, format, isHours }, index) => (
                      <td className="font-14 align-middle" key={index}>
                        {isDate &&
                          getDateInRequiredFormat(curData?.[key], format)}
                        {!isDate && curData?.[key]}
                        {isHours && " hrs"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <NoDataFound />
              )}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 1 ? (
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
          <p className="showing-result">
            {t("showing")} {data?.length} {t("results")}
          </p>
          <RexettPagination number={totalPages} page={page} setPage={setPage} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SimpleTableComponent;
// expandedRow?.index === rowIdx && (
//   <table className="table time-table table-bordered table-ui-custom">
//     <thead>
//       {weeklyTimeReports(expandedRow?.item, "weekly").length > 0 &&
//         weeklyTimeReports(expandedRow?.item, "weekly")?.map((item, index) => {
//           return (
//             <>
//               <th className="time-table-head">
//                 <span>{item} </span>
//               </th>
//             </>
//           );
//         })}
//       <th className="time-table-head">
//         <span>Total Hours</span>
//       </th>
//     </thead>
//     <tr
//       className={`collapsible-row ${
//         expandedRow?.index === rowIdx ? "open" : ""
//       }`}
//     >
//       {expandedRow?.item && Object.keys(expandedRow?.item)?.length > 0 ? (
//         <>
//           {expandedRow?.item?.timeReports?.map((reprt, inx) => {
//             if (reprt.report_date) {
//               return (
//                 <>
//                   <td
//                     className={`time-table-data white-nowrap ${
//                       reprt.is_off_day ? "offday-data" : "workday-data"
//                     }`}
//                   >
//                     <div>
//                       <span
//                         className={`${
//                           reprt.is_off_day ? "" : "timing-text d-inline-block"
//                         }`}
//                       >
//                         {reprt.start_time && reprt?.end_time
//                           ? `${moment(reprt?.start_time, "HH:mm").format(
//                               "h:mm A"
//                             )} - ${moment(reprt?.end_time, "HH:mm").format(
//                               "h:mm A"
//                             )} `
//                           : reprt?.is_holiday
//                           ? "Holiday"
//                           : reprt?.is_off_day
//                           ? "Leave"
//                           : reprt?.is_public_holiday
//                           ? reprt?.holiday_name
//                           : ""}
//                       </span>
//                       {reprt?.memo && (
//                         <p className="memo-text">
//                           {reprt?.memo ? reprt?.memo : ""}
//                         </p>
//                       )}
//                     </div>
//                   </td>
//                 </>
//               );
//             } else if (reprt?.week) {
//               return (
//                 <>
//                   <td
//                     className={`time-table-data white-nowrap ${
//                       reprt.is_off_week ? "offday-data" : "workday-data"
//                     }`}
//                   >
//                     <div>
//                       {reprt?.duration
//                         ? `${reprt?.duration.toFixed("2")} hr`
//                         : "Holiday"}
//                     </div>
//                   </td>
//                   {/* <td className={`time-table-data ${reprt.is_off_month ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
//                 </>
//               );
//             } else {
//               return (
//                 <>
//                   <td
//                     className={`time-table-data white-nowrap ${
//                       reprt.is_off_month ? "offday-data" : "workday-data"
//                     }`}
//                   >
//                     <div>
//                       {reprt?.duration
//                         ? `${reprt?.duration.toFixed("2")} hr`
//                         : "Holiday"}
//                     </div>
//                   </td>
//                   {/* <td className={`time-table-data ${reprt.is_off_year ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
//                 </>
//               );
//             }
//           })}
//           <td className="time-table-data">
//             {expandedRow?.item?.totalDuration > 0
//               ? expandedRow?.item?.totalDuration.toFixed("2")
//               : expandedRow?.item?.totalDuration}
//             hr
//           </td>
//         </>
//       ) : (
//         "No timesheet found"
//       )}
//     </tr>
//   </table>
// );
