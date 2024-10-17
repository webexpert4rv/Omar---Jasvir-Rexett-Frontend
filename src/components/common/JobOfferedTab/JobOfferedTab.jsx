import React, { useEffect, useRef, useState } from "react";
import CreateDocument from "./CreateDocument";
import ScreenLoader from "../../atomic/ScreenLoader";
import DocumentOwner from "./DocumentOwner";
import OfferTemplate from "./OfferTemplate";
import { Button } from "react-bootstrap";
import DocumentViewerWrapper from "./DocumentViewerWrapper";
import { NEW_TEMPLATE_TYPE } from "./constant/constant";
import RexettButton from "../../atomic/RexettButton";
import { pdfExporter } from "quill-to-pdf";
import {
  adobeFormInstance,
  adobeInstance,
} from "../../../services/adobe.instance";
import { getDataFromLocalStorage } from "../../../helper/utlis";
import DocumentHistory from "./DocumentHistory";
import { toast } from "react-toastify";

const JobOfferedTab = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [selectedTab, setSelectedTab] = useState("document");
  const [screenLoader, setScreenLoader] = useState(false);
  const [documentOwner, setDocumentOwner] = useState("");
  const [agreementDetails, setAgreementDetails] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [error, setError] = useState({ show: false, msg: "" });
  const [templateList, setTempList] = useState([]);
  const userId = getDataFromLocalStorage("userId");

  const editorRef = useRef(null);
  const [showCreatedDocument, setShowCreateDocument] = useState({
    show: false,
    name: "",
    newRecord: "",
  });

  // useEffect(() => {
  //   getTemplateLists();
  // }, []);

  useEffect(() => {
    if (selectedTab === "offerTemplate") getTemplateLists();
  }, [selectedTab]);

  const getTemplateLists = () => {
    setScreenLoader(true)
    adobeInstance
      .get(`api/templates/templates-user/?external_user_id=${userId}`)
      .then((res) => {
        setScreenLoader(false);
        setAgreementDetails(res.data);
        setTempList(res.data);
      })
      .catch((err) => {
        setScreenLoader(false);
        const message = err.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
      });
  };

  const handleSelectSteps = (stepValue) => {
    switch (selectedTab) {
      case "document":
        setSelectedDocument(stepValue);
        setSelectedTab("owner");
        break;

      case "owner":
        setDocumentOwner(stepValue);
        setSelectedTab("offerTemplate");
        break;

      case "offerTemplate":
        setSelectedTemplate(stepValue);
        setSelectedTab("viewDocument");
        break;
    }
  };

  const handleBack = () => {
    switch (selectedTab) {
      case "owner":
        setDocumentOwner("");
        setSelectedTab("document");
        break;

      case "offerTemplate":
        if (showCreatedDocument.show) {
          setShowCreateDocument({ show: false, name: "", newRecord: "" });
          break;
        }
        setSelectedTab("owner");
        setShowCreateDocument({ show: false, name: "", newRecord: "" });
        break;

      case "viewDocument":
        setSelectedTab("offerTemplate");
        break;
    }
  };

  const handleSaveCreatedDocument = async () => {
    const formData = new FormData();
    let fileData = null;
    let fileName = `${showCreatedDocument.name}.pdf`;
    if (showCreatedDocument.type === NEW_TEMPLATE_TYPE.upload) {
      if (!showCreatedDocument.file) {
        setError({ show: true, msg: "Please Upload The file" });
        return;
      } else {
        setError({ show: false, msg: "" });
        fileData = showCreatedDocument.file;
      }
    } else {
      const delta = editorRef.current?.editor?.getContents();
      const pdfAsBlob = await pdfExporter.generatePdf(delta);
      fileData = new Blob([pdfAsBlob], { type: "application/pdf" });
    }
    const metaData = {
      name: "",
      price: { value: 0, currency: "USD" },
      email: "",
      address: {},
      working: { type: "", value: 0 },
    };
    formData.append("ownership", documentOwner);
    formData.append("template_title", showCreatedDocument.name);
    formData.append("meta_data", JSON.stringify(metaData));
    formData.append("external_user_id", userId);
    formData.append("status", "draft");
    formData.append("editable", true);
    formData.append("template_file", fileData, fileName);
    setScreenLoader(true);
    await adobeFormInstance
      .post(
        `/api/templates/${selectedDocument.id}/template-documents/`,
        formData
      )
      .then((res) => {
        console.log(res.data, "response");
        const message = "Document created successfully";
        toast.success(message, { position: "top-center" });
        setShowCreateDocument({ show: false, name: "", newRecord: "" });
        setScreenLoader(false);
        getTemplateLists();
      })
      .catch((err) => {
        setScreenLoader(false);
      });
  };

  const handleEditDraftDoc = ({ url, owner, documentType }) => {
    setDocumentOwner(owner);
    setSelectedTemplate(url);
    setSelectedTab("viewDocument");
    setSelectedDocument(documentType);
  };

  return (
    <>
      <div>
        <div className="card-box mb-4">
          {screenLoader && <ScreenLoader />}
          {selectedTab === "document" && (
            <CreateDocument handleDocumentSelect={handleSelectSteps} />
          )}

          {selectedTab === "owner" && (
            <DocumentOwner
              handleOwnerSelect={handleSelectSteps}
              handleBack={handleBack}
            />
          )}

          {selectedTab === "offerTemplate" && (
            <>
              <OfferTemplate
                handleNext={handleSelectSteps}
                selectedDocument={selectedDocument}
                editorRef={editorRef}
                setShowCreateDocument={setShowCreateDocument}
                showCreatedDocument={showCreatedDocument}
                setTempList={setTempList}
                templateList={templateList}
                fileRequiredError={error}
              />
              {!showCreatedDocument.show && (
                <DocumentHistory
                  agreementDetails={agreementDetails}
                  handleEditDraftDoc={handleEditDraftDoc}
                  templateList={templateList}
                  setTempList={setTempList}
                />
              )}
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
          {selectedTab === "viewDocument" && (
            <>
              <DocumentViewerWrapper
                handleBack={handleBack}
                documentOwner={documentOwner}
                selectedTemplate={selectedTemplate}
                selectedDocument={selectedDocument}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default JobOfferedTab;
