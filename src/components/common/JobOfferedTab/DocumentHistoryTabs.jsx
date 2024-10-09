import React from "react";
import { CATEGORY_TITLE } from "./constant/constant";
import OfferedDetailsCard from "./OfferedDetailsCard";
import { Nav, Tab } from "react-bootstrap";
import NoDataFound from "../../atomic/NoDataFound";

const DocumentHistoryTabs = ({
  handleSelect,
  selectedTab,
  tabData,
  handleAgreement,
  handleEditDraftDoc,
  setShowDocumentView,
  type,
}) => {
  console.log(
    tabData.filter((clt) => clt.category_title === CATEGORY_TITLE.sow),
    selectedTab.client.selectedTab,
    "vsds"
  );
  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey={CATEGORY_TITLE.sow}
      onSelect={(e) => handleSelect(e, type)}
    >
      <Nav variant="pills" className="application-pills">
        <Nav.Item className="application-item">
          <Nav.Link eventKey={CATEGORY_TITLE.sow} className="application-link">
            SOW
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="application-item">
          <Nav.Link eventKey={CATEGORY_TITLE.nda} className="application-link">
            NDA
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey={CATEGORY_TITLE.sow} className="pt-2 pb-4">
          {selectedTab.client.selectedTab === CATEGORY_TITLE.sow &&
          tabData.filter((clt) => clt.category_title === CATEGORY_TITLE.sow)
            .length > 0 ? (
            tabData
              .filter((clt) => clt.category_title === CATEGORY_TITLE.sow)
              .map((details) => (
                <OfferedDetailsCard
                  setShowDocumentView={setShowDocumentView}
                  callBack={handleAgreement}
                  agreementDetails={details}
                  handleEditDraftDoc={handleEditDraftDoc}
                />
              ))
          ) : (
            <NoDataFound />
          )}
        </Tab.Pane>
        <Tab.Pane eventKey={CATEGORY_TITLE.nda} className="pt-2 pb-4">
          {selectedTab.client.selectedTab === CATEGORY_TITLE.nda &&
          tabData.filter((clt) => clt.category_title === CATEGORY_TITLE.nda)
            .length > 0 ? (
            tabData
              .filter((clt) => clt.category_title === CATEGORY_TITLE.nda)
              .map((details) => (
                <OfferedDetailsCard
                  setShowDocumentView={setShowDocumentView}
                  callBack={handleAgreement}
                  agreementDetails={details}
                  handleEditDraftDoc={handleEditDraftDoc}
                />
              ))
          ) : (
            <NoDataFound />
          )}
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default DocumentHistoryTabs;
