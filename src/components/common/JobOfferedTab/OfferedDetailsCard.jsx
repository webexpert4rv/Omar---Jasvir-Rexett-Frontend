import { useEffect, useState } from "react";
import React from "react-bootstrap";
import { OverlayTrigger, ProgressBar, Tooltip, Button } from "react-bootstrap";
import { FaEye, FaFileSignature } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import { convertDateTime } from "../../../Utils/dateTimeConverter";
import { ADOBE_BASE_URL } from "./constant/constant";

const OfferedDetailsCard = ({
  callBack,
  agreementDetails,
  handleEditDraftDoc,
}) => {
  const [emailList, setEmailList] = useState([]);
  useEffect(() => {
    const emails = agreementDetails?.adobe_tracking_meta_data?.participantSets
      .filter((vl) => vl.role !== "APPROVER")
      .map((vl) => vl.memberInfos[0].email);
    setEmailList(emails);
  }, []);
  const dateCreated = (
    <Tooltip>
      {convertDateTime(agreementDetails?.created_at, "M/D/YYYY | hh:mm:ss A")}
    </Tooltip>
  );
  const waitingText = (
    <Tooltip>
      <div className="waiting-details">
        <h5>Waiting for</h5>
        <ul>
          <li>
            Sahil Kansal
            <ul>
              <li>
                Sent on{" "}
                {convertDateTime(
                  agreementDetails?.sent_at,
                  "M/D/YYYY | hh:mm:ss A"
                )}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Tooltip>
  );
  const publishContract = <Tooltip id="tooltip">Publish COntract</Tooltip>;
  const cancelContract = <Tooltip id="tooltip">Cancel Contract</Tooltip>;
  const downloadContract = <Tooltip id="tooltip">Download Contract</Tooltip>;
  const editContract = <Tooltip id="tooltip">Edit Contract</Tooltip>;

  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.href = ADOBE_BASE_URL + agreementDetails.user_doc_file;
    link.download = agreementDetails.template_title;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="d-flex justify-content-between align-items-center activity-doc-wrapper cursor-pointer mb-3">
      <div>
        <p className="name-text">{agreementDetails?.template_title}</p>
        <div className="sender-text">
          <p>
            To :{" "}
            {emailList &&
              emailList?.length > 0 &&
              emailList?.slice(0, 2).join(",")}
          </p>
          {emailList && emailList.length > 2 && (
            <span
              className="more-sender"
              onClick={() => callBack(agreementDetails)}
            >
              +{emailList.length}
            </span>
          )}
        </div>
        <OverlayTrigger placement="bottom" overlay={dateCreated}>
          <p className="created-date">
            {convertDateTime(agreementDetails?.created_at, "M/D/YYYY")}
          </p>
        </OverlayTrigger>
      </div>
      {agreementDetails.status === "draft" && (
        <div>
          <p>Document Not Sended Yet</p>
        </div>
      )}
      {/* ) : (
        <div
          className="waiting-wrapper"
          onClick={() => callBack(agreementDetails)}
        >
          <ProgressBar now={50} />
          <OverlayTrigger placement="bottom" overlay={waitingText}>
            <p className="waiting-text">Waiting for Sahil</p>
          </OverlayTrigger>
        </div>
      )} */}
      {/* {agreementDetails.status === "draft" && (
        <div>
          <p>Draft</p>
        </div>
      )} */}
      <div>
        <div className="d-flex align-items-center gap-3">
          {/* <OverlayTrigger placement="bottom" overlay={cancelContract}>
            <Button variant="transparent" className="arrow-btn danger-arrow">
              <RiFileCloseLine />
            </Button>
          </OverlayTrigger> */}
          {/* {agreementDetails?.editable && (
            <OverlayTrigger placement="bottom" overlay={publishContract}>
              <Button variant="transparent" className="arrow-btn primary-arrow">
                <BsFillSendFill />
              </Button>
            </OverlayTrigger>
          )} */}
          {agreementDetails.status !== "draft" && (
            <>
              <OverlayTrigger placement="bottom" overlay={downloadContract}>
                <Button
                  variant="transparent"
                  className="arrow-btn info-arrow"
                  onClick={handleDownloadFile}
                >
                  <LuDownload />
                </Button>
              </OverlayTrigger>

              <span
                onClick={() => callBack(agreementDetails)}
                className="px-3 arrow-btn primary-arrow font-16 text-decoration-none cursor-pointer"
              >
                <FaEye />
              </span>
            </>
          )}
          {agreementDetails?.editable && (
            <>
              <OverlayTrigger placement="bottom" overlay={editContract}>
                <Button
                  variant="transparent"
                  className="arrow-btn primary-arrow"
                  onClick={() =>
                    handleEditDraftDoc({
                      owner: agreementDetails.ownership,
                      url: agreementDetails,
                      documentType: {
                        id: agreementDetails.category,
                        category_title: agreementDetails.category_title,
                      },
                    })
                  }
                >
                  <FaFileSignature />
                </Button>
              </OverlayTrigger>

              {/* <OverlayTrigger placement="bottom" overlay={publishContract}>
                <Button
                  variant="transparent"
                  className="arrow-btn primary-arrow"
                  onClick={()=>handleSendEmail(agreementDetails.id)}
                >
                  <BsFillSendFill />
                </Button>
              </OverlayTrigger> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferedDetailsCard;
