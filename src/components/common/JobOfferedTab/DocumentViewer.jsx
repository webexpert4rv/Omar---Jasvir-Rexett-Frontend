import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import DocumentFieldModal from "../Modals/DocumentFieldModal";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import {
  ADOBE_BASE_URL,
  DRAGGABLE_TAG,
  PDF_SIGNER_ROLE,
} from "../JobOfferedTab/constant/constant";
import "./style.css";
import RexettButton from "../../atomic/RexettButton";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  adobeFormInstance,
  adobeInstance,
} from "../../../services/adobe.instance";
import ScreenLoader from "../../atomic/ScreenLoader";
import { CANDIDATE, CLIENT } from "../../../constent/constent";
import { useSelector } from "react-redux";
import { getDataFromLocalStorage } from "../../../helper/utlis";
import DraggableTag from "../DragDropFeature/DraggableTag";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DraggableItem = ({ item, index, handleDelete }) => {
  const [, drag] = useDrag(() => ({
    type: "ITEM",
    item: { index },
  }));

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        top: item.y,
        left: item.x,

        backgroundColor: "lightgray",
        borderRadius: "3px",
        cursor: "move",
      }}
    >
      {item.tag} X: {item.x}, Y: {item.y}
      <button onClick={() => handleDelete(index)}>delete</button>
    </div>
  );
};

const DocumentViewer = ({
  handleBack,
  documentOwner,
  selectedTemplate,
  selectedCandidate,
  selectedDocument,
}) => {
  const [showDocumentFieldDrop, setSowDocumentFieldDrop] = useState({
    show: false,
    tagDetails: {},
  });
  const [numPages, setNumPages] = useState(null);
  const [items, setItems] = useState([]);
  const [tagsByPage, setTagsByPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [editorContent, setEditorContent] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [screenLoader, setScreenLoader] = useState(true);
  const [pdfHeight, setPdfHeight] = useState();
  const dropRef = useRef(null);
  const dragRef = useRef(null);

  const { jobPostedData } = useSelector((state) => state.clientData);
  const userId = getDataFromLocalStorage("userId");

  useEffect(() => {
    if (!editorContent) {
      const url = ADOBE_BASE_URL + selectedTemplate.template_file;
      const fetchPdf = async () => {
        const response = await fetch(url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        setEditorContent(arrayBuffer);
        setPdfBytes(url);
        setScreenLoader(false);
      };
      fetchPdf();
    }
  }, []);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["TAG", "ITEM"],
    drop: async (item, monitor) => {
      const dropRect = dropRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      const x = clientOffset.x - dropRect.left;
      const y = clientOffset.y - dropRect.top;
      if (item.tag) {
        setItems((prevItems) => [...prevItems, { x: x, y: y, ...item }]);
        // Need for feature use if want to add the condition to show the modal on drop
        // if (item.tag !== "name" && item.tag !== "email") {
        setSowDocumentFieldDrop((prev) => ({
          show: true,
          tagDetails: { ...item, x: x, y: y },
        }));
        // }
      } else if (item.index !== undefined) {
        setItems((prevItems) => {
          const updatedItems = prevItems.map((prevItem, idx) =>
            idx === item.index ? { ...prevItem, x, y } : prevItem
          );
          return updatedItems;
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleDelete = (index) => {
    const tempItems = [...items];
    tempItems.splice(index, 1);
    setItems(tempItems);
  };

  const handleSubmitSubTag = (tagData) => {
    const index = items.findIndex(
      (itm) => itm.x === tagData.tagDetails.x && itm.y === tagData.tagDetails.y
    );
    const tempItem = [...items];
    if (tagData.Price) {
      tempItem[index].value = `${tagData.Price}$ ${tagData.Price}`;
    } else if (tagData.Address) {
      tempItem[index].value = tagData.Address;
    } else if (tagData.name || tagData.email) {
      tempItem[index].value = tagData.name || tagData.email;
    } else {
      tempItem[
        index
      ].value = `${tagData["Working Duration"]}$ ${tagData["Working Type"]}`;
    }
    setSowDocumentFieldDrop({ show: false, tagDetails: {} });
  };

  const handleSend = async () => {
    if (selectedCandidate.length === 0 && documentOwner !== CLIENT) {
      const message = "Please select the candidate first";
      toast.error(message, { position: "top-center" });
      return;
    }
    setScreenLoader(true);
    let payload = {};
    if (documentOwner === CLIENT) {
      const recipientsDetails = {
        name: jobPostedData?.job?.client?.name || null,
        email: jobPostedData?.job?.client?.email || null,
        role: PDF_SIGNER_ROLE.signer,
      };

      payload = {
        ownership: CLIENT,
        recipients: [{ ...recipientsDetails }],
      };
    } else {
      payload = {
        ownership: CANDIDATE,
        recipients: selectedCandidate,
      };
    }

    adobeInstance
      .post(
        `api/templates/templates/${selectedTemplate.id}/recipients/`,
        payload
      )
      .then(async (res) => {
        try {
          await adobeInstance.get(
            `api/templates/${selectedTemplate.id}/send-for-e-sign`
          );
          setScreenLoader(false);
          toast.success("Document is sended for signature");
          handleBack();
        } catch (error) {
          setScreenLoader(false);
          const message = error.message || "Something went wrong";
          toast.error(message, { position: "top-center" });
        }
      })
      .catch((err) => {
        const message = err.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
        setScreenLoader(false);
      });

    // const blob = new Blob([editorContent], { type: "application/pdf" });

    // Create a link element
    // const link = document.createElement("a");
    // link.href = window.URL.createObjectURL(blob);
    // link.download = "modified.pdf"; // Specify the file name

    // // Append the link to the body
    // document.body.appendChild(link);

    // // Programmatically click the link to trigger the download
    // link.click();

    // // Clean up and remove the link element
    // document.body.removeChild(link);
  };

  // const modifyPdf = async () => {
  //   if (!pdfData) return;

  //   // Load the PDF using pdf-lib
  //   const pdfDoc = await PDFDocument.load(pdfData);
  //   const pages = pdfDoc.getPages();

  //   if (currentPage - 1 < pages.length) {
  //     const page = pages[currentPage - 1]; // Get the current page

  //     // Embed font and add text
  //     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  //     page.drawText(`Text added on page ${currentPage}`, {
  //       x: 50,
  //       y: 700,
  //       size: 20,
  //       font,
  //       color: rgb(0, 0.53, 0.71), // Blue text color
  //     });

  //     // Save the modified PDF
  //     const modifiedPdfBytes = await pdfDoc.save();
  //     setModifiedPdfData(modifiedPdfBytes); // Store modified PDF bytes
  //   }
  // };
  const handleNext = async () => {
    handleTagsOnPageChange(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  const handlePrevious = () => {
    handleTagsOnPageChange(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  };
  const handleTagsOnPageChange = (page) => {
    if (items.length > 0) {
      let tempTags = [...tagsByPage];
      const index = tempTags.findIndex((itm) => itm.page === pageNumber);
      if (index === -1) {
        tempTags = [
          ...tempTags,
          {
            page: pageNumber,
            tags: [...items],
          },
        ];
      } else {
        tempTags[index] = {
          ...tempTags[index],
          tags: [...items],
        };
      }
      setTagsByPage(tempTags);
    }
    if (tagsByPage.length > 0) {
      const index = tagsByPage.findIndex((itm) => itm.page === page);
      if (index != -1) setItems(() => tagsByPage[index].tags);
      else setItems([]);
    } else setItems([]);
  };

  const handleSaveEditedFile = async () => {
    if (items.length > 0) {
      try {
        const pdfDoc = await PDFDocument.load(editorContent);
        const pages = pdfDoc.getPages();
        const editedPage = pages[pageNumber - 1];
        const { width, height } = editedPage.getSize();
        for (const item of items) {
          editedPage.drawText(`{{${item.tag}}}`, {
            x: item.x,
            y: height - item.y - item.fontSize - 0.3,
            size: item.fontSize - 0.3,
          });
        }

        const contentBytes = await pdfDoc.save();
        setEditorContent(contentBytes);
        const blob = new Blob([contentBytes], { type: "application/pdf" });
        const formData = new FormData();
        const tempTags = items.reduce((acc, item) => {
          acc[item.tag.toLowerCase()] = item.value;
          return acc;
        }, {});
        formData.append("template_title", selectedTemplate.template_title);
        formData.append("meta_data", JSON.stringify(tempTags));
        formData.append("template_file", blob, selectedTemplate.template_file);
        let createUpdateFile = null;
        if (selectedTemplate.external_user_id) {
          // Send the updated PDF to the API
          createUpdateFile = adobeFormInstance.put(
            `/api/templates/template-documents/${selectedTemplate.id}/`,
            formData
          );
        } else {
          // If the template is default create the updated PDF
          formData.append("ownership", documentOwner);
          formData.append("external_user_id", userId);
          formData.append("status", "draft");
          formData.append("editable", true);
          createUpdateFile = adobeFormInstance.post(
            `/api/templates/${selectedDocument.id}/template-documents/`,
            formData
          );
        }

        // / Create a link element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "modified.pdf"; // Specify the file name

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up and remove the link element
        document.body.removeChild(link);
        // createUpdateFile
        //   .then((res) => {
        //     setScreenLoader(false);
        //     const message = "Document updated successfully";
        //     toast.success(message, { position: "top-center" });
        //   })
        //   .catch((err) => {
        //     setScreenLoader(false);
        //     const message = err.message || "Something went wrong";
        //     toast.error(message, { position: "top-center" });
        //   });
      } catch (error) {
        setScreenLoader(false);
        const message = error.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
      }
    }
  };

  const renderCustomElements = useMemo(() => {
    return items?.map((ele, idx) => {
      return (
        <DraggableItem
          key={idx}
          item={ele}
          index={idx}
          handleDelete={handleDelete}
        />
      );
    });
  }, [items, pageNumber]);
  return (
    <>
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
        <div className="preview-document">
          <div className="docs-container">
            {screenLoader ? (
              <ScreenLoader />
            ) : (
              <div>
                <Document
                  file={pdfBytes}
                  // file={URL.createObjectURL(new Blob([pdfBytes]))}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <div
                    className="position-relative"
                    ref={(node) => {
                      drop(node);
                      dropRef.current = node;
                    }}
                    style={{
                      minHeight: "700px",
                      height: "100%",
                      position: "relative",
                      width: "612px"
                    }}
                  >
                    <Page
                      pageNumber={pageNumber}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      customTextRenderer={false}
                      className="border-bottom custom-pdf"
                    />
                    {renderCustomElements}
                  </div>
                </Document>
                <p className="text-center fw-medium mt-2">
                  Page {pageNumber} of {numPages}
                </p>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <button
                    disabled={pageNumber <= 1}
                    className="doc-action-btn"
                    onClick={() => handlePrevious()}
                  >
                    Previous Page
                  </button>
                  <button
                    disabled={pageNumber >= numPages}
                    className="doc-action-btn"
                    onClick={() => handleNext()}
                  >
                    Next Page
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <Button
            variant="transparent"
            className="font-14 outline-main-btn main-btn px-5 mb-2"
            onClick={handleBack}
          >
            Back
          </Button>
          <RexettButton
            variant="transparent"
            text="Save123"
            type="button"
            // disabled={items.length === 0}
            onClick={handleSaveEditedFile}
            className="font-14 main-btn px-5 mb-2"
          />
          <RexettButton
            variant="transparent"
            text="Send"
            type="button"
            // disabled={items.length === 0}
            onClick={handleSend}
            className="font-14 main-btn px-5"
          />
        </div>
      </div>
      {showDocumentFieldDrop.show && (
        <DocumentFieldModal
          show={showDocumentFieldDrop.show}
          handleClose={() =>
            setSowDocumentFieldDrop({ show: false, tagDetails: {} })
          }
          tagDetails={showDocumentFieldDrop.tagDetails}
          onSubmit={handleSubmitSubTag}
        />
      )}
    </>
  );
};

export default DocumentViewer;
