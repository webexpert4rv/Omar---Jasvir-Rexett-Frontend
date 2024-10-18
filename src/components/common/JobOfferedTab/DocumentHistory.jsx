import React, { useEffect, useState } from "react";
import AgreementDetails from "../../../pages/admin/Modals/AgreementDetail";
import DocumentViewerModal from "../Modals/DocumentViewerModal";
import { CATEGORY_TITLE } from "./constant/constant";
import DocumentHistoryTabs from "./DocumentHistoryTabs";

const DocumentHistory = ({ agreementDetails, handleEditDraftDoc }) => {
  const [showAgreement, setAgreementDetail] = useState({
    show: false,
    details: {},
  });
  const [showDocumentView, setShowDocumentView] = useState({
    show: false,
    url: "",
  });
  const [selectedTab, setSelectedTab] = useState({
    client: {
      selectedTab: CATEGORY_TITLE.sow,
    },
    candidate: {
      selectedTab: CATEGORY_TITLE.sow,
    },
  });

  const [tabsList, setTabsList] = useState({
    client: [],
    candidate: [],
  });
  useEffect(() => {
    let clientList = [];
    let candidateList = [];
    if (agreementDetails.length > 0) {
      clientList = agreementDetails.filter(
        (dtl) => dtl?.ownership?.toLowerCase() === "client"
      );
      candidateList = agreementDetails.filter(
        (dtl) => dtl?.ownership?.toLowerCase() === "candidate"
      );
    }
    setTabsList({
      client: clientList,
      candidate: candidateList,
    });
  }, [agreementDetails]);

  const handleAgreement = (details) => {
    setAgreementDetail({ show: true, details: details });
  };

  const handleCloseAgreement = () => {
    setAgreementDetail({ show: false, details: {} });
  };

  const handleSelect = (key, type) => {
    setSelectedTab({
      ...selectedTab,
      [type]: {
        selectedTab: key,
      },
    });
  };

  return (
    <>
      {tabsList.client.length > 0 && (
        <>
          {" "}
          <h5 className="font-22 mb-4 fw-bold">Created Documents for Client</h5>
          <DocumentHistoryTabs
            handleAgreement={handleAgreement}
            setShowDocumentView={setShowDocumentView}
            handleEditDraftDoc={handleEditDraftDoc}
            tabData={tabsList.client}
            selectedTab={selectedTab}
            handleSelect={handleSelect}
            type={"client"}
          />
        </>
      )}
      {tabsList.candidate.length > 0 && (
        <>
          {" "}
          <h5 className="font-22 mb-4 fw-bold">
            Created Documents for Candidate
          </h5>
          <DocumentHistoryTabs
            handleAgreement={handleAgreement}
            setShowDocumentView={setShowDocumentView}
            handleEditDraftDoc={handleEditDraftDoc}
            tabData={tabsList.candidate}
            selectedTab={selectedTab}
            handleSelect={handleSelect}
            type={"candidate"}
          />
        </>
      )}
      {showAgreement.show && (
        <AgreementDetails
          show={showAgreement.show}
          handleClose={handleCloseAgreement}
          agreementDetails={showAgreement.details}
        />
      )}
      {showDocumentView.show && (
        <DocumentViewerModal
          show={showDocumentView.show}
          url={showDocumentView.url}
          handleClose={() => setShowDocumentView({ show: false, url: "" })}
        />
      )}
    </>
  );
};

export default DocumentHistory;
