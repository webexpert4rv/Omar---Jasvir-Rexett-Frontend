import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { NEW_TEMPLATE_TYPE } from "./constant/constant";

const CreateNewTemplate = ({
  editorRef,
  showCreatedDocument,
  setShowCreateDocument,
}) => {
  const [error, setError] = useState({ show: false, msg: "" });
  const handleFileUpload = (event) => {
    console.log(event.target.files, "data of file");

    const allowedTypes = ["application/pdf"];
    const file = event.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setError({show: false, msg:""});
      setShowCreateDocument({ ...showCreatedDocument, file: file });
    } else {
      setError({ show: true, msg: "Invalid type" });
    }
  };
  return (
    <>
      {showCreatedDocument.type === NEW_TEMPLATE_TYPE.upload ? (
        <>
          <Form.Label className="font-14">Upload template file*</Form.Label>
          <input
            type="file"
            className="d-none"
            id="media-file"
            onChange={handleFileUpload}
          />
          <Form.Label
            htmlFor="media-file"
            className="position-btn text-center cursor-pointer"
          >
            Upload file
          </Form.Label>
          {showCreatedDocument?.file && <span>{showCreatedDocument.file.name}</span>}
          {error.show && <p className="error-message">{error.msg}</p>}
        </>
      ) : (
        <ReactQuill
          style={{ height: "60vh", width: "100%" }}
          theme="snow"
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }],
              // [{ align: [] }],
              // [{ font: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ header: 1 }, { header: 2 }],
              [{ size: ["small", false, "large", "huge"] }],
              // ["blockquote", "code-block"],
              // ["video", "link", "formula"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
          }}
          ref={editorRef}
        />
      )}
    </>
  );
};

export default CreateNewTemplate;
