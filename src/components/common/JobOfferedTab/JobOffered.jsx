import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Tooltip,
} from "react-bootstrap";
import { IoCheckmarkOutline } from "react-icons/io5";
import devImg from "../../../assets/img/demo-img.jpg";
import OfferTemplate from "./OfferTemplate";
import CreateDocument from "./CreateDocument";
import DocumentOwner from "./DocumentOwner";
import DocumentViewerWrapper from "./DocumentViewerWrapper";
import { adobeFormInstance, adobeInstance } from "../../../services/adobe.instance";
import { toast } from "react-toastify";
import DocumentHistory from "./DocumentHistory";
import { pdfExporter } from "quill-to-pdf";
import RexettButton from "../../atomic/RexettButton";
import { getDataFromLocalStorage } from "../../../helper/utlis";
import ScreenLoader from "../../atomic/ScreenLoader";

const JobOffered = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [documentOwner, setDocumentOwner] = useState("");
  const [isNewStepCompleted, setIsNewStepCompleted] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [detailsFilled, setDetailsFilled] = useState(false);
  const [documentSaved, setDocumentSaved] = useState(false);
  const [userAgreement, setUserAgreement] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);
  const [agreementDetails, setAgreementDetails] = useState([]);
  const [createDocumentButton, setCreateDocumentButton] = useState(false);
  const [showCreatedDocument, setShowCreateDocument] = useState({
    show: false,
    name: "",
  });
  const [error, setError] = useState({ show: false, msg: "" });
  const viewPage = <Tooltip>View</Tooltip>;
  const editPage = <Tooltip>Proceed</Tooltip>;
  const editorRef = useRef(null);

  const userId = getDataFromLocalStorage("userId");

  useEffect(() => {
    // getFetcheddATA()
    getTemplateList();
  }, []);

  const getTemplateList = ()=>{
    adobeInstance
      .get(`api/templates/templates-user/?external_user_id=${userId}`)
      .then((res) => {
        setUserAgreement(res.data);
        console.log(res.data, "response !!!");
        setScreenLoader(false);
        setAgreementDetails(res.data);
        const notEditableDocument = res.data.filter((data)=> !data.editable)
        if (notEditableDocument !== 0) {
          setCreateDocumentButton(true);
        }
      })
      .catch((err) => {
        setScreenLoader(false);
        const message = err.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
        console.log(err, "error !!!");
      });
  }

  const handleDocumentSelect = (doc) => {
    setSelectedDocument(doc);
    setDocumentOwner(null);
    setDetailsFilled(false);
    setDocumentSaved(false);
  };
  const handleOwnerSelect = (e) => {
    setDocumentOwner(e);
    setDetailsFilled(false);
    setDocumentSaved(false);
  };

  const handleNext = (details) => {
    setIsNewStepCompleted(true);
    setSelectedTemplate(details);
  };

  const handleSave = () => {
    setDetailsFilled(true);
    setDocumentSaved(true);
  };

  const handleBack = () => {
    if (documentSaved) {
      setDetailsFilled(false);
      setDocumentSaved(false);
    } else if (detailsFilled) {
      setDocumentOwner("");
      setDetailsFilled(false);
    } else if (documentOwner && isNewStepCompleted) {
      // setSelectedDocument("");
      // setDocumentOwner("");
      setIsNewStepCompleted(false);
    } else if (documentOwner && !isNewStepCompleted) {
      setDocumentOwner("");
    } else {
      setSelectedDocument("");
    }
    setShowCreateDocument({
      show: false,
      name: "",
    });
  };

  const handleSubmit = () => {
    setSelectedDocument("");
    setDocumentOwner("");
    setDetailsFilled(false);
    setDocumentSaved(false);
  };

  const handleEditDraftDoc = ({ url, owner, documentType }) => {
    console.log("calling the function123", owner, url);
    setIsNewStepCompleted(true);
    setDocumentOwner(owner);
    setSelectedTemplate(url);
    setDocumentSaved(false);
    setSelectedDocument(documentType);
    setCreateDocumentButton(true);
  };

  const handleSaveCreatedDocument = async () => {
    console.log(selectedDocument, "agreementDetailsagreementDetails",documentOwner);
    if(showCreatedDocument.type === "upload") {
      if(!showCreatedDocument.file) {
        setError({show: true, msg:"Please Upload The file"})
      } else {
        setError({show: false, msg:""})
      }
    }
    const delta = editorRef.current?.editor?.getContents();
    const pdfAsBlob = await pdfExporter.generatePdf(delta);
    const pdfBlob = new Blob([pdfAsBlob], { type: 'application/pdf' });
    console.log(pdfBlob, "pdfAsBlob", showCreatedDocument);
    // saveAs(pdfAsBlob, "pdf-export.pdf");

    const formData = new FormData();
    const metaData = {
      name: "",
      price: { value: 0, currency: "USD" },
      email: "",
      address: {},
      working: { type: "", value: 0 },
    };
    const pdfName = `${showCreatedDocument.name}.pdf`;
    formData.append("ownership", documentOwner);
    formData.append("template_title", showCreatedDocument.name);
    formData.append("meta_data", JSON.stringify(metaData));
    formData.append("external_user_id", userId);
    formData.append("status", "draft");
    formData.append("editable", true);
    formData.append("template_file", pdfBlob, pdfName);
    setScreenLoader(true);
    await adobeFormInstance
      .post(
        `/api/templates/${selectedDocument.id}/template-documents/`,
        formData
      )
      .then((res) => {
        setScreenLoader(false);
        setShowCreateDocument(false);
      })
      .catch((err) => {
        setScreenLoader(false);
      });
  };

  return (
    <div>
      {screenLoader && <ScreenLoader />}
      <div className="text-end mb-4">
        {!createDocumentButton ? (
          <Button
            variant="transparent"
            className="font-14 main-btn"
            onClick={() => setCreateDocumentButton(true)}
          >
            Create Document
          </Button>
        ) : (
          <Button
            variant="transparent"
            className="font-14 main-btn"
            onClick={() => setCreateDocumentButton(false)}
          >
            Hide Create Document
          </Button>
        )}
      </div>
      {/* {createDocumentButton ? ( */}
        <div className="card-box mb-4">
          {!selectedDocument && (
            <CreateDocument handleDocumentSelect={handleDocumentSelect} />
          )}

          {selectedDocument && !documentOwner && (
            <DocumentOwner
              handleOwnerSelect={handleOwnerSelect}
              handleBack={handleBack}
            />
          )}

          {documentOwner && !isNewStepCompleted && (
            <>
              <OfferTemplate
                handleNext={handleNext}
                selectedDocument={selectedDocument}
                editorRef={editorRef}
                setShowCreateDocument={setShowCreateDocument}
                showCreatedDocument={showCreatedDocument}
                templateList={ agreementDetails }
              />
              <div className="text-center mt-4">
                <Button
                  variant="transparent"
                  className="font-14 outline-main-btn main-btn px-5 me-2"
                  onClick={handleBack}
                >
                  Back
                </Button>
                {showCreatedDocument.show && (
                  <RexettButton
                    variant="transparent"
                    text="Save"
                    type="button"
                    onClick={handleSaveCreatedDocument}
                    className="font-14 main-btn px-5"
                  />
                )}
              </div>
            </>
          )}

          {isNewStepCompleted && documentSaved && (
            <div id="preview-document">
              <h4 className="text-center mb-4">Preview Document</h4>
              <div className="text-center">
                <Button
                  variant="transparent"
                  className="font-14 main-btn px-5"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="transparent"
                  className="font-14 main-btn px-5"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {isNewStepCompleted &&
            selectedDocument === "NDA" &&
            documentOwner === "Candidate" &&
            !documentSaved && (
              <div id="select-candidates">
                <h4 className="text-center">Select Candidates</h4>
                <p className="text-center mb-4">
                  Please select candidate for non disclosure agreement. You can
                  select multiple candidates
                </p>
                <div>
                  <Row className="justify-content-center">
                    <Col md={12}>
                      <div>
                        {[...Array(6)].map((_, i) => (
                          <div className="d-inline-block me-3" key={i}>
                            <input
                              type="checkbox"
                              name="candidate_check"
                              className="candidate_checkbox"
                              id={`candidate_short${i + 1}`}
                            />
                            <Form.Label
                              htmlFor={`candidate_short${i + 1}`}
                              className="select_candidate_label"
                            >
                              <div className="position-relative">
                                <img src={devImg} alt="Candidate" />
                                <span className="checkmark-icon">
                                  <IoCheckmarkOutline />
                                </span>
                              </div>
                              johndoe@gmail.com
                            </Form.Label>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      variant="transparent"
                      className="font-14 main-btn px-5"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="transparent"
                      className="font-14 outline-main-btn px-5"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            )}

          {isNewStepCompleted &&
            documentOwner &&
            selectedDocument !== "NDA" &&
            !documentSaved && (
              <DocumentViewerWrapper
                handleBack={handleBack}
                handleSave={handleSave}
                documentOwner={documentOwner}
                selectedTemplate={selectedTemplate}
              />
            )}

          {isNewStepCompleted &&
            selectedDocument === "NDA" &&
            documentOwner === "Client" &&
            documentSaved && (
              <div id="preview-document">
                <h4 className="text-center mb-4">Preview Document</h4>
                <div className="text-center">
                  <Button
                    variant="transparent"
                    className="font-14 main-btn px-5"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="transparent"
                    className="font-14 main-btn px-5"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
        </div>
      {/* ) : ( */}
        <DocumentHistory
          agreementDetails={agreementDetails}
          handleEditDraftDoc={handleEditDraftDoc}
        />
       {/* )} */}
    </div>
  );
};

export default JobOffered;
