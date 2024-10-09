import React, { useState } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { FaArrowRight, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import sowImage from "../../../assets/img/sow-img.png";
import CreateNewTemplate from "./CreateNewTemplate";
import TemplateNameModal from "../Modals/TemplateNameModal";

const OfferTemplate = ({
  handleNext,
  editorRef,
  showCreatedDocument,
  setShowCreateDocument,
  templateList
  // templateList,
}) => {
  const [showNameModal, setShowNameModal] = useState(false);
  const viewPage = <Tooltip>View</Tooltip>;
  const editPage = <Tooltip>Proceed</Tooltip>;


  const handleCreateDocument = () => {
    // setShowCreateDocument(true);
    setShowNameModal(true);
  };

  const handleCloseTemplateName = (name, type) => {
    setShowNameModal(false);
    setShowCreateDocument({ show: true, name: name, type: type, newRecord: "" });
  };

  const handleCloseModal = () => {
    setShowNameModal(false);
    setShowCreateDocument({ show: false, name: "", type: "", newRecord: "" });
  }
  return (
    <>
      {showCreatedDocument.show ? (
        <CreateNewTemplate
          editorRef={editorRef}
          setShowCreateDocument={setShowCreateDocument}
          showCreatedDocument={showCreatedDocument}
        />
      ) : (
        <div id="new-step">
          <h4 className="text-center mb-4">Select Template</h4>
          <Row>
            {templateList.map((tmp) => (
              <Col md={3} className="mb-2">
                <div className="website-card">
                  <img src={sowImage} alt="show-icon" />
                  <p>{tmp.template_title}</p>
                  <div className="action-website">
                    <OverlayTrigger placement="bottom" overlay={viewPage}>
                      <Link
                        onClick={() => handleNext(tmp)}
                        to={"#"}
                        className="text-decoration-none website-action"
                      >
                        <FaEye />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement="bottom" overlay={editPage}>
                      <Button
                        variant="transparent"
                        className="website-action"
                        onClick={() => handleNext(tmp)}
                      >
                        <FaArrowRight />
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
              </Col>
            ))}
            <Col md={3} style={{ height: "257px" }}>
              <div className="website-card h-100">
                <Button
                  variant="transparent"
                  onClick={handleCreateDocument}
                  className="newpage-card"
                >
                  + Create New Template
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
      {showNameModal && (
        <TemplateNameModal
          show={showNameModal}
          handleSubmitForm={handleCloseTemplateName}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
}; 

export default OfferTemplate;
