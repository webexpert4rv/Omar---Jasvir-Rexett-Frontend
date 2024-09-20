import React, { useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getLastTimeLog } from "../../../redux/slices/developerDataSlice";
import SubmitTimeReport from "./SubmitTimeSheet";
import breakIcon from "../../../assets/img/break-time-icon.svg";
import exitIcon from "../../../assets/img/logout-line-icon.svg";
import exitIconGreen from "../../../assets/img/logout-line-icon-green.svg";
import RexettButton from "../../atomic/RexettButton";

const StartDayModal = ({
  type,
  show,
  handleClose,
  checked,
  totalSeconds,
  setChecked,
}) => {
  const [showTimeReport, setShowTimeReport] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const dispatch = useDispatch();

  const handleTimeReport = useCallback(() => {
    setShowTimeReport(true);
    setChecked(false)
    const now = moment();
    setEndTime(now.format("h:mm a"));
    dispatch(getLastTimeLog());
  }, [dispatch]);

  const handleCloseTimeReport = useCallback(() => {
    setShowTimeReport(false);
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose("no")}
        centered
        animation
        className="custom-modal"
      >
        <Modal.Header className="border-0 pb-3"></Modal.Header>
        <Modal.Body>
          {!checked ? (
            <>
              <h3 className="popup-heading">
                {" "}
                Are you sure you want to{" "}
                {type === "break" ? "Resume" : "CheckIn"}?
              </h3>
              <div className="text-center">
                <RexettButton
                  text="No"
                  variant="transparent"
                  onClick={() => handleClose("no")}
                  className="main-btn outline-main-btn px-4 me-2 font-14 fw-semibold"
                />

                <RexettButton
                  text="Yes"
                  variant="transparent"
                  onClick={() => handleClose("yes", "check-in")}
                  className="main-btn px-4 font-14 fw-semibold"
                />
              </div>
            </>
          ) : (
            <>
              <h3 className="popup-heading"> Do you want to</h3>
              <div className="d-flex justify-content-center align-items-center gap-4">
                <RexettButton
                  text="Take a break"
                  onClick={() => handleClose("yes", "break")}
                  className="main-btn outline-main-btn py-2 px-3 font-14 d-flex align-items-center gap-2"
                >
                  <img src={breakIcon} className="break-icon" />
                </RexettButton>
                <RexettButton
                  text="Checkout"
                  onClick={handleTimeReport}
                  className="main-btn checkout-btn py-2 px-3 font-14 d-flex align-items-center gap-2"
                >
                  <img src={exitIcon} className="checkout-icon" />
                  <img
                    src={exitIconGreen}
                    className="checkout-icon green-checkout"
                  />
                </RexettButton>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      <SubmitTimeReport
        endTime={endTime}
        show={showTimeReport}
        handleCloseTimeReport={handleCloseTimeReport}
        handleClose={handleClose}
        setChecked={setChecked}
        totalSeconds={totalSeconds}
      />
    </>
  );
};

export default StartDayModal;
