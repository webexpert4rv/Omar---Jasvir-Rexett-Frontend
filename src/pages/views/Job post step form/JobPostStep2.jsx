import React from "react";
import { t } from "i18next";
import { Col, Form, Row } from "react-bootstrap";
import { MdPattern } from "react-icons/md";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Controller } from "react-hook-form";

const JobPostStep2 = ({ register, errors, watch, setValue ,control}) => {
  return (
    <div>
      {" "}
      <section className="job-post-section">
        <Row>
          <Col md="12" className="mb-4">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <div id="custom-ck">
                <Controller
                  name="skillDescription"
                  control={control}
                  render={({ field }) => (
                    <CKEditor
                      {...field}
                      name="skillDescription"
                      editor={ClassicEditor}
                      config={{
                        // plugins: [ Paragraph, Bold, Italic, Essentials ],
                        toolbar: {
                          items: [
                            "undo",
                            "redo",
                            "|",
                            "heading",
                            "|",
                            "fontfamily",
                            "fontsize",
                            "fontColor",
                            "fontBackgroundColor",
                            "|",
                            "bold",
                            "italic",
                            "strikethrough",
                            "subscript",
                            "superscript",
                            "|",
                            "link",
                            "blockQuote",
                            "|",
                            "bulletedList",
                            "numberedList",
                            ,
                            "outdent",
                            "indent",
                          ],
                        },
                      }}
                      //   config={{
                      //     ckfinder: {
                      //       // Upload the images to the server using the CKFinder QuickUpload command
                      //       // You have to change this address to your server that has the ckfinder php connector
                      //       uploadUrl: "" //Enter your upload url
                      //     }
                      //   }}
                      data={watch("skillDescription")}
                      onChange={(event, editor) => {
                        const value = editor.getData();
                        //   setValue("skillDescription",value);
                        field.onChange(value);
                      }}
                    />
                  )}
                />
                <p className="text-end text-muted font-14 mt-1">0/10,000</p>
              </div>
            </Form.Group>
            {errors?.skillDescription && (
              <p className="error-message ">{errors.skillDescription?.message}</p>
            )}
          </Col>
          <Col md="6" className="mb-4">
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                className="common-field"
                placeholder="Enter Job Name"
                {...register("skill", {
                  required: "Skill field is required",
                })}
              />
            </Form.Group>
            {errors?.skill && (
              <p className="error-message ">{errors.skill?.message}</p>
            )}
          </Col>
          <Col md="6" className="mb-4">
            <Form.Group>
              <Form.Label>Good to have skills</Form.Label>
              <Form.Control
                type="text"
                className="common-field"
                placeholder="Enter Job Name"
                {...register("skill", {
                  required: "Skill field is required",
                })}
              />
            </Form.Group>
            {errors?.skill && (
              <p className="error-message ">{errors.skill?.message}</p>
            )}
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default JobPostStep2;
