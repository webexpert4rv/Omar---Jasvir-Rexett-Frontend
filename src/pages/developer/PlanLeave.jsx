import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import companyLogo from "../../assets/img/amazon.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Calendar from 'react-calendar';
import {
  applyLeave,
  getAllContracts,
  getLeaveHistory,
  getCancelLeave,
  getUpdateLeave,
} from "../../redux/slices/developerDataSlice";
import { useTranslation } from "react-i18next";
import moment from "moment";
import RexettButton from "../../components/atomic/RexettButton";
import { generateLeave } from "../../components/clients/TimeReporiting/constant";
import { LEAVE_TYPE } from "../../components/clients/TimeReporiting/constant";
import RejectModal from "../views/Modals/EndJob";
import ToolTip from "../../components/common/Tooltip/ToolTip";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";

const LeavePlan = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const { screenLoader, leaveDetails, allContracts } = useSelector(
    (state) => state.developerData
  );

  console.log(leaveDetails, "leaveDetails");
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState("first");
  const [isEdit, setIsEdit] = useState({
    status: false,
    leaveId: "",
  });
  const today = new Date();
  const start_date = moment(selectionRange?.startDate).format("MM-DD-YYYY");
  const end_date = moment(selectionRange?.endDate).format("MM-DD-YYYY");
  const user_id = localStorage.getItem("userId");

  useEffect(() => {
    let data;
    if (currentTab === "first") {
      data = {
        approval_status: "Under Approval",
      };
    }

    dispatch(getLeaveHistory(user_id, data));
    dispatch(getAllContracts());
  }, [currentTab]);

  const handleSelect = (selectedTab) => {
    setCurrentTab(selectedTab);
  };
  const handleRange = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleEditLeave = (id) => {
    const selectedLeave = leaveDetails.find((item) => item.id == id);
    if (selectedLeave) {
      setSelectionRange({
        startDate: new Date(selectedLeave.start_date),
        endDate: new Date(selectedLeave.end_date),
        key: "selection",
      });

      setIsEdit({ status: true, leaveId: id });
      setValue("client_name", selectedLeave?.contract_id);
      setValue("leave_type", selectedLeave?.type);
      setValue("reason", selectedLeave?.reason_for_leave);
    }
  };
  const handleCancelLeave = async (id) => {
    let data = {
      withdrawal_reason: "reason",
    };
    await dispatch(getCancelLeave(id, data));
    let payload = {
      approval_status: "Under Approval",
    };
    dispatch(getLeaveHistory(user_id, payload));
  };

  const onSubmit = async (values) => {
    let data = {
      contract_id: +values.client_name,
      start_date: start_date,
      end_date: end_date,
      start_time: null,
      end_time: null,
      type: values.leave_type,
      reason_for_leave: values.reason,
    };
    if (isEdit?.status === true) {
      await dispatch(getUpdateLeave(isEdit?.leaveId, data));
    } else {
      await dispatch(applyLeave(data));
    }
    let payload = {
      approval_status: "Under Approval",
    };
    dispatch(getLeaveHistory(user_id, payload));
    setIsEdit({ status: false, leaveId: "" });
    reset();
  };

  const [value, onChange] = useState(new Date());
  // Define the dates you want to mark
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
    if (view === 'month' && markedDates.find(d => d.toDateString() === date.toDateString())) {
      return <div className="dot"></div>;
    }
    return null;
  };

  return (
    <>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <Tab.Container defaultActiveKey="plan-leave">
          <Nav variant="pills" className="mb-4 application-pills">
            <Nav.Item className="application-item">
              <Nav.Link className="application-link" eventKey="plan-leave">
                Plan Leave
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="application-item">
              <Nav.Link className="application-link" eventKey="public-holiday">
                Public Holiday
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="plan-leave">
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey="first"
                onSelect={handleSelect}
              >
                <Nav variant="pills" className="mb-4 application-pills">
                  <Nav.Item className="application-item">
                    <Nav.Link className="application-link" eventKey="first">
                      Apply Leave
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="application-item">
                    <Nav.Link className="application-link" eventKey="second">
                      Leave History
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="card-box mb-4">
                      <h3 className="section-head border-0 mb-2">Applied Leaves</h3>
                      {/* <p className="text-muted font-14 mb-0">No Leave Applied</p> */}
                      <Row>
                        {leaveDetails.length > 0 ? (
                          leaveDetails?.map((field, idx) => (
                            <Col xxl={3} xl={6} className="mb-xxl-0 mb-3">
                              <div className="leave-wrapper-box">
                                <div>
                                  <h4 className="project-heading">{ }</h4>
                                  <h4 className="leave-type-heading">
                                    {generateLeave(field?.type)}
                                  </h4>
                                  <div>
                                    <p className="leave-date">
                                      {" "}
                                      {moment(field?.start_date).format(
                                        "MM-DD-YYYY"
                                      )}{" "}
                                      to{" "}
                                      {moment(field?.end_date).format("MM-DD-YYYY")}
                                    </p>
                                  </div>
                                  <p className="status-finished mb-0">
                                    {field?.approval_status}
                                  </p>
                                </div>
                                <div className="d-flex gap-3">
                                  <ToolTip text="Cancel Leave">
                                    <Button
                                      className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                                      onClick={() => handleCancelLeave(field?.id)}
                                    >
                                      <IoClose />
                                    </Button>
                                  </ToolTip>
                                  <ToolTip text="Edit Leave">
                                    <Button
                                      className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none"
                                      onClick={() => handleEditLeave(field?.id)}
                                    >
                                      <MdModeEditOutline />
                                    </Button>
                                  </ToolTip>
                                </div>
                              </div>
                            </Col>
                          ))
                        ) : (
                          <NoDataFound />
                        )}
                      </Row>
                    </div>
                    <Row className="gx-4">
                      <Col lg={7}>
                        <div className="leave-calendar h-100">
                          <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleRange}
                            minDate={today}
                          />
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="plan-leave-wrapper">
                          <h3 className="section-head border-0 mb-3">Apply Leave</h3>
                          <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="mb-4">
                              <Form.Label className="mb-2 font-14">
                                Select Client
                              </Form.Label>
                              <div className="d-flex gap-3">
                                <div>
                                  <Form.Select
                                    className="common-field font-14 mb-4"
                                    {...register("client_name", {
                                      required: t("leaveRequired"),
                                    })}
                                  >
                                    <option value="" selected>
                                      Select client
                                    </option>
                                    {allContracts.map((item, idx) => (
                                      <option key={idx} value={item.id}>
                                        {item.client?.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </div>
                              </div>
                            </div>
                            <div className="mb-4">
                              <Form.Label className="mb-2 font-14">
                                Leave Type
                              </Form.Label>
                              <div className="d-flex gap-3">
                                <div>
                                  <Form.Select
                                    className="common-field  font-10 mb-4"
                                    {...register("leave_type", {
                                      required: t("leaveRequired"),
                                    })}
                                  >
                                    <option value="" selected>
                                      Select leave type
                                    </option>
                                    {LEAVE_TYPE.map((item, idx) => (
                                      <option key={idx} value={item?.value}>
                                        {item?.key}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </div>
                              </div>
                            </div>
                            <div className="mb-4">
                              <Form.Label className="mb-2 font-14">Reason</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows="3"
                                className="common-field font-14"
                                placeholder="Enter Reason"
                                {...register("reason", {
                                  required: {
                                    value: true,
                                    message: `${t("reasonRequired")}`,
                                  },
                                })}
                              />
                            </div>
                            <div className="text-center">
                              <RexettButton
                                type="submit"
                                text={t("Submit")}
                                className="main-btn font-14 px-4 py-2"
                                variant="transparent"
                              // isLoading={smallLoader}
                              />
                            </div>
                          </form>
                        </div>
                      </Col>
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div className="table-responsive">
                      <table className="table time-table table-bordered table-ui-custom">
                        <thead>
                          <th className="time-table-head text-start">Leave Type</th>
                          <th className="time-table-head text-start">Leave Date</th>
                          <th className="time-table-head text-start">Reason</th>
                          <th className="time-table-head text-start">Project</th>
                          <th className="time-table-head text-start">Client Name</th>
                          <th className="time-table-head text-start">Leave Status</th>
                        </thead>
                        <tbody>
                          {leaveDetails?.map((item, idx) => (
                            <>
                              <tr>
                                <td className="time-table-data text-start">
                                  <h4 className="leave-type-heading mb-0 white-nowrap">
                                    {generateLeave(item?.type)}
                                  </h4>
                                </td>
                                <td className="time-table-data text-start">
                                  <p className="leave-date white-nowrap">
                                    {moment(item.start_date).format("MM-DD-YYYY")} to{" "}
                                    {moment(item.end_date).format("MM-DD-YYYY")}
                                  </p>
                                </td>
                                <td className="time-table-data text-start reason-data">
                                  <p className="font-14 mb-0">
                                    {item.reason_for_leave}
                                  </p>
                                </td>
                                <td className="time-table-data text-start white-nowrap">
                                  AI Bot Project
                                </td>
                                <td className="time-table-data text-start">
                                  <div className="d-flex align-items-center gap-2">
                                    {/* <div className="user-imgbx application-imgbx mx-0 mb-0">
                                        <img src={companyLogo} className="user-img" />
                                      </div> */}
                                    {item?.contract?.client?.name}
                                  </div>
                                </td>
                                <td className="time-table-data text-start">
                                  <span className="status-progress">
                                    {item.approval_status}
                                  </span>
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>

            </Tab.Pane>
            <Tab.Pane eventKey="public-holiday">
              <section className="">
                <div className="calendar-container card-box">
                  <Row>
                    <Col md={7}>
                      <Calendar onChange={onChange} value={value} tileContent={tileContent} />
                    </Col>
                    <Col md={5}>
                      <div className="holiday-listing px-0 pt-4">
                        <div className="d-flex justify-content-between align-items-center px-3 mb-3">
                          <h3 className="mb-0">List of holidays</h3>
                          <Form.Select className="common-field w-auto font-14 py-2">
                            <option>This Month</option>
                            <option>This Year</option>
                            <option>Created</option>
                          </Form.Select>
                        </div>
                        <div className="event-container">
                          <div className="event-wrapper">
                            <div className="event-info">
                              <div className="holiday-date">
                                <span className="eventdate-text">01 MAY<br /><span className="year-text">2024</span></span>
                              </div>
                              <div>
                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                              </div>
                            </div>
                          </div>
                          <div className="event-wrapper">
                            <div className="event-info">
                              <div className="holiday-date">
                                <span className="eventdate-text">08 MAY<br /><span className="year-text">2024</span></span>
                              </div>
                              <div>
                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                              </div>
                            </div>
                          </div>
                          <div className="event-wrapper">
                            <div className="event-info">
                              <div className="holiday-date">
                                <span className="eventdate-text">08 MAY<br /><span className="year-text">2024</span></span>
                              </div>
                              <div>
                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                              </div>
                            </div>
                          </div>
                          <div className="event-wrapper">
                            <div className="event-info">
                              <div className="holiday-date">
                                <span className="eventdate-text">11 MAY<br /><span className="year-text">2024</span></span>
                              </div>
                              <div>
                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                              </div>
                            </div>
                          </div>
                          <div className="event-wrapper">
                            <div className="event-info">
                              <div className="holiday-date">
                                <span className="eventdate-text">14 MAY<br /><span className="year-text">2024</span></span>
                              </div>
                              <div>
                                <h4 className="event-name mb-0">Birthday of Rabindranath</h4>
                              </div>
                            </div>
                          </div>
                          <div className="event-wrapper">
                            <div className="event-info">
                              <div className="holiday-date">
                                <span className="eventdate-text">23 MAY<br /><span className="year-text">2024</span></span>
                              </div>
                              <div>
                                <h4 className="event-name mb-0">Buddha Purnima</h4>
                              </div>
                            </div>
                          </div>
                          <div className="event-wrapper">
                            <div className="event-info">
                              <div className="holiday-date">
                                <span className="eventdate-text">31 MAY<br /><span className="year-text">2024</span></span>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <h4 className="event-name mb-0">Urgent Work</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </section>
            </Tab.Pane>
          </Tab.Content>

        </Tab.Container>
      )}
      <div className="helper-text-section">
        <h3>Guiding You Through: Helpful Text to Apply Leaves</h3>
        <ol className="ps-3  mb-0">
          <li className="mb-1">
            <p>
              All full-time and part-time developers are entitled to apply for
              leave. Types of leave include sick leave, personal leave, and
              emergency leave.
            </p>
          </li>
          <li className="mb-1">
            <p>
              If you need to cancel your applied leave, submit a leave
              cancellation request before the start date of the leave.
            </p>
          </li>
          <li className="mb-0">
            <p>
              All leave requests, including approved, cancelled, and not
              approved leaves, will be recorded and shown in your leave history.
            </p>
          </li>
        </ol>
      </div>
    </>
  );
};
export default LeavePlan;
