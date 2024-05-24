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
import { postReconciliationData } from "../../../redux/slices/developerDataSlice";
const TimeReportRemark = ({
  remarkshow,
  handleremarkClose,
  contractId,
  currentDetails,
  role,
  page,
}) => {
  let {
    contractDetails: { user_details, contract_id },
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
  const [reconciallationData, setReconciallationData] = useState([]);
  const dispatch = useDispatch();
  const [updateWeeklyData, setUpdateWeeklyData] = useState([]);

  const { smallLoader, reconciliationsData } = useSelector(
    (state) => state.clientData
  );

  useEffect(() => {
    if (role == "client") {
      setUpdateWeeklyData(reconciliationsData);
    } else {
      setUpdateWeeklyData(allSelectedTimeReport);
    }
  }, [reconciliationsData]);

  const handleReconciliationSend = () => {
    const temp = JSON.parse(JSON.stringify(updateWeeklyData));
    const payload = temp.filter((curElem) => curElem?.isEdited === true);
    // const modifiedPayload = payload.map((curElem) => {
    //   if (curElem.isEdited) {
    //     delete curElem.isEdited;
    //     return curElem;
    //   } else {
    //     return curElem;
    //   }
    // });

    // removing isEdited key that was added manually
    let modifiedPayload = payload.map(({ isEdited, ...rest }) => {return {...rest,contract_id:Number(contractId)}});
    if (modifiedPayload?.length) {
      dispatch(
        postReconciliationData(modifiedPayload, () => {
          handleremarkClose();
        })
      );
    } else {
      handleremarkClose();
    }
  };
  const handleChangeUpdateWeeklyData = (e, index) => {
    const { value, name } = e.target;
    const temp = JSON.parse(JSON.stringify(updateWeeklyData));
    temp[index][name] = value;
    temp[index]["isEdited"] = true;
    setUpdateWeeklyData(temp);
  };

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
                <ReconciliationModal
                  handleChangeUpdateWeeklyData={handleChangeUpdateWeeklyData}
                  item={item}
                  role={role}
                  contract_id={contract_id}
                  index={index}
                />
              </>
            );
          })}
        </div>
        {role !== "client" && (
          <RexettButton
            type="submit"
            text="Submit"
            className="main-btn font-14 mt-2 py-2 px-3"
            variant="transparent"
            onClick={handleReconciliationSend}
            // disabled={smallLoader}
            // isLoading={smallLoader}
          />
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default TimeReportRemark;
