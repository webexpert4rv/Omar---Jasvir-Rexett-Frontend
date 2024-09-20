import React, { useState } from "react";
import {
  Button,
  Collapse,
  OverlayTrigger,
  Tab,
  Tooltip,
} from "react-bootstrap";
import { FaLinkedinIn } from "react-icons/fa6";
import userImage from "../../assets/img/user-img.jpg";
import associateLogo from "../../assets/img/aviox-logo.png";
import DeveloperCard from "./DeveloperCard";

const SingleProject = ({ projectName, developerData }) => {
  const [open, setOpen] = useState(false);
  const companyname = (
    <Tooltip id="tooltip">Aviox Technologies Pvt Ltd</Tooltip>
  );
  const downloadinvoice = <Tooltip id="tooltip">Download Invoice</Tooltip>;

  return (
    <>
    {/* <Tab.Pane eventKey="projects"> */}
        <div className="mb-4">
          <div
            className="heading-box mb-3 d-flex justify-content-between align-items-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <h3 className="mb-0">{projectName}</h3>
            <Button className="main-btn white-btn font-14 p-0">
              See  Developer 
              {/* <span className="number-count-light">7</span> */}
            </Button>
          </div>
          <Collapse in={open}>
            <div className="developers-list" id="figma-to-ui-projects">
              <DeveloperCard data={developerData} />
              {/* <div className="developer-card">
            <div className="user-imgbx">
              <img src={userImage} className="user-img" />
            </div>
            <div className="text-center">
              <h3 className="user-name">Sandeep</h3>
              <p className="designation-user">Web Developers</p>
              <p className="email-user">dev@rexett.com</p>
              <p className="associate-text font-14 mt-2 mb-2">
                <span className="associate mb-1">Associated with</span>{" "}
                <OverlayTrigger placement="bottom" overlay={companyname}>
                  <span className="white-nowrap">
                    <img src={associateLogo} className="me-2" /> Aviox
                    Technologies Pvt Ltd
                  </span>
                </OverlayTrigger>
              </p>
              <ul className="social-icons">
                <li>
                  <a href="">
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
            </div>
          </Collapse>
        </div>

    {/* </Tab.Pane> */}

      {/* <div className="mb-4">
      <div
        className="heading-box mb-3 d-flex justify-content-between align-items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="mb-0">AI Chatbot Project</h3>
        <Button className="main-btn white-btn font-14 p-0">
          See All Developers <span className="number-count-light">7</span>
        </Button>
      </div>
      <Collapse in={open}>
        <div className="developers-list" id="figma-to-ui-projects">
          <DeveloperCard />
          <DeveloperCard />
          <DeveloperCard />
          <DeveloperCard />
          <DeveloperCard />
          <DeveloperCard />

          <div className="developer-card">
            <div className="user-imgbx">
              <img src={userImage} className="user-img" />
            </div>
            <div className="text-center">
              <h3 className="user-name">Sandeep</h3>
              <p className="designation-user">Web Developers</p>
              <p className="email-user">dev@rexett.com</p>
              <p className="associate-text font-14 mt-2 mb-2">
                <span className="associate mb-1">Associated with</span>{" "}
                <OverlayTrigger placement="bottom" overlay={companyname}>
                  <span className="white-nowrap">
                    <img src={associateLogo} className="me-2" /> Aviox
                    Technologies Pvt Ltd
                  </span>
                </OverlayTrigger>
              </p>
              <ul className="social-icons">
                <li>
                  <a href="">
                    <FaLinkedinIn />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Collapse>
    </div> */}
    </>
  );
};

export default SingleProject;
