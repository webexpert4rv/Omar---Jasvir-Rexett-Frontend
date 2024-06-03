import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_NAME, MONTH_NAME } from "../../clients/TimeReporiting/constant";
import { TiEdit } from "react-icons/ti";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import ToolTip from "../Tooltip/ToolTip";

const ListOfHolidays = ({
  onChange,
  value,
  tileContent,
  holidayList,
  handleShowEvent,
  handleDelete,
  handleAproveDisapprove,
}) => {
  let role = localStorage.getItem("role");
  const [holidayPeriod, setHolidayPeriod] = useState();
  const { leaveList } = useSelector((state) => state.clientData);
  const [data, setData] = useState(holidayList);

  useEffect(() => {
    setData(holidayList);
  }, [holidayList]);

  const handleSelect = (item) => {
    if (item === "This Month") {
      const currentMonth = moment().month() + 1;
      const holidayData = holidayList?.filter(
        (holiday) => moment(holiday?.date).month() + 1 == currentMonth
      );
      setData(holidayData);
    } else if (item !== "This Year") {
      if (item == "All") {
        const holidayData = holidayList?.filter(
          (value) => value?.added_by === "client"
        );
        setData(holidayData);
      } else {
        let monthNumber = moment(item, "MMMM").format("M");
        const holidayData = holidayList?.filter(
          (holiday) => moment(holiday?.date).month() + 1 == monthNumber
        );
        const x = holidayData?.filter((value) => value?.added_by === "client");
        if (x) {
          setData(x);
        } else {
          let monthNumber = moment(item, "MMMM").format("M");
          const holidayData = holidayList?.filter(
            (holiday) => moment(holiday?.date).month() + 1 == monthNumber
          );
          setData(holidayData);
        }
      }
    }
    setHolidayPeriod(item);
  };

  return (
    <section className="">
      <div className="calendar-container card-box">
        {role === "client" ? (
          <div className="mb-3">
            <Button
              className="main-btn px-3 py-2 font-14"
              onClick={handleShowEvent}
            >
              + Create New Holiday
            </Button>
          </div>
        ) : (
          ""
        )}
        <Row>
          <Col md={7}>
            <Calendar
              onChange={onChange}
              value={value}
              tileContent={tileContent}
            />
          </Col>
          <Col md={5}>
            <div className="holiday-listing px-0 pt-4">
              <div className="d-flex justify-content-between align-items-center px-3 mb-3">
                <h3 className="mb-0">List of holidays</h3>
                <Form.Select
                  className="common-field w-auto font-14 py-2"
                  onChange={(e) => handleSelect(e.target.value)}
                >
                  {FILTER_NAME?.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </Form.Select>
                {holidayPeriod === "This Month" ? (
                  ""
                ) : (
                  <Form.Select
                    className="common-field w-auto font-14 py-2"
                    onChange={(e) => handleSelect(e.target.value)}
                  >
                    {MONTH_NAME?.map((month, idx) => (
                      <option key={month}>{month}</option>
                    ))}
                  </Form.Select>
                )}
              </div>
              <div className="event-container">
                {data?.map((item, index) => {
                  return (
                    <>
                      <div className="event-wrapper" Key={index}>
                        <div className="event-info">
                          <div className="holiday-date">
                            <span className="eventdate-text">
                              {moment(item?.date).format("MMMM Do")}
                              <br />
                              <span className="year-text">
                                {moment(item?.date).format("YYYY")}
                              </span>
                            </span>
                          </div>
                          {role === "client" ? (
                            item?.added_by === "client" ? (
                              <>
                                <div className="d-flex align-items-center gap-2">
                                  <h4 className="event-name mb-0">
                                    {item?.name}
                                  </h4>
                                  <span className="associate-text">
                                    <span className="associate">Created</span>
                                  </span>
                                </div>
                                <div className="d-flex gap-2">
                                  <Button
                                    variant="transparent"
                                    className="px-3 arrow-btn info-arrow font-16 text-decoration-none"
                                    onClick={() =>
                                      handleShowEvent(item?.id, "edit")
                                    }
                                  >
                                    <TiEdit />
                                  </Button>
                                  <Button
                                    variant="transparent"
                                    className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                                    onClick={() => handleDelete(item?.id)}
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
                                      {item?.name}
                                    </h4>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <Button
                                      variant="transparent"
                                      className="px-3 arrow-btn primary-arrow font-16 text-decoration-none"
                                      onClick={(e) =>
                                        handleAproveDisapprove(
                                          item?.id,
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
                                          item?.id,
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
                              <h4 className="event-name mb-0">{item?.name}</h4>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ListOfHolidays;
