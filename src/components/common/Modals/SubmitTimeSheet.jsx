import moment from "moment";
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addLogTime } from "../../../redux/slices/developerDataSlice";
import { useForm } from "react-hook-form";
import RexettButton from "../../atomic/RexettButton";
import { timeReporting } from "../../../redux/slices/clientDataSlice";

const SubmitTimeReport = ({
  endTime,
  show,
  handleCloseTimeReport,
  handleClose,
  setChecked,
  totalSeconds,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const today = moment().format("YYYY-MM-DD");
  const { lastTimeLog, smallLoader } = useSelector(
    (state) => state.developerData
  );

  const calculateTotalHours = () => {
    const now = moment();
    const startTime = moment(lastTimeLog?.check_in_time, "hh:mm A");

    if (!startTime.isValid()) {
      return "Invalid start time";
    }

    const duration = moment.duration(now.diff(startTime));
    const hours = duration.asHours();

    return hours.toFixed(2);
  };

  const onSubmit = async (values) => {
    const payload = {
      type: "check-out",
      timer_seconds_till_time: totalSeconds,
      memo: values?.memo,
    };

    await dispatch(addLogTime(payload));
    handleCloseTimeReport();
    handleClose();
    setChecked(false);

    const filterData = { filter: "weekly" };
    dispatch(timeReporting(filterData, "developer"));
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseTimeReport}
      centered
      animation
      className="custom-modal"
    >
      <Modal.Header className="border-0 pb-3"></Modal.Header>
      <Modal.Body>
        <h3 className="popup-heading">Submit Time Report</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="info-box mb-4">
            <Row>
              <Col md={6}>
                <h4>Date</h4>
                <p>{today}</p>
              </Col>
              <Col md={6}>
                <h4>Total Hours</h4>
                <p>{calculateTotalHours()} hrs</p>
              </Col>
              <Col md={6}>
                <h4>Start Time</h4>
                <p className="mb-0">
                  {moment(lastTimeLog?.check_in_time, "HH:mm:ss").format(
                    "HH:mm"
                  )}{" "}
                  {lastTimeLog?.check_in_time?.split(" ")[1]}
                </p>
              </Col>
              <Col md={6}>
                <h4>End Time</h4>
                <p className="mb-0">{endTime}</p>
              </Col>
            </Row>
          </div>
          <Form.Control
            as="textarea"
            placeholder="Enter Memo"
            className="common-field font-14 mb-4"
            {...register("memo", {
              required: "Please Enter Memo",
            })}
          />
          {errors?.memo && (
            <p className="error-message">{errors.memo?.message}</p>
          )}
          <div className="text-center">
            <RexettButton
              type="submit"
              text={t("submit")}
              className="main-btn px-4 font-14 fw-semibold"
              variant="transparent"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SubmitTimeReport;
