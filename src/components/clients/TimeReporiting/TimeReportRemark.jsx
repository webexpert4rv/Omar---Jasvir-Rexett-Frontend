import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Offcanvas,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import userImage from "../../../assets/img/user-img.jpg";
import { sendRemarkOnTimeReport } from "../../../redux/slices/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../atomic/RexettButton";
import ReconciliationModal from "./ReconcialiationModal";
const TimeReportRemark = ({
  remarkshow,
  handleremarkClose,
  currentDetails,
  role,
  page,
}) => {
  let {
    contractDetails: { user_details,contract_id },
    endDate,
    startDate,
    allSelectedTimeReport,
    timeReports: {
      end_time,
      start_time,
      memo,
      weeklyDetails,
      monthlyDetails,
      report_date,
      week,
      month,
    },
    totalDuration,
  } = currentDetails;
  const [addRemark, setRemark] = useState(null);
  const dispatch = useDispatch();
  const [updateWeeklyData, setUpdateWeeklyData] = useState();

  console.log(currentDetails, "currentDetails");
  const { smallLoader,reconciliationsData } = useSelector((state) => state.clientData);

console.log(reconciliationsData,"reconciliationsData")

  useEffect(() => {
    setUpdateWeeklyData(allSelectedTimeReport);
  }, []);

  return (
    <Offcanvas
      className="time-detail-sidepanel"
      show={remarkshow}
      onHide={handleremarkClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Reconciliation</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <div className="detail-view weekly-view">
          <div className="client-info mb-3">
          {role !== "developer" ? "Developer Name" : "Client Name"}
            <p className="client-name-heading">
              <img src={user_details?.profile_picture} />
              {user_details?.name}
            </p>
          </div>
      

          {updateWeeklyData?.map((item, index) => {
            return (
              <>
                <ReconciliationModal item={item} role={role} contract_id={contract_id}/>
              </>
            );
          })}
        </div>
        <RexettButton
                type="submit"
                text="Submit"
                className="main-btn font-14 mt-2 py-2 px-3"
                variant="transparent"
                // onClick={handleRemarkSend}
                // disabled={smallLoader}
                // isLoading={smallLoader}
              />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TimeReportRemark;
