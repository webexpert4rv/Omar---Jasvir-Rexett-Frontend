import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCopy, FaInfo } from "react-icons/fa6";
import NoDataFound from "../../../components/atomic/NoDataFound";
import { convertDateTime } from "../../../Utils/dateTimeConverter";
import { SIGNER_STATUS } from "../../../components/common/JobOfferedTab/constant/constant";
const AgreementDetails = ({ show, handleClose, agreementDetails }) => {
  const [emailList, setEmailList] = useState([]);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const emails = agreementDetails?.adobe_tracking_meta_data?.participantSets
      .filter((vl) => vl.role !== "APPROVER")
      .map((vl) => vl.memberInfos[0].email);
    setEmailList(emails);
  }, []);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
  };
  const waitingText = (
    <Tooltip>
      <div className="waiting-details">
        <p className="mb-1 fw-medium font-14">Created</p>
        <p className="mb-2 font-12">
          {convertDateTime(
            agreementDetails?.created_at,
            "M/D/YYYY | hh:mm:ss A"
          )}
        </p>
        <p className="mb-1 fw-medium font-14">Sent</p>
        <p className="mb-2 font-12">
          {convertDateTime(agreementDetails?.sent_at, "M/D/YYYY | hh:mm:ss A")}
        </p>
        <p className="mb-1 fw-medium font-14">Changed</p>
        <p className="mb-0 font-12">
          {convertDateTime(
            agreementDetails?.updated_at,
            "M/D/YYYY | hh:mm:ss A"
          )}
        </p>
      </div>
    </Tooltip>
  );

  const signerStatus = (status) => {
    switch (status) {
      case SIGNER_STATUS.NOT_YET_VISIBLE:
        return "Not seen yet";

      case SIGNER_STATUS.WAITING_FOR_OTHERS:
        return "Signed waiting for other";

      case SIGNER_STATUS.WAITING_FOR_MY_SIGNATURE:
        return "Not signed";

      default:
        return "current";
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      animation
      size="lg"
      className="custom-modal"
    >
      <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

      <Modal.Body>
        <h3 className="popup-heading d-flex justify-content-center align-items-center gap-2">
          {agreementDetails?.template_title}
          <OverlayTrigger placement="bottom" overlay={waitingText}>
            <span className="info-agreement-tooltip">
              <FaInfo />
            </span>
          </OverlayTrigger>
        </h3>
        <div className="info-agreement">
          <p>
            Envelope ID :{" "}
            <strong className="text-green">
              {agreementDetails?.adobe_agreement_id}
            </strong>{" "}
            <span
              className="copy-btn"
              onClick={() => handleCopy(agreementDetails?.adobe_agreement_id)}
            >
              <FaCopy />
            </span>{" "}
          </p>
          <p>
            From: <b>{userName || ""}</b>
          </p>
          <p>
            Last change on{" "}
            <b>
              {convertDateTime(
                agreementDetails?.updated_at,
                "M/D/YYYY | hh:mm:ss A"
              )}
            </b>
          </p>
          {/* <p>
            Sent on{" "}
            <b>
              {convertDateTime(
                agreementDetails?.sent_at,
                "M/D/YYYY | hh:mm:ss A"
              )}
            </b>
          </p> */}
        </div>
        <div>
          <h4 className="recipients-text">Recipients</h4>
          <div className="recipents-info">
            <span>Current</span>
          </div>
          {agreementDetails?.adobe_tracking_meta_data?.participantSets.length >
          0 ? (
            agreementDetails?.adobe_tracking_meta_data?.participantSets.map(
              (trackData) => (
                <>
                  {trackData.role != "APPROVER" && (
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h5 className="reciept-name">{trackData.name}</h5>
                        <p className="reciept-text mb-0">
                          {trackData.memberInfos[0]?.email}
                        </p>
                      </div>
                      <div>
                        <h5 className="reciept-name">
                          {signerStatus(trackData.status)}
                        </h5>
                        <p className="reciept-text mb-0">
                          Sent on{" "}
                          {convertDateTime(
                            trackData?.memberInfos[0]?.createdDate,
                            "M/D/YYYY | hh:mm:ss A"
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )
            )
          ) : (
            <NoDataFound />
          )}

          {/* <div className="recipents-info mt-4">
            <span>Current</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="reciept-name">Robin Gautam</h5>
              <p className="reciept-text mb-0">robin@avioxtechnologies.com</p>
            </div>
            <div>
              <h5 className="reciept-name">Needs to Sign</h5>
              <p className="reciept-text mb-0">on 8/28/2024 | 10:28:08 am</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="reciept-name">Robin Gautam</h5>
              <p className="reciept-text mb-0">robin@avioxtechnologies.com</p>
            </div>
            <div>
              <h5 className="reciept-name">Viewed</h5>
              <p className="reciept-text mb-0">on 8/28/2024 | 10:28:08 am</p>
            </div>
          </div> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default AgreementDetails;
