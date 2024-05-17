import React from "react";
import { t } from "i18next";
import { Col, Form, Row } from "react-bootstrap";

const JobPostStep3 = ({ register, errors }) => {
  return (
    <div>
      {" "}
      <section className="job-post-section card-box">
        <Row>
          <Col md="6" className="mb-4">
            <Form.Group>
              <Form.Label>{t("email")}</Form.Label>
              <Form.Control
                type="text"
                className="common-field"
                placeholder="Enter Job Name"
                {...register("email", {
                  required: "email is required",
                })}
              />
            </Form.Group>
            {errors?.email && (
              <p className="error-message ">{errors.email?.message}</p>
            )}
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default JobPostStep3;
