import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { CANDIDATE, CLIENT } from "../../../constent/constent";
import { FaUsersLine, FaUsersViewfinder } from "react-icons/fa6";
import { Button, Col, Form, Row } from "react-bootstrap";

const DocumentOwner = ({handleOwnerSelect, handleBack}) => {
  return (
    <div id="document-ownership">
      <h4 className="text-center">Document Ownership: Client or Candidate?</h4>
      <p className="text-center mb-4">
        Is this document intended for the Client or the Candidate?
      </p>
      <div className="selection-cards">
        <Row className="justify-content-center">
          <Col md={4}>
            <div className="document-card">
              <input
                type="radio"
                className="document_select d-none"
                id="client-document"
                name="document_owner"
                value={CLIENT}
                onChange={(e)=>handleOwnerSelect(e.target.value)}
              />
              <Form.Label htmlFor="client-document" className="document_label">
                <span className="doccheck-icon">
                  <IoCheckmarkCircle />
                </span>
                <FaUsersLine />
                <span>Client</span>
              </Form.Label>
            </div>
          </Col>
          <Col md={4}>
            <div className="document-card">
              <input
                type="radio"
                className="document_select d-none"
                id="candidate-document"
                name="document_owner"
                value={CANDIDATE}
                onChange={(e)=>handleOwnerSelect(e.target.value)}
              />
              <Form.Label
                htmlFor="candidate-document"
                className="document_label"
              >
                <span className="doccheck-icon">
                  <IoCheckmarkCircle />
                </span>
                <FaUsersViewfinder />
                <span>Candidate</span>
              </Form.Label>
            </div>
          </Col>
        </Row>
      </div>
      <div className="text-center">
        <Button
          variant="transparent"
          className="font-14 main-btn px-5"
          onClick={handleBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DocumentOwner;
