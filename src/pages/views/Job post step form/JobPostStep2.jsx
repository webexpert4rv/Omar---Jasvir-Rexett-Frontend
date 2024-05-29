import React, { useEffect, useRef, useState } from "react";
import { t } from "i18next";
import { Col, Form, Row } from "react-bootstrap";
import { MdPattern } from "react-icons/md";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSkillList } from "../../../redux/slices/clientDataSlice";
import CreatableSelect from "react-select/creatable";
import { BsCloudLightning } from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MAX_CHARACTER_LIMIT = 10000;

const JobPostStep2 = ({ register, errors, watch, setValue, control }) => {
  const dispatch = useDispatch();
  const quillRef = useRef(null);
  const [descriptionText, setDescriptionText] = useState("");
  const [skills, setSkills] = useState([]);
  const [text, setText] = useState("");
  const { smallLoader, skillList } = useSelector((state) => state.clientData);
  const MAX_LENGTH = 10000;
  useEffect(() => {
    dispatch(getSkillList());
  }, [dispatch]);
  useEffect(() => {
    setSkills(skillListMapped);
  }, [skillList]);
  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });
  const getPlainText = (string) => {
    if(string){
      const plainText =  string.replace(/(<([^>]+)>)/ig, '');
      return plainText
    } else {
      return 0;
    }
  }
  const handleChange = (html, field) => {
    const editor = quillRef.current.getEditor();
    const plainText = getPlainText(html);

    if (plainText.length <= MAX_LENGTH) {
      field.onChange(html);
    } else {
      // Prevent further input
      const currentLength = editor.getLength();
      if (currentLength > MAX_LENGTH + 1) {
        editor.deleteText(MAX_LENGTH, currentLength);
      }
    }
  };

  return (
    <div>
      {" "}
      <section className="job-post-section">
        <Row>
          <Col md="12" className="mb-4">
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <div id="custom-ck">
                {/* <Editor
                  {...register("description", {
                    required : "Description is required",
                  },
                )}
                  apiKey="nvg2dnotqh9tmlf2j3hvf7w101gjpz2l5jobxsa9avkvr5pa"
                  value={watch("description")}
                  onEditorChange={(content, editor) => {
                    setValue("description",content)
                    setText(editor.getContent({ format: "text" }));
                  }}
                  //initialValue={content}
                  //outputFormat="text"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={(e, editor) => {
                    // Set the field value on blur to prevent clearing
                    const element = editor.getElement();
                    setValue("description", editor.getContent());
                  }}
                  // onLoadContent={}
                  // initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "mentions advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | emoticons| help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    emoticons_append: {
                      custom_mind_explode: {
                        keywords: ["brain", "mind", "explode", "blown"],
                        char: "🤯",
                      },
                    },
                  }}
                /> */}
                {/* <Controller
                  name="description"
                  rules={{required:"Description is required"}}
                  control={control}
                  render={({ field: { ref, ...field }  }) => (
                    <CKEditor
                      {...field}
                      type=""
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
                      data={watch("description")}
                      value={watch("description")}
                      onChange={(event, editor) => {
                        const value = editor.getData();
                        field.onChange(value)
                      }}
                    />
                  )}
                /> */}
                <Controller
                  name="description"
                
                  control={control}
                  rules={{required:"Description is required"}}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      ref={quillRef}
                      value={watch("description")}
                      theme="snow"
                      onChange={(html) => {
                        handleChange(html,field)
                        // field.onChange(html);
                        // setValue("description", html);
                      }}
                    />
                  )}
                />
                {/* <ReactQuill
                  {...register("description", {
                    required: "Description is required",
                  })}
                  value={watch("description")}
                  theme="snow"
                  onChange={(html) => {
                    setValue("description", html);
                  }}
                /> */}

                <p className="text-end text-muted font-14 mt-1">{`${getPlainText(watch("description"))?.length ?getPlainText(watch("description")).length : 0}/10,000`}</p>
              </div>
              {errors?.description && (
                <p className="error-message ">{errors.description?.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col md="6" className="mb-4">
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Controller
                name="skills"
                control={control}
                rules={{ required: "Skills are required" }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isClearable
                    isMulti
                    options={skills}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
              {/* <Form.Control
                type="text"
                className="common-field"
                placeholder="Enter Job Name"
                {...register("skill", {
                  required: "Skill field is required",
                })}
              /> */}
            </Form.Group>
            {errors?.skills && (
              <p className="error-message ">{errors.skills?.message}</p>
            )}
          </Col>
          <Col md="6" className="mb-4">
            <Form.Group>
              <Form.Label>Good to have skills</Form.Label>
              <Controller
                name="optional_skills"
                control={control}
                rules={{ required: "Good to have skills are required" }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isClearable
                    isMulti
                    options={skills}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
            </Form.Group>
            {errors?.optional_skills && (
              <p className="error-message ">
                {errors.optional_skills?.message}
              </p>
            )}
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default JobPostStep2;
