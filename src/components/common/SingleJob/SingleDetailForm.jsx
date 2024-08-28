import React, { useState, useRef } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IoBriefcaseOutline, IoCheckmarkOutline, IoLocationOutline, IoTextSharp } from 'react-icons/io5';
import sidebarLogo from "../../../assets/img/rexett-logo.png";
import RexettButton from "../../atomic/RexettButton";
import { PiSignatureLight } from "react-icons/pi";
import { BsCalendarDate } from "react-icons/bs";
import { CiAt } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { FiDollarSign } from "react-icons/fi";
import { IoIosCodeWorking } from "react-icons/io";
import { RiText } from "react-icons/ri";
import { MdNumbers } from "react-icons/md";
import DraggableField from './DraggableField';  // Import DraggableField component
import DropZone from './DropZone';  // Import DropZone component

function SingleDetailForm({ handleBack, handleSave }) {
  const [documentOwner, setDocumentOwner] = useState('');
  const [details, setDetails] = useState();
  const [droppedFields, setDroppedFields] = useState([]);  // State to store dropped fields
  const { register, handleSubmit } = useForm();
  const printRef = useRef();

  const onSubmit = (values) => {
    console.log(values, "values");
    setDetails(values);
  };

  const handleOwnerSelect = (e) => {
    setDocumentOwner(e.target.value);
  };

  const handleDrop = (item) => {
    setDroppedFields([...droppedFields, item]);  // Add dropped field to the list
  };

  return (
    <div>
      <div id="fill-details">
        <h4 className="text-center">Preview Document</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="justify-content-center document-preview-wrapper">
            <div className="drag-options pe-2">
              <div>
                <h4>Fields</h4>
                <div className="drag-listing">
                  <DraggableField type="signature" icon={<PiSignatureLight />} label="Signature" />
                  <DraggableField type="dateSigned" icon={<BsCalendarDate />} label="Date Signed" />
                  <DraggableField type="name" icon={<IoTextSharp />} label="Name" />
                  <DraggableField type="email" icon={<CiAt />} label="Email" />
                  <DraggableField type="title" icon={<IoBriefcaseOutline />} label="Title" />
                  <DraggableField type="workingHours" icon={<GoClock />} label="Working Hours" />
                  <DraggableField type="price" icon={<FiDollarSign />} label="Price" />
                  <DraggableField type="address" icon={<IoLocationOutline />} label="Address" />
                  <DraggableField type="scopeOfWork" icon={<IoIosCodeWorking />} label="Scope of Work" />
                  <DraggableField type="text" icon={<RiText />} label="Text" />
                  <DraggableField type="number" icon={<MdNumbers />} label="Number" />
                </div>
              </div>
            </div>
            <div className="preview-document">
              <h5>Preview Document</h5>
              <DropZone onDrop={handleDrop}>
                <div className="docs-container" ref={printRef}>
                  <div className="sidebar-logo mt-3 mb-2 text-center">
                    <a href="https://www.rexett.com/">
                      <img src={sidebarLogo} alt="Sidebar Logo" />
                    </a>
                  </div>
                  {/* Render dropped fields here */}
                  {droppedFields.map((field, index) => (
                    <p key={index}>{field.label}</p>
                  ))}
                </div>
              </DropZone>
            </div>
          </div>
          <div className="text-center">
            <Button variant="transparent" className="font-14 outline-main-btn main-btn px-5 me-2" onClick={handleBack}>Back</Button>
            <RexettButton
              variant="transparent"
              text="Save"
              type="submit"
              className="font-14 main-btn px-5"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SingleDetailForm;
