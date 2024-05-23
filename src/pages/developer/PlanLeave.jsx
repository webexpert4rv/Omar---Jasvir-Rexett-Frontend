import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import companyLogo from "../../assets/img/amazon.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  applyLeave,
  getAllContracts,
  getLeaveHistory,
} from "../../redux/slices/developerDataSlice";
import { useTranslation } from "react-i18next";
import moment from "moment";
import RexettButton from "../../components/atomic/RexettButton";
import { generateLeave } from "../../components/clients/TimeReporiting/constant";
import { LEAVE_TYPE } from "../../components/clients/TimeReporiting/constant";



const LeavePlan = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const { leaveHistory, allContracts } = useSelector(
    (state) => state.developerData
  );
  const { handleSubmit, register, watch } = useForm({});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const today = new Date();
  const start_date = moment(selectionRange.startDate).format("MM-DD-YYYY");
  const end_date = moment(selectionRange.endDate).format("MM-DD-YYYY");
  const user_id = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(getLeaveHistory(user_id));
    dispatch(getAllContracts());
  }, []);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const onSubmit = (values) => {
    let data = {
      contract_id: +values.client_name,
      start_date: start_date,
      end_date: end_date,
      start_time: null,
      end_time: null,
      type: values.leave_type,
      reason_for_leave: values.reason,
    };
    dispatch(applyLeave(data));
  };

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
              <p className="text-muted font-14 mb-0">No Leave Applied</p>
              <Row>
                <Col xxl={3} xl={6} className="mb-xxl-0 mb-3">
                  <div className="leave-wrapper-box">
                    <div>
                      <h4 className="project-heading">Figma to UI</h4>
                      <h4 className="leave-type-heading">Full Day Leave</h4>
                      <div>
                        <p className="leave-date">17-05-2024 to 30-05-2024</p>
                      </div>
                      <p className="status-finished mb-0">Approved</p>
                    </div>
                    <div className="d-flex gap-3">
                      <Button className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                        <IoClose />
                      </Button>
                      <Button className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none">
                        <MdModeEditOutline />
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col xxl={3} xl={6} className="mb-xxl-0 mb-3">
                  <div className="leave-wrapper-box">
                    <div>
                      <h4 className="project-heading">Figma to UI</h4>
                      <h4 className="leave-type-heading">Half Day Leave</h4>
                      <div>
                        <p className="leave-date">31-05-2024</p>
                      </div>
                      <p className="status-progress mb-0">Under Approval</p>
                    </div>
                    <div className="d-flex gap-3">
                      <Button className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                        <IoClose />
                      </Button>
                      <Button className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none">
                        <MdModeEditOutline />
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col xxl={3} xl={6} className="mb-xxl-0 mb-3">
                  <div className="leave-wrapper-box">
                    <div>
                      <h4 className="project-heading">Figma to UI</h4>
                      <h4 className="leave-type-heading">Half Day Leave</h4>
                      <div>
                        <p className="leave-date">31-05-2024</p>
                      </div>
                      <p className="status-rejected mb-0">Not Approved</p>
                    </div>
                    <div className="d-flex gap-3">
                      <Button className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none">
                        <IoClose />
                      </Button>
                      <Button className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none">
                        <MdModeEditOutline />
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <Row className="gx-4">
              <Col lg={7}>
                <div className="leave-calendar h-100">
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    minDate={today}
                  />
                </div>
              </Col>
              <Col lg={5}>
                <div className="plan-leave-wrapper">
                  <h3 className="section-head border-0 mb-3">Apply Leave</h3>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* <div className="mb-4">
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
                    </div> */}
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
                  {leaveHistory.map((item, idx) => (
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
      <div className="helper-text-section">
        <h3>Guiding You Through: Helpful Text to Apply Leaves</h3>
        <ol className="ps-3 mb-0">
          <li className="mb-2">
            <p>
              Admin can effortlessly review daily time sheets and promptly raise
              invoices for clients. Click on any client's name in the table
              above to delve deeper into their project and time reporting
              details. Gain insights and manage project progress with precision.
              Also you can raise invoice for clients and track the invoices for
              Devs , Vendors and Clients.
            </p>
          </li>
          <li className="mb-2">
            <p>
              Admin can effortlessly review daily time sheets and promptly raise
              invoices for clients. Click on any client's name in the table
              above to delve deeper into their project and time reporting
              details. Gain insights and manage project progress with precision.
              Also you can raise invoice for clients and track the invoices for
              Devs , Vendors and Clients.
            </p>
          </li>
          <li className="mb-0">
            <p>
              Admin can effortlessly review daily time sheets and promptly raise
              invoices for clients. Click on any client's name in the table
              above to delve deeper into their project and time reporting
              details. Gain insights and manage project progress with precision.
              Also you can raise invoice for clients and track the invoices for
              Devs , Vendors and Clients.
            </p>
          </li>
        </ol>
      </div>
    </>
  );
};
export default LeavePlan;
