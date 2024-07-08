import React from "react";
import rexettLogo from "../../../assets/img/rexett-logo-white.png";
import { Col, Container, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaUser, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
const RegistrationType = ({ handleRegistrationType }) => {
  return (
    <>
      <header className="header-register">
        <Container>
          <img src={rexettLogo} />
        </Container>
      </header>
      <section className="main-register">
        <Container>
          <div>
            <Row className="justify-content-center">
              <Col md={10}>
                <Link
                  to={"/"}
                  className="font-14 text-decoration-none rounded-3 d-inline-flex align-items-center mb-2 p-0 border-0 shadow-none text-green"
                >
                  <FaArrowLeft />
                  <span className="d-inline-block ms-1">Go Back</span>
                </Link>
                <h2 className="client-main-heading text-center">
                  Are you a company or an individual?
                </h2>
                <p className="text-muted text-center mb-4">
                  Please select whether you are registering as a company or as
                  an individual.
                </p>
              </Col>
            </Row>
            <div>
              <Row className="justify-content-center">
                <Col md={5} onClick={()=>{handleRegistrationType("company")}}>
                  <input
                    type="radio"
                    className="d-none client-register-radio"
                    name="client-register"
                    id="company_client"
                  />
                  <Form.Label
                    htmlFor="company_client"
                    className="client_register_label"
                  >
                    <FaUsers />
                    <span className="d-block mt-3 mb-2">As a Company</span>
                    <span className="font-14 fw-normal text-center d-block text-dark">
                      If you are representing a business or organization, please
                      select this option. We will collect relevant details about
                      your company to ensure seamless collaboration and support.
                    </span>
                  </Form.Label>
                </Col>
                <Col md={5} onClick={()=>{handleRegistrationType("indivisual")}}>
                  <input
                    type="radio"
                    className="d-none client-register-radio"
                    name="client-register"
                    id="individual_client"
                  />
                  <Form.Label
                    htmlFor="individual_client"
                    className="client_register_label"
                  >
                    <FaUser />
                    <span className="d-block mt-3 mb-2">As an Individual</span>
                    <span className="font-14 fw-normal text-center d-block text-dark">
                      If you are signing up for personal use, please select this
                      option. We will gather the necessary information to offer
                      you personalized services and support.
                    </span>
                  </Form.Label>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default RegistrationType;
