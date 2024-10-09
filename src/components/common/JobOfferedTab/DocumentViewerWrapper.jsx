import React, { forwardRef, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { IoCheckmarkOutline } from "react-icons/io5";
import CustomFieldModal from "../Modals/CustomField";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DocumentViewer from "../JobOfferedTab/DocumentViewer";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { CANDIDATE } from "../../../constent/constent";
import DraggableTag from "../DragDropFeature/DraggableTag";
import {
  DRAGGABLE_TAG,
} from "../JobOfferedTab/constant/constant";
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
          {/* {editDoc ? (
            <CreateNewTemplate
              editorRef={editorRef}
              showCreatedDocument={{ type: NEW_TEMPLATE_TYPE.create }}
            />
          ) : ( */}
          <div>
            <DndProvider backend={HTML5Backend}>
              <div className="justify-content-center document-preview-wrapper">
                <div className="drag-options pe-2">
                  <div>
                    <h4>Fields</h4>
                    <div className="drag-listing">
                      {DRAGGABLE_TAG.map((drg, i) => (
                        <div key={i}>
                          <DraggableTag dragDetails={drg} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DocumentViewerWrapper
                  ref={dropRef}
                  // setItems={setItems}
                  // setTagsByPage={setTagsByPage}
                  // tagsByPage={tagsByPage}
                  // items={items}
                  // setFieldsDetails={setFieldsDetails}
                  // pdfBytes={pdfBytes}
                  // pageNumber={pageNumber}
                  // setPageNumber={setPageNumber}
                  // handleSaveEditedFile={handleSaveEditedFile}
                  handleBack={handleBack}
                  selectedTemplate={selectedTemplate}
                  documentOwner={documentOwner}
                  selectedCandidate={selectedCandidate}
                  selectedDocument={selectedDocument}
                  // editorContent={editorContent}
                />
              </div>
            </DndProvider>
            {/* <div className="text-center">
              <Button
                variant="transparent"
                className="font-14 outline-main-btn main-btn px-5 me-2"
                onClick={handleBack}
              >
                Back
              </Button>
              <RexettButton
                variant="transparent"
                text="Save"
                type="button"
                onClick={handleSaveEditedFile}
                className="font-14 main-btn px-5"
              />
              <RexettButton
                variant="transparent"
                text="Send"
                type="button"
                onClick={handleSend}
                className="font-14 main-btn px-5"
              />
            </div> */}
          </div>
          {/* )} */}
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
