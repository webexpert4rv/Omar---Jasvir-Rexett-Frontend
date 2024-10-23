import React, { forwardRef, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { IoArrowBack, IoCheckmarkOutline } from "react-icons/io5";
import CustomFieldModal from "../Modals/CustomField";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DocumentViewer from "../JobOfferedTab/DocumentViewer";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { CANDIDATE } from "../../../constent/constent";
import { useSelector } from "react-redux";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

function DocumentViewerWrapper({
  handleBack,
  documentOwner,
  selectedTemplate,
  selectedDocument,
}) {
  const [showcustomfield, setCustomField] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState([]);

  const { singleJobPost } = useSelector((state) => state.clientData);

  const candidateList =
    singleJobPost?.job?.job_applications?.offered || [];

  const handleCloseCustomField = () => {
    setCustomField(!showcustomfield);
  };

  const handleSelectCandidate = (candidate) => {
    const index = selectedCandidate.findIndex(
      (dev) => dev.email === candidate.email
    );
    if (index === 0) {
      setSelectedCandidate((prev) =>
        prev.filter((dev) => dev.email !== candidate.email)
      );
    } else {
      setSelectedCandidate([...selectedCandidate, candidate]);
    }
  };

  const backTooltip = <Tooltip>Back</Tooltip>;

  return (
    <>
      <div>
        <div id="fill-details">
          <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <OverlayTrigger placement="bottom" overlay={backTooltip}>
              <Button
                variant="transparent"
                className="main-btn outline-main-btn sow-action"
                onClick={handleBack}
              >
                <IoArrowBack />
              </Button>
            </OverlayTrigger>
            <h4 className="mb-0">Preview Document</h4>
          </div>
          {documentOwner === CANDIDATE && (
            <div>
              <Form.Label className="font-14 fw-medium">
                Select Candidate
              </Form.Label>
              <div>
                {candidateList.map((candidate, i) => (
                  <div className="d-inline-block me-3" key={i}>
                    <input
                      type="checkbox"
                      name="candidate_check"
                      className="candidate_checkbox"
                      id={`candidate_short${i + 1}`}
                      onChange={() =>
                        handleSelectCandidate({
                          name: candidate.developer.name,
                          email: candidate.developer.email,
                          developerId: candidate.developer.id,
                        })
                      }
                    />
                    <Form.Label
                      htmlFor={`candidate_short${i + 1}`}
                      className="select_candidate_label"
                    >
                      <div className="position-relative">
                        {/* <img src={devImg} alt="Candidate" /> */}
                        <span className="checkmark-icon">
                          <IoCheckmarkOutline />
                        </span>
                      </div>
                      {candidate.developer.email}
                    </Form.Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <DndProvider backend={HTML5Backend}>
              <DocumentViewer
                handleBack={handleBack}
                selectedTemplate={selectedTemplate}
                documentOwner={documentOwner}
                selectedCandidate={selectedCandidate}
                selectedDocument={selectedDocument}
              />
              {/* <DocumentViewerWrapper
                  ref={dropRef}
                  handleBack={handleBack}
                  selectedTemplate={selectedTemplate}
                  documentOwner={documentOwner}
                  selectedCandidate={selectedCandidate}
                  selectedDocument={selectedDocument}
                /> */}
            </DndProvider>
          </div>
        </div>
      </div>
      <CustomFieldModal
        show={showcustomfield}
        handleClose={handleCloseCustomField}
      />
    </>
  );
}

export default DocumentViewerWrapper;
