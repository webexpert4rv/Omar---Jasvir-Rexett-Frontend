import React from "react";
import errorImg from "../../assets/img/404 error.png";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const role = localStorage.getItem("role");
  const getCurrentRole = (currentRole) => {
    let obj = {
      developer: "developer/dashboard",
      admin: "admin/admin-dashboard",
      client: "client/dashboard",
    };

    return obj[currentRole];
  };
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(getCurrentRole(role));
  };
  return (
    <>
      <section className="not-found">
        <Container>
          <Row className="align-items-center flex-md-row flex-column-reverse">
            <Col lg={6}>
              <div>
                <img src={errorImg} />
              </div>
            </Col>
            <Col lg={5}>
              <div className="text-center">
                <h1 className="heading-404">404</h1>
                <h5 className="sub-heading-404">The Page Is Not Found</h5>
                <h5 className="para404-page">
                  The Page you are looking for may have been
                  moved,deleted&nbsp;or possible never existed.
                </h5>
                <a className="main-btn" onClick={handleRedirect}>
                  <span className="backto-home-btn">Back to Home</span>
                </a>
              </div>
            </Col>
            <Col lg={1}> </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default NotFound;
