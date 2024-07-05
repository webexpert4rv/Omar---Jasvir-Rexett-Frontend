import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import rexettLogo from "../../../assets/img/rexett-logo-white.png";
import {
  FaArrowLeft,
  FaCheck,
  FaChevronDown,
  FaFilter,
  FaPencil,
  FaPlus,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  IoAddCircle,
  IoAddOutline,
  IoCheckmark,
  IoTrash,
} from "react-icons/io5";
import ReactQuill from "react-quill";
const JobDescription = () => {
  const [valuedescr, setValueDescr] = useState("");
  const handleChange = (value) => {
    setValueDescr(value);
  };
  return (
    <>
      <section className="resume-section-wrapper">
        <div className="resume-sidebar">
          <div className="resume-sidelogo mb-4">
            <img src={rexettLogo} />
          </div>
          <div>
            <ul>
              <li className="active-step">
                <span className="resume-count">
                  <span className="resume-step">1</span>
                  <span className="resume-check">
                    <FaCheck />
                  </span>
                </span>
                <span>Personal</span>
              </li>
              <li className="active-step">
                <span className="resume-count">
                  <span className="resume-step">3</span>
                  <span className="resume-check">
                    <FaCheck />
                  </span>
                </span>
                <span>Job Info</span>
              </li>
              <li>
                <span className="resume-count">
                  <span className="resume-step">4</span>
                  <span className="resume-check">
                    <FaCheck />
                  </span>
                </span>
                <span>Job Description</span>
              </li>
              <li>
                <span className="resume-count">
                  <span className="resume-step">5</span>
                  <span className="resume-check">
                    <FaCheck />
                  </span>
                </span>
                <span>Screening info</span>
              </li>
            </ul>
          </div>
          <h4 className="resume-sideheading mt-3">Resume Completeness:</h4>
          <div className="resume-progress-wrapper">
            <div className="resume-progressbx">
              <div></div>
            </div>
            <span className="resume-progress-status font-12 fw-medium">
              33%
            </span>
          </div>
        </div>
        <div className="resume-main-wrapper">
          <Container>
            <div>
              <Link className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium">
                <FaArrowLeft /> Go Back
              </Link>
              <div>
                <Row>
                  <Col md={12}>
                    <div>
                      <h2 className="resume-heading">
                        Briefly tell us about your job
                      </h2>
                      <p>
                        Choose from our pre-written skils below or write your
                        own.
                      </p>
                    </div>
                    <div>
                      <Row>
                        <Col md={12}>
                          <Form.Label className="font-14 fw-medium">
                            Job Description
                          </Form.Label>
                          <div id="custom-ck">
                            <ReactQuill
                              value={valuedescr}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <p className="font-14 mt-3 fw-semibold">
                              Add Skills
                            </p>
                          </div>
                        </Col>

                        <Col md={6}>
                          <div>
                            <div className="recommended-desc">
                              <div className="d-flex align-items-center gap-3">
                                <Button
                                  variant="transparent"
                                  className="arrow-btn primary-arrow shadow-none"
                                >
                                  <IoAddOutline />
                                </Button>
                                <div>
                                  <p className="font-14 fw-medium mb-1">
                                    Expert Recommended
                                  </p>
                                  <p className="font-14 mb-0">HTML</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center gap-3">
                                <Button
                                  variant="transparent"
                                  className="arrow-btn primary-arrow shadow-none"
                                >
                                  <IoAddOutline />
                                </Button>
                                <div>
                                  <p className="font-14 fw-medium mb-1">
                                    Expert Recommended
                                  </p>
                                  <p className="font-14 mb-0">CSS</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center gap-3">
                                <Button
                                  variant="transparent"
                                  className="arrow-btn primary-arrow shadow-none"
                                >
                                  <IoAddOutline />
                                </Button>
                                <div>
                                  <p className="font-14 fw-medium mb-1">
                                    Expert Recommended
                                  </p>
                                  <p className="font-14 mb-0">JavaScript</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center gap-3">
                                <Button
                                  variant="transparent"
                                  className="arrow-btn primary-arrow shadow-none"
                                >
                                  <IoAddOutline />
                                </Button>
                                <div>
                                  <p className="font-14 mb-0">
                                    Front End Developers
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center gap-3">
                                <Button
                                  variant="transparent"
                                  className="arrow-btn primary-arrow shadow-none"
                                >
                                  <IoAddOutline />
                                </Button>
                                <div>
                                  <p className="font-14 mb-0">
                                    Website optimization
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center gap-3">
                                <Button
                                  variant="transparent"
                                  className="arrow-btn primary-arrow shadow-none"
                                >
                                  <IoAddOutline />
                                </Button>
                                <div>
                                  <p className="font-14 mb-0">Programming</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <div className="w-100">
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Skill"
                                  className="common-field font-14"
                                />
                              </div>
                              <div className="w-100">
                                <Form.Select className="common-field font-14">
                                  <option>Select level</option>
                                  <option value="beginner">Beginner</option>
                                  <option value="intermediate">
                                    Intermediate
                                  </option>
                                  <option value="expert">Expert</option>
                                </Form.Select>
                              </div>
                              <Button
                                variant="transparent"
                                className="text-green font-24 p-0 shadow-none border-0"
                              >
                                <IoAddCircle />
                              </Button>
                              <Button
                                variant="transparent"
                                className="text-danger font-24 p-0 shadow-none border-0"
                              >
                                <IoTrash />
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div></div>
                <div>
                  <Link
                    to={"/screening-info"}
                    variant="transparent"
                    className="main-btn font-14 text-decoration-none"
                  >
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
};
export default JobDescription;
