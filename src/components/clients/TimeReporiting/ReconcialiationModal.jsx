import React, { useEffect, useState } from "react";
import userImage from "../../../assets/img/user-img.jpg";
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import moment from "moment";
import { TiEdit } from "react-icons/ti";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { approveTimeReportReconciliation, rejectTimeReportReconciliation, timeReporting } from "../../../redux/slices/clientDataSlice";

const approveRemark = <Tooltip id="tooltip">Approve</Tooltip>;
const rejectRemark = <Tooltip id="tooltip">Reject</Tooltip>;
const ReconciliationModal = ({
  item,
  role,
  index,
  handleChangeUpdateWeeklyData,
  selectedPeriod,
  page
}) => {
  const dispatch = useDispatch();
  const [editDetails, setEditDetails] = useState({
    editItem: null,
    isEdit: false,
  });
  const [reconciliationData, setReconcilitationData] = useState([]);
  let { end_time, start_time, memo, report_date, id, contract_id } = item;
  const handleEdit = (editData) => {
    setEditDetails({
      editItem: null,
      isEdit: !editDetails?.isEdit,
    });
  };
  useEffect(() => {
    setReconcilitationData([
      {
        ...item,
        id: index,
      },
    ]);
  }, []);


  const approvedReject = async (currentStatus) => {
    let data = {
      contract_id: contract_id,
      report_date: report_date,
      reconciliation_id: id,
      client_remark:null,
      is_approved: currentStatus,
    };
    await dispatch(currentStatus?approveTimeReportReconciliation(data):rejectTimeReportReconciliation(data));
    let filterData={
      page:page,
      selectedPeriod:selectedPeriod
    }
    dispatch(timeReporting(filterData, role));
  };
  const handleChange = (e, inx) => {
    const { name, value } = e.target;
    let duplicateItem = [...reconciliationData];
    // duplicateItem[inx][name] = value;
    // setReconcilitationData(duplicateItem);
    // let ind = duplicateItem.findIndex((item,idx) => idx === inx);
    if (inx > -1) {
      duplicateItem[0] = {
        ...duplicateItem[inx],
        [name]: value,
        // id:inx
      };
    } else {
      setReconcilitationData([...reconciliationData, duplicateItem]);
    }
  };
  return (
    <div className="weekly-detail mb-3 p-3">
      <div className="client-info mb-3 gap-5">
        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="datePrim">
              <p className="client-name-heading d-flex gap-1 align-items-center">
                <FiCalendar />
                {report_date}
              </p>
            </div>
            <div className="editSec">
              {role !== "client" && item?.reconciliation_approved!==true ? (
                <span className="px-3 mb-2 arrow-btn info-arrow font-16 text-decoration-none" onClick={()=>handleEdit(item)}>
                  <TiEdit />
                </span>
              ) : (
                ""
              )}
              <div className="d-flex gap-2">
                {role == "client" && item?.is_approved==null  ? (
                  <>
                    <OverlayTrigger placement="bottom" overlay={approveRemark}>
                      <Button
                        variant="transparent"
                        className="px-3 mb-2 arrow-btn primary-arrow font-16 text-decoration-none"
                        onClick={() => approvedReject(true)}
                      >
                        <IoCheckmark />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={rejectRemark}>
                      <Button
                        variant="transparent"
                        className="px-3 mb-2 arrow-btn danger-arrow font-16 text-decoration-none"
                        onClick={() => approvedReject(false)}
                      >
                        <IoCloseOutline />
                      </Button>
                    </OverlayTrigger>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* {role !== "client" ? (
            <span onClick={handleEdit}>
              <TiEdit />
            </span>
          ) : (
            ""
          )} */}

          {/* <p className="client-name-heading d-flex gap-1 align-items-center">
            <FiCalendar />
            {report_date}
          </p> */}
        </div>
        <div className="d-flex gap-4 justify-content-between">
          <div className="d-flex gap-3 align-items-center">
            <p className="client-name-heading d-flex gap-1 align-items-center">
              <FaRegClock />

              {editDetails?.isEdit ? (
                <>
                <input type="time" className="common-field form-control" value={moment(item?.start_time, "HH:mm:ss").format("HH:mm")} name="start_time"  onChange={(e)=>handleChangeUpdateWeeklyData(e,index)}/>
                
                </>
              ) : start_time ? (
                moment(start_time, "HH:mm:ss").format("h:mm A")
              ) : (
                "00:00"
              )}
            </p>
            <p className="client-name-heading">-</p>
            <p className="client-name-heading d-flex gap-1 align-items-center">
              <FaRegClock />

              {editDetails?.isEdit ? (
                <input type="time" className="common-field form-control" value={moment(item?.end_time, "HH:mm:ss").format("HH:mm")} name="end_time"  onChange={(e)=>handleChangeUpdateWeeklyData(e,index)}/>
              ) : end_time ? (
                moment(end_time, "HH:mm:ss").format("h:mm A")
              ) : (
                "00:00"
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="client-info">
        <h4 className="sidebar-heading">Memo</h4>
        {editDetails?.isEdit ? (
          <input type="text" className="common-field form-control" value={item?.memo} name="memo" onChange={(e)=>handleChangeUpdateWeeklyData(e,index)} />
        ) : (
          <p className="client-name-heading">
            {memo ? memo : "Memo not Found"}
          </p>
        )}
        <div>
          {item?.is_approved || item?.reconciliation_approved ? (
            <span className="status-finished mt-2 mx-1">Approved</span>
          ) : (item?.is_approved === false || item?.reconciliation_approved==false )&&(
            <span className="status-rejected mt-2">Rejected</span>
          )}

        </div>
      </div>
    </div>
  );
};

export default ReconciliationModal;
