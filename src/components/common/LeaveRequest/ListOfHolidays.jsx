import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MONTH_NAME, SELECT_YEAR } from "../../clients/TimeReporiting/constant";
import { TiEdit } from "react-icons/ti";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import ToolTip from "../Tooltip/ToolTip";
import RexettButton from "../../atomic/RexettButton";
import RexettSpinner from "../../atomic/RexettSpinner";

const ListOfHolidays = ({
  holidayList,
  handleShowEvent,
  handleDelete,
  handleAproveDisapprove,
  approvedLoader,
  selectedIndex,
  selectedRejectIndex
}) => {
  const [data, setData] = useState();
  const [yearData, setYearData] = useState();
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2024");
  let role = localStorage.getItem("role");

  useEffect(() => {
    const yearDetails = holidayList?.filter(
      (values) => moment(values?.date).year() == "2024"
    );
    setYearData(yearDetails);
    setSelectedYear("2024");
    setData(yearDetails);
  }, [holidayList]);

  const FilteredDeveloperData = data?.filter(
    (values) => values?.is_approved_by_client == true
  );

  const handleYearFilter = (year) => {
    setSelectedYear(year);
    setSelectedMonth("All");
    const yearDetails = holidayList?.filter(
      (values) => moment(values?.date).year() == year
    );
    setYearData(yearDetails);
    setData(yearDetails);
  };

  const handleMonthFilter = (month) => {
    setSelectedMonth(month);
    if (month !== "All") {
      const selectedMonthHolidays = yearData?.filter(
        (values) =>
          moment(values?.date).month() + 1 == moment(month, "MMMM").format("M")
      );
      setData(selectedMonthHolidays);
    } else {
      setData(yearData);
    }
  };
  return (
    <section className="">
      <div className="card-box border shadow-none">
        {role === "client" ? (
          <div className="mb-0">
            <Button className="main-btn font-14" onClick={handleShowEvent}>
              + Create New Holiday
            </Button>
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-between align-items-center">
          <div className="skill-filters">
            {MONTH_NAME.map((month) => (
              <span
                key={month}
                className={selectedMonth === month ? "active" : ""}
                onClick={() => handleMonthFilter(month)}
              >
                {month}
              </span>
            ))}
          </div>

          <Form className="d-flex gap-2">
            <Form.Select
              className="common-field font-14 w-auto"
              onChange={(e) => handleYearFilter(e.target.value)}
              value={selectedYear}
            >
              {/* <option>Select Year</option> */}
              {SELECT_YEAR?.map((item, idx) => (
                <option key={idx}>{item}</option>
              ))}
            </Form.Select>
          </Form>
        </div>
        <div className="table-responsive">
          <table className="table table-ui-custom mb-0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                {/* <th>Type</th> */}
                {role === "client" ? <th>Action</th> : ""}
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                role === "developer"  ? (
                  FilteredDeveloperData?.map((field, idx) => (
                    <>
                      <tr key={idx}>
                        <td className="font-14 align-middle">
                          <strong>{field?.date}</strong>
                        </td>
                        <td className="font-14 align-middle">
                          {field?.name}
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  data?.map((holiday, index) => (
                    <tr key={index}>
                      <td className="font-14 align-middle">
                        <strong>{holiday?.date}</strong>
                      </td>
                      <td className="font-14 align-middle">
                        {holiday?.name}
                        {role === "client" && holiday?.added_by === "client" ? (
                          <span className="associate-text">
                            <span className="associate">Created</span>
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      {/* <td className="font-14 align-middle">
                      {holiday.type}
                    </td> */}
                      <td>
                        {role === "client" ? (
                          holiday?.added_by === "system" ? (
                            holiday?.is_approved_by_client === true ? (
                              <div>
                                <h6>Approved</h6>
                              </div>
                            ) : holiday?.is_approved_by_client === false  ? (
                              <div>
                              <h6>Disapproved</h6>
                            </div>
                            ) :(
                              <div>
                                <div className="d-flex gap-2">
                                  <ToolTip text="Approve">
                                    <RexettButton
                                      variant="transparent"
                                      className="px-3 arrow-btn primary-arrow font-16 text-decoration-none"
                                      isLoading={selectedIndex == index    ?  approvedLoader : false  }   
                                      icon = {selectedIndex == index ? approvedLoader : <IoCheckmark />}
                                      onClick={() =>
                                        handleAproveDisapprove(
                                          holiday?.id,
                                          "approve",
                                          index
                                        )
                                      }
                                    >
                                      
                                    </RexettButton>
                                  </ToolTip>
                                  <ToolTip text="Disapprove">
                                    <RexettButton
                                      variant="transparent"
                                      className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                     isLoading={selectedRejectIndex  == index   ?  approvedLoader : false }
                                      // disabled={selectedRejectIndex == index  ? approvedLoader : <IoCloseOutline /> }
                                      icon = {selectedRejectIndex == index ? approvedLoader : <IoCloseOutline />}
                                      onClick={() =>
                                        handleAproveDisapprove(
                                          holiday?.id,
                                          "disapprove",
                                          index
                                        )
                                      } 
                                    >
                                      
                                      
                                    </RexettButton>
                                  </ToolTip>
                                </div>
                              </div>
                            )
                          ) : (
                            <div className="d-flex gap-2">
                              <ToolTip text="Edit">
                                <Button
                                  variant="transparent"
                                  className="px-3 arrow-btn info-arrow font-16 text-decoration-none"
                                  onClick={() =>
                                    handleShowEvent(holiday?.id, "edit")
                                  }
                                >
                                  <TiEdit />
                                </Button>
                              </ToolTip>
                              <ToolTip text="Delete">
                                <Button
                                  variant="transparent"
                                  className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                  onClick={() => handleDelete(holiday?.id)}
                                >
                                  <IoCloseOutline />
                                </Button>
                              </ToolTip>
                            </div>
                          )
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="3" className="font-14">
                    <p className="text-danger mb-0">
                      No holidays in this month
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ListOfHolidays;
