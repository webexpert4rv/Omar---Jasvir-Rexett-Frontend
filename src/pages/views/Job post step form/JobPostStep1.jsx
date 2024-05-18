import React from "react";
import { t } from "i18next";
import { Col, Form, OverlayTrigger, Tooltip, Row } from "react-bootstrap";
import { BsQuestionCircleFill } from "react-icons/bs";
import companyLogo from '../../../assets/img/aviox-logo.png'

const JobPostStep1 = ({ register, errors }) => {
  const jobTitleTooltip = (

    <Tooltip id="tooltip">
      Make your job, more discoverable to job seekers by entering your job title.
    </Tooltip>
  );
  const jobLocationTooltip = (

    <Tooltip id="tooltip">
      Picking a specific city or metro area can make your on-site job more discoverable by job seekers in those area.
    </Tooltip>
  );
  return (
    <div>
      <section className="job-post-section">
        <Row>
          <Col md="12" className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label className="d-flex gap-2 align-items-center">{t("jobTitle")}
                <OverlayTrigger placement="bottom" overlay={jobTitleTooltip}>
                  <span>
                    <BsQuestionCircleFill />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                className="common-field font-14"
                placeholder="Enter Job Name"
                {...register("jobTitle", {
                  required: "Job title is required",
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <p className="common-field font-14 d-flex align-items-center gap-2">
                <img src={companyLogo} className="company-imgbx" /> Aviox Technologies Pvt Ltd
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Workplace type</Form.Label>
              <Form.Select className="common-field font-14">
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
                <option value="on-site">On Site</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex gap-2 align-items-center">Job Location

                <OverlayTrigger placement="bottom" overlay={jobLocationTooltip}>
                  <span>
                    <BsQuestionCircleFill />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                className="common-field font-14"
                placeholder="Enter Job Location"
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Select className="common-field font-14">
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
              </Form.Select>
            </Form.Group>
            {errors?.jobTitle && <p className="error-message">{errors?.jobTitle?.message}</p>}
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default JobPostStep1;
