import moment from "moment";
import React from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { HiDownload } from "react-icons/hi";

const SingleInvoiceRow = ({ curInvoice }) => {
  const { status, amount, download_link, created_at } = curInvoice;
  const actiontooltip = <Tooltip id="tooltip">Download Invoice</Tooltip>;

  const handleDownload = (download_link) => {
    fetch(download_link)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = download_link;
        link.download = "downloaded-file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(download_link);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

  // const handleDownload = async (fileUrl) => {
  //   try {
  //     const response = await fetch(fileUrl);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(new Blob([blob]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'filename.ext'); // Set the desired file name here
  //     document.body.appendChild(link);
  //     link.click();
  //     link.parentNode.removeChild(link); // Clean up
  //   } catch (error) {
  //     console.error('Error downloading the file:', error);
  //   }
  // };
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
// const handleDownload = () => {
//   fetch(url)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const url = window.URL.createObjectURL(new Blob([blob]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "downloaded-file";
//       document.body.appendChild(link);

//       link.click();

//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     })
//     .catch((error) => {
//       console.error("Error fetching the file:", error);
//     });
