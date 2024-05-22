import React, { useEffect, useState } from "react";
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

const MAX_CHARACTER_LIMIT = 10000;

const JobPostStep2 = ({ register, errors, watch, setValue, control }) => {
  const dispatch = useDispatch();
  const [descriptionText, setDescriptionText] = useState("");
  const [skills, setSkills] = useState([]);
  const { smallLoader, skillList } = useSelector((state) => state.clientData);
  useEffect(() => {
    dispatch(getSkillList());
  }, [dispatch]);
  useEffect(() => {
    setSkills(skillListMapped);
  }, [skillList]);
  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });
  // const editorConfiguration = {
  //   plugins: [WordCount],
  //   wordCount: {
  //     showParagraphs: false,
  //     showWordCount: false,
  //     showCharCount: true,
  //     countSpacesAsChars: true,
  //     countHTML: false,
  //     maxWordCount: 400,
  //     maxCharCount: 400,
  //   },
  //   toolbar: {
  //     items: [
  //       "undo",
  //       "redo",
  //       "|",
  //       "heading",
  //       "|",
  //       "fontfamily",
  //       "fontsize",
  //       "fontColor",
  //       "fontBackgroundColor",
  //       "|",
  //       "bold",
  //       "italic",
  //       "strikethrough",
  //       "|",
  //       "link",
  //       "blockQuote",
  //       "|",
  //       "bulletedList",
  //       "numberedList",
  //       ,
  //       "outdent",
  //       "indent",
  //     ],
  //   },
  // };

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
                  name="description"
                  control={control}
                  rules={{
                    required: "Description is required",
                    // validate: (value) =>
                    //   descriptionText?.length <= MAX_CHARACTER_LIMIT ||
                    //   "Maximum character limit reached",
                  }}
                  render={({ field: { ref, ...field } }) => (
                    <CKEditor
                      {...field}
                      innerRef={ref}
                      editor={ClassicEditor}
                      config={{
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
                      // config={editorConfiguration}
                      data={watch("description")}
                      onChange={(event, editor) => {
                        const value = editor.getData();
                        //   setValue("skillDescription",value);
                        field.onChange(value);
                        // for removing html tags and getting plain string
                        setDescriptionText(value.replace(/(<([^>]+)>)/gi, ""));
                      }}
                    />
                  )}
                />
                <p className="text-end text-muted font-14 mt-1">{`${descriptionText?.length}/10,000`}</p>
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
