import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import companyLogo from "../../assets/img/amazon.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import {
  applyLeave,
  getAllContracts,
  getLeaveHistory,
  getCancelLeave,
  getUpdateLeave,
  getHolidaysList,
} from "../../redux/slices/developerDataSlice";
import { useTranslation } from "react-i18next";
import moment from "moment";
import RexettButton from "../../components/atomic/RexettButton";
import { HOLIDAY_GUIDE_LINES, generateLeave } from "../../components/clients/TimeReporiting/constant";
import { LEAVE_TYPE } from "../../components/clients/TimeReporiting/constant";
import RejectModal from "../../components/common/Modals/EndJob";
import ToolTip from "../../components/common/Tooltip/ToolTip";
import NoDataFound from "../../components/atomic/NoDataFound";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import ListOfHolidays from "../../components/common/LeaveRequest/ListOfHolidays";
import ApplyLeaveSection from "./ApplyLeaveSection";
import Guidelines from "../../components/common/Guidelines/Guidelines";

const LeavePlan = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const { screenLoader, leaveDetails, allContracts, holidayList ,smallLoader  } = useSelector(
    (state) => state.developerData
  );
const [selectedLeave ,setSelectedLeave] = useState()
  const [leaveId , setLeaveId] = useState(null)
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
  const today = new Date();
  const start_date = moment(selectionRange?.startDate).format("MM-DD-YYYY");
  const end_date = moment(selectionRange?.endDate).format("MM-DD-YYYY");
  const user_id = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getHolidaysList());
  }, []);

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

  const handleCancelLeave = async (id ,idx) => {
    setSelectedLeave(idx)
    let data = {
      withdrawal_reason: "reason",
    };
    await dispatch(getCancelLeave(id, data));
    let payload = {
      approval_status: "Under Approval",
    };
    dispatch(getLeaveHistory(user_id, payload));
  };

 
  const listHolidays = (data) => {
    const holidays = data?.map((value) => new Date(value?.date));
    return holidays;
  };

  const [value, onChange] = useState(new Date());
  const markedDates = listHolidays(holidayList);

  const tileContent = ({ date, view }) => {
    if (
      view === "month" &&
      markedDates.find((d) => d.toDateString() === date.toDateString())
    ) {
      return <div className="dot"></div> ;
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
                      <h3 className="section-head border-0 mb-2">
                        Applied Leaves
                      </h3>
                      <Row>
                        {leaveDetails.length > 0 ? (
                          leaveDetails?.map((field, idx) => (
                            <Col xxl={3} xl={6} className="mb-xxl-0 mb-3">
                              <div className="leave-wrapper-box">
                                <div>
                                  <h4 className="project-heading">{}</h4>
                                  <h4 className="leave-type-heading">
                                    {generateLeave(field?.type)}
                                  </h4>
                                  <div>
                                    <p className="leave-date">
                                      {moment(field?.start_date).format(
                                        "MM-DD-YYYY"
                                      )}
                                      to
                                      {moment(field?.end_date).format(
                                        "MM-DD-YYYY"
                                      )}
                                    </p>
                                  </div>
                                  <p className="status-finished mb-0">
                                    {field?.approval_status}
                                  </p>
                                </div>
                                <div className="d-flex gap-3">
                                  <ToolTip text="Cancel Leave">
                                    <RexettButton
                                      className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                                      onClick={() =>
                                        handleCancelLeave(field?.id , idx)
                                      }
                                      isLoading={selectedLeave === idx ? smallLoader : false}
                                    >
                                      <IoClose />
                                    </RexettButton>
                                  </ToolTip>
                                  <ToolTip text="Edit Leave">
                                    <Button
                                      className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none"
                                      onClick={() => setLeaveId(field?.id)}
                                    >
                                      <MdModeEditOutline />
                                    </Button>
                                  </ToolTip>
                                </div>
                              </div>
                            </Col>
                          ))
                        ) : (
                          <p className="text-muted font-14 mb-0">
                            No Leave Applied
                          </p>
                        )}
                      </Row>
                    </div>
                      <ApplyLeaveSection allContracts={allContracts} handleRange={handleRange} selectionRange ={selectionRange} setSelectionRange = {setSelectionRange} smallLoader = {smallLoader} id = {leaveId} start_date = {start_date} end_date = {end_date}  />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div className="table-responsive">
                      <table className="table time-table table-bordered table-ui-custom">
                        <thead>
                          <th className="time-table-head text-start">
                            Leave Type
                          </th>
                          <th className="time-table-head text-start">
                            Leave Date
                          </th>
                          <th className="time-table-head text-start">Reason</th>
                          <th className="time-table-head text-start">
                            Project
                          </th>
                          <th className="time-table-head text-start">
                            Client Name
                          </th>
                          <th className="time-table-head text-start">
                            Leave Status
                          </th>
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
                                    {moment(item.start_date).format(
                                      "MM-DD-YYYY"
                                    )}
                                    to
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
              <ListOfHolidays
                onChange={onChange}
                value={value}
                tileContent={tileContent}
                holidayList={holidayList}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      )}
      <Guidelines heading={"Guiding You Through: Helpful Text to Apply Leaves"} guideLines={HOLIDAY_GUIDE_LINES}/>
    </>
  );
};
export default LeavePlan;
