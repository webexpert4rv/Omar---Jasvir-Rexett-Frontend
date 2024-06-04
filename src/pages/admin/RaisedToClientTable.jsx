import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { HiDownload } from "react-icons/hi";
import userImage from "../../assets/img/user-img.jpg";
import associateLogo from "../../assets/img/aviox-logo.png";

const RaisedToClientTable = () => {
  const companyname = (
    <Tooltip id="tooltip">Aviox Technologies Pvt Ltd</Tooltip>
  );
  const downloadinvoice = <Tooltip id="tooltip">Download Invoice</Tooltip>;

  return (
    <div className="table-responsive">
      <table className="table time-table table-bordered table-ui-custom">
        <thead>
          <th className="time-table-head text-start">Project Name</th>
          <th className="time-table-head text-start">Developer Name</th>
          <th className="time-table-head text-start">Total Hours</th>
          <th className="time-table-head text-start">Invoice Month</th>
          <th className="time-table-head text-start">Associated with</th>
          <th className="time-table-head text-start">Invoice Status</th>
          <th className="time-table-head text-start">Action</th>
        </thead>
        <tbody>
          <tr>
            <td className="time-table-data text-start">Figma to UI</td>
            <td className="time-table-data text-start">
              <div className="d-flex align-items-center gap-2">
                <div className="user-imgbx application-imgbx mx-0 mb-0">
                  <img src={userImage} className="user-img" />
                </div>
                Rohit Sharma
              </div>
            </td>
            <td className="time-table-data text-start">140 hrs</td>
            <td className="time-table-data text-start">Jan 2024</td>
            <td className="time-table-data">
              <p className="associate-text font-14 mt-2 mb-2">
                <span className="associate mb-1 font-14">Individual</span>
              </p>
            </td>
            <td className="time-table-data text-start">
              <span className="status-progress white-nowrap">Unpaid</span>
            </td>
            <td className="time-table-data text-start">
              <Button className="main-btn px-3 py-1 font-14">
                Raise Invoice
              </Button>
            </td>
          </tr>
          <tr>
            <td className="time-table-data text-start">Figma to UI</td>
            <td className="time-table-data text-start">
              <div className="d-flex align-items-center gap-2">
                <div className="user-imgbx application-imgbx mx-0 mb-0">
                  <img src={userImage} className="user-img" />
                </div>
                Rohit Sharma
              </div>
            </td>
            <td className="time-table-data text-start">140 hrs</td>
            <td className="time-table-data text-start">Jan 2024</td>
            <td className="time-table-data">
              <p className="associate-text font-14 mt-2 mb-2">
                <span className="associate mb-1 font-14">Individual</span>
              </p>
            </td>
            <td className="time-table-data text-start">
              <span className="status-progress white-nowrap">Unpaid</span>
            </td>
            <td className="time-table-data text-start">
              <Button className="main-btn px-3 py-1 font-14" disabled>
                Invoice Raised
              </Button>
            </td>
          </tr>
          <tr>
            <td className="time-table-data text-start">Figma to UI</td>
            <td className="time-table-data text-start">
              <div className="d-flex align-items-center gap-2">
                <div className="user-imgbx application-imgbx mx-0 mb-0">
                  <img src={userImage} className="user-img" />
                </div>
                Rohit Sharma
              </div>
            </td>
            <td className="time-table-data text-start">140 hrs</td>
            <td className="time-table-data text-start">Jan 2024</td>
            <td className="time-table-data text-start">
              <OverlayTrigger placement="bottom" overlay={companyname}>
                <div className="text-center">
                  <div className="user-imgbx d-inline-block application-imgbx associated-logo mx-0 mb-0">
                    <img src={associateLogo} className="user-img" />
                  </div>
                </div>
              </OverlayTrigger>
            </td>
            <td className="time-table-data text-start">
              <span className="status-finished white-nowrap">Paid</span>
            </td>
            <td className="time-table-data text-start">
              <OverlayTrigger placement="bottom" overlay={downloadinvoice}>
                <Button
                  variant="transparent"
                  className="arrow-btn primary-arrow"
                >
                  <HiDownload />
                </Button>
              </OverlayTrigger>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RaisedToClientTable;
