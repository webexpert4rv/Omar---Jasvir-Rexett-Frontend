import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
  import { useDispatch, useSelector } from "react-redux";
import {MONTH_NAME,SELECT_YEAR} from "../../clients/TimeReporiting/constant";
import { TiEdit } from "react-icons/ti";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";


const ListOfHolidays = ({holidayList,handleShowEvent,handleDelete,handleAproveDisapprove}) => {
  const [data, setData] = useState();
  const [yearData, setYearData] = useState();
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2024");
  let role = localStorage.getItem("role");


  useEffect(() => {
    const yearDetails = holidayList?.filter((values) => moment(values?.date).year() == "2024");
    setYearData(yearDetails);
    setSelectedYear("2024")
    setData(yearDetails);
  }, [holidayList]);

  const handleYearFilter = (year) => {
    setSelectedYear(year);
    setSelectedMonth("All")
    const yearDetails = holidayList?.filter((values) => moment(values?.date).year() == year);
    setYearData(yearDetails);
    setData(yearDetails);
  };

  const handleMonthFilter = (month) => {
    setSelectedMonth(month);
    if(month !=="All"){
    const selectedMonthHolidays = yearData?.filter((values) => moment(values?.date).month()+1 == moment(month, "MMMM").format("M"));
    setData(selectedMonthHolidays)
    }else{
    setData(yearData)
    }
  }
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
              value ={selectedYear}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data?.map((holiday, index) => (
                  <tr key={index}>
                    <td className="font-14 align-middle">
                      <strong>{holiday?.date}</strong>
                    </td>
                    <td className="font-14 align-middle">
                      {holiday?.name}
                      <span className="associate-text">
                        <span className="associate">Created</span>
                      </span>
                    </td>
                    {/* <td className="font-14 align-middle">
                      {holiday.type}
                    </td> */}
                    <td>
                      {role === "client" ? (
                        holiday?.added_by === "client" ? (
                          <>
                            <div className="d-flex align-items-center gap-2"></div>
                            <div className="d-flex gap-2">
                              <Button
                                variant="transparent"
                                className="px-3 arrow-btn info-arrow font-16 text-decoration-none"
                                onClick={() =>
                                  handleShowEvent(holiday?.id, "edit")
                                }
                              >
                                <TiEdit />
                              </Button>
                              <Button
                                variant="transparent"
                                className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                onClick={() => handleDelete(holiday?.id)}
                              >
                                <IoCloseOutline />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div>
                              <div>
                                <h4 className="event-name mb-0">
                                  {holiday?.name}
                                </h4>
                              </div>
                              <div className="d-flex gap-2">
                                <Button
                                  variant="transparent"
                                  className="px-3 arrow-btn primary-arrow font-16 text-decoration-none"
                                  onClick={(e) =>
                                    handleAproveDisapprove(
                                      holiday?.id,
                                      "approve"
                                    )
                                  }
                                >
                                  <IoCheckmark />
                                </Button>
                                <Button
                                  variant="transparent"
                                  className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                  onClick={(e) =>
                                    handleAproveDisapprove(
                                      holiday?.id,
                                      "disapprove"
                                    )
                                  }
                                >
                                  <IoCloseOutline />
                                </Button>
                              </div>
                            </div>
                          </>
                        )
                      ) : (
                        <div>
                          <h4 className="event-name mb-0">{holiday?.name}</h4>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
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
