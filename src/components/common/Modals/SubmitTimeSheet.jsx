import moment from "moment";
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addLogTime } from "../../../redux/slices/developerDataSlice";
import { useForm } from "react-hook-form";
const SubmitTimeReport = ({
  endTime,
  show,
  handleCloseTimeReport,
  handleClose,
  setChecked,
  totalSeconds,
}) => {
  const { t } = useTranslation();
//   const [memo, setMemo] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const today = moment().format("YYYY-MM-DD");
  const {lastTimeLog}=useSelector(state=>state.developerData)

  const onSubmit = (values) => {
    handleCloseTimeReport();
    handleClose();
    setChecked(false);
    let payload={
            "type": "check-out",
            "timer_seconds_till_time": totalSeconds,
            "memo": values?.memo
          }

      dispatch(addLogTime(payload))
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
                <h4 className="">Date</h4>
                <p>{today}</p>
              </Col>
              <Col md={6}>
                <h4 className="">Total Hours</h4>
                <p> {totalSeconds * 3600} hrs</p>
              </Col>
              <Col md={6}>
                <h4 className="">Start Time</h4>
                <p className="mb-0">{lastTimeLog?.check_in_time}</p>
                {/* <p className="mb-0">{startTime}</p> */}
              </Col>
              <Col md={6}>
                <h4 className="">End Time</h4>
                {/* <p className="mb-0">07:00 PM</p> */}
                <p className="mb-0">{endTime && endTime}</p>
              </Col>
            </Row>
          </div>
          <Form.Control
            as="textarea"
            placeholder="Enter Memo"
            className="common-field font-14 mb-4"
            //   onChange={(e)=>setMemo(e.target.value)}
            {...register("memo", {
              required: "Please Enter Memo",
            })}
          />
          {errors?.memo && (
            <p className="error-message">{errors.memo?.message}</p>
          )}
          <div className="text-center">
            <Button
              variant="transparent"
              type="onSubmit"
              className="main-btn px-4 font-14 fw-semibold"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default SubmitTimeReport;
