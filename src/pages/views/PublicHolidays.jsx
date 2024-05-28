import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import Calendar from "react-calendar";
import NewEvent from "./Modals/NewEvent";
import { useDispatch, useSelector } from "react-redux";
import {
  getApproveDisapprove,
  getLeaveList,
} from "../../redux/slices/clientDataSlice";

const PublicHoliday = () => {
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  const [showEvent, setShowEvent] = useState(false);
  const handleShowEvent = () => {
    setShowEvent(!showEvent);
  };
  const { leaveList } = useSelector((state) => state.clientData);
  console.log(leaveList, "leaveList");
  const handleCloseEvent = () => {
    setShowEvent(false);
  };
  useEffect(() => {
    dispatch(getLeaveList());
  }, []);

  const handleAproveDisapprove = async (id, status) => {
    console.log(status, "status");
    console.log(id, "id");
    const payload = {
      action: status,
    };
    await dispatch(getApproveDisapprove(payload, id));
    dispatch(getLeaveList());
  };

  const markedDates = [
    new Date(2024, 4, 1),
    new Date(2024, 4, 8),
    new Date(2024, 4, 11),
    new Date(2024, 4, 14),
    new Date(2024, 4, 23),
    new Date(2024, 4, 31),
  ];

  // Function to add custom content to tile
  const tileContent = ({ date, view }) => {
    if (
      view === "month" &&
      markedDates.find((d) => d.toDateString() === date.toDateString())
    ) {
      return <div className="dot"></div>;
    }
    return null;
  };
  return (
    <>
      <section className="">
        <div className="calendar-container card-box">
          <div className="mb-3">
            <Button
              className="main-btn px-3 py-2 font-14"
              onClick={handleShowEvent}
            >
              + Create New Holiday
            </Button>
          </div>
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
                  <h3 className="mb-0">Holidays</h3>
                  <div className="d-flex align-items-center gap-1">
                    <Form.Select className="common-field w-auto font-14 py-2">
                      <option>This Month</option>
                      <option>This Year</option>
                      <option>Created</option>
                    </Form.Select>
                    <Form.Select className="common-field w-auto font-14 py-2">
                      <option>All</option>
                      <option>January</option>
                      <option>February</option>
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
                </div>
                <div className="event-container">
                  {leaveList?.map((item, index) => (
                    <div className="event-wrapper">
                      <div className="event-info">
                        <div className="holiday-date">
                          <span className="eventdate-text">
                            {item?.date}
                            <br />
                          </span>
                        </div>
                        <div>
                          <h4 className="event-name mb-0">{item?.name}</h4>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="transparent"
                          className="px-3 arrow-btn primary-arrow font-16 text-decoration-none"
                          onClick={(e) =>
                            handleAproveDisapprove(item?.id, "approve")
                          }
                        >
                          <IoCheckmark />
                        </Button>
                        <Button
                          variant="transparent"
                          className="px-3 arrow-btn danger-arrow font-16 text-decoration-none"
                          onClick={(e) =>
                            handleAproveDisapprove(item?.id, "disapprove")
                          }
                        >
                          <IoCloseOutline />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="event-wrapper">
                    <div className="event-info">
                      <div className="holiday-date">
                        <span className="eventdate-text">
                          31 MAY
                          <br />
                          <span className="year-text">2024</span>
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <h4 className="event-name mb-0">Urgent Work</h4>
                        <span className="associate-text">
                          <span className="associate">Created</span>
                        </span>
                      </div>
                    </div>
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
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <NewEvent show={showEvent} handleClose={handleCloseEvent} />
    </>
  );
};
export default PublicHoliday;
