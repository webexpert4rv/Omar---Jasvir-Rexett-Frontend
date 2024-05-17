import React from "react";
import { t } from "i18next";
import { Col, Form, Row } from "react-bootstrap";

const JobPostStep1 = ({ register, errors }) => {
  return (
    <div>
      <section className="job-post-section card-box">
        <Row>
          <Col md="6" className="mb-4">
            <Form.Group>
              <Form.Label>{t("jobTitle")}</Form.Label>
              <Form.Control
                type="text"
                className="common-field"
                placeholder="Enter Job Name"
                {...register("jobTitle", {
                  required: "Job title is required",
                })}
              />
            </Form.Group>
            {errors?.jobTitle && <p className="error-message">{errors?.jobTitle?.message}</p>}
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default JobPostStep1;
