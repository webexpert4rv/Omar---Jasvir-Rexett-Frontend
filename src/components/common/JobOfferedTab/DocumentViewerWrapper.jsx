import React, { forwardRef, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { IoCheckmarkOutline } from "react-icons/io5";
import CustomFieldModal from "../Modals/CustomField";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DocumentViewer from "../JobOfferedTab/DocumentViewer";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { CANDIDATE } from "../../../constent/constent";
import { useSelector } from "react-redux";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

function DocumentViewerWrapper({
  handleBack,
  documentOwner,
  selectedTemplate,
  selectedDocument,
}) {
  const [showcustomfield, setCustomField] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const dropRef = useRef(null);

  const { jobPostedData } = useSelector((state) => state.clientData);

  const candidateList =
    jobPostedData?.job?.job_applications?.interviews?.interview_completed || [];

  const handleCloseCustomField = () => {
    setCustomField(!showcustomfield);
  };

  const DocumentViewerWrapper = forwardRef((props, ref) => (
    <DocumentViewer {...props} dropRef={ref} />
  ));

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

  return (
    <>
      <div>
        <div id="fill-details">
          <h4 className="text-center">Preview Document</h4>
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
                <DocumentViewerWrapper
                  ref={dropRef}
                  handleBack={handleBack}
                  selectedTemplate={selectedTemplate}
                  documentOwner={documentOwner}
                  selectedCandidate={selectedCandidate}
                  selectedDocument={selectedDocument}
                />
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
