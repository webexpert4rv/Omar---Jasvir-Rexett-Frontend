import React from "react";
import { t } from "i18next";
import { Col, Form, Row, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

const JobPostStep3 = ({ register, errors }) => {
  return (
    <div>
      {" "}
      <section className="job-post-section">
        <h4 className="section-head font-18 border-0 mb-1 pb-0">Screening questions</h4>
        <p className="font-14">We recommend adding 3 or more questions.</p>
        <div className="screening-wrapper mb-3">
          <div className="d-flex justify-content-between align-items-center screen-wrapper-heading">
            <h3 className="mb-0">Have you completed the following level of education: [Degree]</h3>
            <Button variant="transparent" className="border-0 p-0"><IoClose /></Button>
          </div>
          <Row className="align-items-end screening-grid">
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Degree</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Job Name"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Ideal answer</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Anwser"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
            <Col md="4" className="pb-md-2">
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  className="font-14 job-post-checkbox"
                  id="must1"
                  label="Must have qualification"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
          </Row>
        </div>
        <div className="screening-wrapper mb-4">
          <div className="d-flex justify-content-between align-items-center screen-wrapper-heading">
            <h3 className="mb-0">Have many years of work experience do you have with [Skill]?</h3>
            <Button variant="transparent" className="border-0 p-0"><IoClose /></Button>
          </div>
          <Row className="align-items-end screening-grid">
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Skill</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Job Name"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Ideal answer (minimum)</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Anwser"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
            <Col md="4" className="pb-md-2">
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  className="font-14 job-post-checkbox"
                  id="must2"
                  label="Must have qualification"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
          </Row>
        </div>
        <p className="font-14 mb-2">Add screening questions:</p>
        <div className="mb-3">
          <Button variant="transparent" className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"><FiPlus/> Onsite Work</Button>
          <Button variant="transparent" className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer" disabled><FiCheck/> Education</Button>
          <Button variant="transparent" className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"><FiPlus/> Language</Button>
          <Button variant="transparent" className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"><FiPlus/> Work Experience</Button>
          <Button variant="transparent" className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"><FiPlus/> Location</Button>
          <Button variant="transparent" className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"><FiPlus/> Remote Work</Button>
          <Button variant="transparent" className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer" disabled><FiCheck/> Expertise with Skill</Button>
        </div>
        <h4 className="section-head font-18 border-0 pb-0 mb-2">Qualification Settings</h4>
        
        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            className="font-14 job-post-checkbox"
            id="filter-check"
            label="Filter out and send rejections to applicants who don't meet any must have qualifications."
          />
        </Form.Group>
      </section>
    </div>
  );
};

export default JobPostStep3;
