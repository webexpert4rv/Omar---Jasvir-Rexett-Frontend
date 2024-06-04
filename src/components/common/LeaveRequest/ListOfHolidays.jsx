import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_NAME, MONTH_NAME } from "../../clients/TimeReporiting/constant";
import { TiEdit } from "react-icons/ti";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import ToolTip from "../Tooltip/ToolTip";

const holidays = [
  { date: '1 Jan', day: 'Monday', name: "New Year's Day", type: 'Restricted Holiday' },
  { date: '13 Jan', day: 'Saturday', name: 'Lohri', type: 'Restricted Holiday' },
  { date: '14 Jan', day: 'Sunday', name: 'Makar Sankranti', type: 'Restricted Holiday' },
  { date: '15 Jan', day: 'Monday', name: 'Pongal', type: 'Restricted Holiday' },
  { date: '17 Jan', day: 'Wednesday', name: 'Guru Govind Singh Jayanti', type: 'Restricted Holiday' },
  { date: '26 Jan', day: 'Friday', name: 'Republic Day', type: 'Gazetted Holiday' },
  { date: '25 Mar', day: 'Friday', name: 'Holiday', type: 'Gazetted Holiday' },
  { date: '28 Mar', day: 'Monday', name: 'Urgent Work', type: 'Created by client' },
  { date: '28 Jun', day: 'Monday', name: 'Urgent Work', type: 'Created by client' },
  { date: '28 Aug', day: 'Monday', name: 'Urgent Work', type: 'Created by client' },
  { date: '28 Sep', day: 'Monday', name: 'Urgent Work', type: 'Created by client' },
];

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

  const [selectedMonth, setSelectedMonth] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('Select Year');

  const handleMonthFilter = (month) => {
    setSelectedMonth(month);
  };

  const filteredHolidays = holidays.filter(holiday => {
    const holidayMonth = holiday.date.split(' ')[1];
    const matchesMonth = selectedMonth === 'All' || holidayMonth === selectedMonth;
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'Select Year' || holiday.date.endsWith(selectedYear);
    return matchesMonth && matchesSearch && matchesYear;
  });

  return (
    <section className="">
      <div className="card-box border shadow-none">
        <div className="d-flex justify-content-between align-items-center">
          <div className="skill-filters">
            {['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <span
                key={month}
                className={selectedMonth === month ? 'active' : ''}
                onClick={() => handleMonthFilter(month)}
              >
                {month}
              </span>
            ))}
          </div>

          <Form className="d-flex gap-2">
            <Form.Select
              className="common-field font-14 w-auto"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option>Select Year</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
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
              {filteredHolidays.length > 0 ? (
                filteredHolidays.map((holiday, index) => (
                  <tr key={index}>
                    <td className="font-14 align-middle">
                      <strong>{holiday.date}</strong> {holiday.day}
                    </td>
                    <td className="font-14 align-middle">
                      {holiday.name}
                      {/* <span className="associate-text">
                        <span className="associate">Created</span>
                      </span> */}
                    </td>
                    {/* <td className="font-14 align-middle">
                      {holiday.type}
                    </td> */}
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="transparent"
                          className="px-3 arrow-btn info-arrow font-16 text-decoration-none"
                        >
                          <TiEdit />
                        </Button>
                        <Button
                          variant="transparent"
                          className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                        >
                          <IoCloseOutline />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="font-14">
                    <p className="text-danger mb-0">No holidays in this month</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="calendar-container card-box d-none">
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
