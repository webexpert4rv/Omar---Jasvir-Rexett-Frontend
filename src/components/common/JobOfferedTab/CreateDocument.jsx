import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IoCheckmarkCircle } from "react-icons/io5";
import sowIcon from "../../../assets/img/sow-icon.png";
import ndaIcon from "../../../assets/img/nda-icon.png";
import { adobeInstance } from "../../../services/adobe.instance";
import { toast } from "react-toastify";
import ScreenLoader from "../../atomic/ScreenLoader";

const CreateDocument = ({ handleDocumentSelect, selectedDocument }) => {
  const [screenLoader, setScreenLoader] = useState(true);
  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    adobeInstance
      .get("api/templates/categories/")
      .then((res) => {
        console.log(res.data, "response !!!");
        setScreenLoader(false);
        setDocumentList(res.data);
      })
      .catch((err) => {
        setScreenLoader(false);
        const message = err.message || "Something went wrong";
        toast.error(message, { position: "top-center" });
        console.log(err, "error !!!");
      });
  }, []);

  return (
    <div>
      <h4 className="text-center">Select Document</h4>
      <p className="text-center mb-4">Select document you want to create</p>
      {screenLoader ? (
        <ScreenLoader />
      ) : (
        <div className="selection-cards">
          <Row className="justify-content-center">
            {documentList.length > 0 &&
              documentList.map((doc) => (
                <Col md={4} key={doc.id}>
                  <div className="document-card">
                    <input
                      type="radio"
                      className="document_select d-none"
                      id={`${
                        doc.category_title === "SOW"
                          ? "sow-document"
                          : "nda-document"
                      }`}
                      name="document_select"
                      value={doc.category_title}
                      onChange={() => handleDocumentSelect(doc)}
                    />
                    <Form.Label
                      htmlFor={doc.category_title === "SOW"
                        ? "sow-document"
                        : "nda-document"}
                      className="document_label"
                    >
                      <span className="doccheck-icon">
                        <IoCheckmarkCircle />
                      </span>
                      <img
                        src={doc.category_title === "SOW" ? sowIcon : ndaIcon}
                        alt="SOW Icon"
                      />
                      <span>
                        {doc.category_title === "SOW"
                          ? "Statement of work"
                          : "Non Disclosure Agreement"}
                      </span>
                    </Form.Label>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default CreateDocument;
