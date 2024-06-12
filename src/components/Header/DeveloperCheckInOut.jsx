import React, { useEffect, useState } from "react";
import StartDayModal from "../common/Modals/StartDay";
import {
  addLogTime,
  getLastTimeLog,
} from "../../redux/slices/developerDataSlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Timer from "../atomic/Timer";

const DeveloperCheckInOut = () => {
  const [isColorfulChecked, setIsColorfulChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const { lastTimeLog, developerDashboard } = useSelector(
    (state) => state.developerData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLastTimeLog());
  }, []);

  const convertHourToSecond = (hours) => {
    const seconds = hours * 3600;
    return seconds;
  };

  useEffect(() => {
    if (Object.keys(lastTimeLog).length > 0) {
      setChecked(
        lastTimeLog?.data?.type == "break" ||
          lastTimeLog?.data?.type == "check-out"
          ? false
          : true
      );
      setTotalSeconds(
        convertHourToSecond(lastTimeLog?.data?.hours_worked_till_time)
      );
    }
  }, [lastTimeLog?.data?.hours_worked_till_time]);


  const handleCloseStartDay = (text, currStatus) => {
    console.log(currStatus,"rrr")
    setIsColorfulChecked(false);
    if (text !== "yes") {
      return;
    }

    if (developerDashboard?.clientList?.length === 0) {
      toast.error(
        "You don't have any active project and are not associated with any client"
      );
      return;
    }

    if (lastTimeLog?.data?.type === "check-out") {
      toast.error("You have already checked out. You cannot check in again");
      return;
    }

    setChecked(!checked);

    const isCheckIn = lastTimeLog?.data?.hours_worked_till_time == null;
    const data = {
      type: isCheckIn
        ? "check-in"
        : currStatus === "check-in"
        ? "resumed"
        : currStatus,
      timer_seconds_till_time: totalSeconds === 0 ? null : totalSeconds,
      memo: null,
    };

    dispatch(addLogTime(data));
  };

  const handleColorfulChange = (e) => {
    if (lastTimeLog?.data?.type === "check-out") {
      toast.error("You have already checked out. You cannot check in again");
      return;
    }
    // if (lastTimeLog?.isHoliday) {
    //     toast.error("Today is holiday, you can not check-in");
    //     return;
    // }

    if (lastTimeLog?.isLeave) {
      toast.error("Today is Leave, you can not check-in");
      return;
    }
    setIsColorfulChecked(true);
  };

  return (
    <>
      <p className="time-counter">
        <Timer
          checked={checked}
          totalSeconds={totalSeconds}
          setTotalSeconds={setTotalSeconds}
          lastTimeLog={lastTimeLog}
        />
      </p>
      <div className="check-text">
        <span className="checkout-text">CheckOut</span>
        <input
          type="checkbox"
          role="switch"
          className="colorful"
          checked={checked}
          onChange={handleColorfulChange}
        />
        <span className="checkin-text">
          {lastTimeLog?.data?.type === "break" ? "Resume" : "CheckIn"}
        </span>
      </div>

      {
        isColorfulChecked && (
          <StartDayModal
            type={lastTimeLog?.data?.type}
            show={isColorfulChecked}
            handleClose={handleCloseStartDay}
            checked={checked}
            setChecked={setChecked}
            totalSeconds={totalSeconds}
          />
        )
      }
    </>
  );
};

export default DeveloperCheckInOut;
