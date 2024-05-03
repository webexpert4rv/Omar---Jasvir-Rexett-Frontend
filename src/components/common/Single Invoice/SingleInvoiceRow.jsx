import moment from "moment";
import React from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { HiDownload } from "react-icons/hi";

const SingleInvoiceRow = ({ curInvoice }) => {
  const { status, amount, download_link, created_at } = curInvoice;
  const actiontooltip = <Tooltip id="tooltip">Download Invoice</Tooltip>;

  const handleDownload = (url) => {
    const newTab = window.open(url, '_blank');
    if (newTab) {
        newTab.focus();
    } else {
        // If the popup blocker prevents opening the new tab
        alert('Please allow pop-ups for this site to download the file in a new tab.');
    }
};;

  return (
    <tr>
      <td className="align-middle">Rohit Sharma</td>
      <td className="align-middle">
        {moment(created_at).format("MM-DD-YYYY")}
      </td>
      <td className="align-middle">{amount}</td>
      <td className="align-middle">
        <span
          className={`fw-semibold status-${
            status === "pending" ? "progress" : "finished"
          }`}
        >
          {status}
        </span>
      </td>
      <td>
        <div>
          <OverlayTrigger placement="bottom" overlay={actiontooltip}>
            <Button
              className="action-btn"
              onClick={() => {
                handleDownload(download_link);
              }}
            >
              <HiDownload />
            </Button>
          </OverlayTrigger>
        </div>
      </td>
    </tr>
  );
};

export default SingleInvoiceRow;
