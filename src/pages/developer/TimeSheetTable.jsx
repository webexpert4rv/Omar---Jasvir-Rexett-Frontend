import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import RexettPagination from "../../components/atomic/RexettPagination";
import NoDataFound from "../../components/atomic/NoDataFound";
import { weeklyTimeReports } from "../../components/clients/TimeReporiting/constant";

const TimeSheetTable = ({
  timeReports,
  totalPages,
  projectDetail,
  page,
  setPage,
  filterView,
}) => {
  const { t } = useTranslation();
  const getViewOption = (projectDetail) => {
    const object = projectDetail?.timeReports?.[0];
    const filterView = object?.week
      ? "monthly"
      : object?.month
      ? "yearly"
      : "weekly";

    return filterView;
  };
  return (
    <>
      <div>
        <div className="table-responsive">
          <table className="table time-table table-bordered table-ui-custom">
            <thead>
              <tr>
                <>
                  <th className="time-table-head">Client Name</th>
                  {weeklyTimeReports(
                    projectDetail,
                    getViewOption(projectDetail)
                  ).length > 0 &&
                    weeklyTimeReports(
                      projectDetail,
                      getViewOption(projectDetail)
                    )?.map((item, index) => {
                      return (
                        <>
                          <th className="time-table-head">
                            <span>{item} </span>
                          </th>
                        </>
                      );
                    })}
                  <th className="time-table-head">
                    <span>Total Hours</span>
                  </th>
                  {/* <th className="time-table-head">
                    <span>Invoice Month</span>
                  </th>
                  <th className="time-table-head">
                    <span>Invoice Status</span>
                  </th> */}
                </>
              </tr>
            </thead>
            <tbody>
              <>
                {timeReports?.length > 0 ? (
                  <>
                    <td className="time-table-data ">
                      {projectDetail?.contractDetails?.client_name}
                    </td>
                    {timeReports?.map((reprt, inx) => {
                      if (reprt.report_date) {
                        return (
                          <>
                            <td
                              className={`time-table-data white-nowrap ${
                                reprt.is_off_day
                                  ? "offday-data"
                                  : "workday-data"
                              }`}
                            >
                              <div>
                                <span
                                  className={`${
                                    reprt.is_off_day
                                      ? ""
                                      : "timing-text d-inline-block"
                                  }`}
                                >
                                  {reprt.start_time && reprt?.end_time
                                    ? `${moment(
                                        reprt?.start_time,
                                        "HH:mm"
                                      ).format("h:mm A")} - ${moment(
                                        reprt?.end_time,
                                        "HH:mm"
                                      ).format("h:mm A")} `
                                    : reprt?.is_holiday
                                    ? "Holiday"
                                    : reprt?.is_off_day
                                    ? "Leave"
                                    : reprt?.is_public_holiday
                                    ? reprt?.holiday_name
                                    : ""}
                                </span>
                                {reprt?.memo && (
                                  <p className="memo-text">
                                    {reprt?.memo ? reprt?.memo : ""}
                                  </p>
                                )}
                              </div>
                            </td>
                          </>
                        );
                      } else if (reprt?.week) {
                        return (
                          <>
                            <td
                              className={`time-table-data white-nowrap ${
                                reprt.is_off_week
                                  ? "offday-data"
                                  : "workday-data"
                              }`}
                            >
                              <div>
                                {reprt?.duration
                                  ? `${reprt?.duration.toFixed("2")} hr`
                                  : "Holiday"}
                              </div>
                            </td>
                            {/* <td className={`time-table-data ${reprt.is_off_month ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                          </>
                        );
                      } else {
                        return (
                          <>
                            <td
                              className={`time-table-data white-nowrap ${
                                reprt.is_off_month
                                  ? "offday-data"
                                  : "workday-data"
                              }`}
                            >
                              <div>
                                {reprt?.duration
                                  ? `${reprt?.duration.toFixed("2")} hr`
                                  : "Holiday"}
                              </div>
                            </td>
                            {/* <td className={`time-table-data ${reprt.is_off_year ? "offday-data" : "workday-data"}`} >{reprt?.duration ? reprt?.duration : "-"}</td> */}
                          </>
                        );
                      }
                    })}
                    <td className="time-table-data">
                      {`${
                        projectDetail?.totalDuration > 0
                          ? projectDetail?.totalDuration.toFixed("2")
                          : projectDetail?.totalDuration
                      } hrs`}
                    </td>
                    {/* <td className="time-table-data">{}</td> */}
                    {/* <td className="time-table-data">
                      <span
                        className={`status-${
                          projectDetail?.contractDetails?.[key] === true
                            ? "finished"
                            : projectDetail?.contractDetails?.[key] === false
                            ? "progress"
                            : ""
                        } white-nowrap`}
                      >
                        {projectDetail?.contractDetails?.[key] === true
                          ? "Completed"
                          : projectDetail?.contractDetails?.[key] === false
                          ? "In progress"
                          : ""}
                      </span>
                    </td> */}
                  </>
                ) : (
                  <NoDataFound />
                )}
              </>
            </tbody>
          </table>
        </div>
      </div>
      {/* {totalPages > 1 ? (
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
          <p className="showing-result">
            {t("showing")} {data?.length} {t("results")}
          </p>
          <RexettPagination number={totalPages} page={page} setPage={setPage} />
        </div>
      ) : (
        ""
      )} */}
    </>
  );
};

export default TimeSheetTable;
