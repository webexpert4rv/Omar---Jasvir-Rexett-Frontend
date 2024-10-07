import React, { useEffect, useRef, useState } from "react";
import { t } from "i18next";
import { Col, Form, Row } from "react-bootstrap";
import { MdPattern } from "react-icons/md";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCustomSkills, getSkillList } from "../../../redux/slices/clientDataSlice";
import Select from "react-select";
import { BsCloudLightning } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SkillAndWeightSection from "./SkillAndWeightSection";
import { removeDuplicateBasedOnLabels } from "../../utils";
import CreatableSelect from "react-select/creatable";

const MAX_CHARACTER_LIMIT = 10000;

const JobPostStep2 = ({
  register,
  errors,
  watch,
  setValue,
  control,
  traitSkill,
  setTraitSkill,
}) => {
  const dispatch = useDispatch();
  const quillRef = useRef(null);
  const [selectedLevel, setSelectedLevel] = useState();
  const [newId, setNewId] = useState();
  const [descriptionText, setDescriptionText] = useState("");
  const [selectedSkill, setSelectedSkill] = useState();
  const [skills, setSkills] = useState([]);
  const [goodToSkills, setGoodToSkills] = useState([]);
  const { smallLoader, skillList, customSkills } = useSelector((state) => state.clientData);
  const MAX_LENGTH = 10000;
  const [count, setCount] = useState(0);
  console.log(customSkills, "customSkills")


  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });

  useEffect(() => {
    dispatch(getSkillList());
  }, [dispatch]);

  useEffect(() => {
    setSkills(skillListMapped);
    setGoodToSkills(skillListMapped);
    handleFilterOppositeFieldOptions(watch("skills"), "skills");
    handleFilterOppositeFieldOptions(watch("optional_skills"), "optional_skills");
  }, [skillList]);



  const getPlainText = (string) => {
    if (string) {
      const plainText = string.replace(/(<([^>]+)>)/gi, "");
      return plainText;
    } else {
      return "";
    }
  };
  const handleSkillLevel = (event, skill, index, name, inx) => {
    // const skillId = (event.target.id)?.split("-")[1];
    // let updatedSkills = traitSkill.map((s, idx) => {
    //   if (idx === index) {
    //     return {
    //       ...s,
    //       level: s.level.map((level, lIdx) => ({
    //         ...level,
    //         isTrue: lIdx === inx,
    //       })),
    //       currentLevel: name,
    //       percentage: name === "Beginner" ? "25%" : name === "Intermediate" ? "50%" : "100%",
    //     };
    //   } else {
    //     return {
    //       ...s,
    //       percentage: s.currentLevel ? (s.currentLevel === "Beginner" ? "25%" : s.currentLevel === "Intermediate" ? "50%" : "100%") : "0%",
    //     };
    //   }
    // });
    // setTraitSkill(updatedSkills);
  };
  const handleChange = (html, field) => {
    const editor = quillRef?.current?.getEditor();
    const plainText = getPlainText(html);
    if (plainText.length <= MAX_LENGTH) {
      field.onChange(html);
    } else {
      // Prevent further input
      const currentLength = editor?.getLength();
      if (currentLength > MAX_LENGTH + 1) {
        editor.deleteText(MAX_LENGTH, currentLength);
      }
    }
  };





  const handleAppend = (fieldValue) => {
    const newSkills = fieldValue.filter(curElem =>
      !skillListMapped?.some(itm => itm.label === curElem.label)
    );
    const checkSkill = fieldValue[fieldValue.length - 1]
    console.log(checkSkill, "checkSkill")
    console.log(traitSkill, "traitSkill")
    // if (traitSkill?.length) {
    if (!checkSkill?.__isNew__) {
      const traitSkillsLabels = traitSkill.map(({ label }) => label);
      let elementToAppend = fieldValue.find(
        (curElem) => !traitSkillsLabels.includes(curElem.label)
      );
      delete elementToAppend?.weight;
      console.log(elementToAppend, "elementToAppend")
      if (elementToAppend) {
        setTraitSkill((prev) => [...prev, elementToAppend]);
      }
    } else {
      console.log("inside newSkills")
      const lastNewSkill = newSkills[newSkills.length - 1]?.label;
      console.log(lastNewSkill, "lastNewSkill")
      let payload = {
        title: lastNewSkill,
        description: "skills",
        icon_url: "https://rexett-dev.s3.amazonaws.com/images/custom_skill_icon.svg"
      };
      dispatch(addCustomSkills(payload, () => {
        console.log("Custom skill added, fetching skill list...");
        dispatch(getSkillList());
      }))
      if (customSkills) {
        const newSkillAdded = {
          value: customSkills?.id,
          label: customSkills?.title,
        }
        console.log(newSkillAdded, "newSkillAdded")
        setTraitSkill((prev) => [...prev, newSkillAdded]);
      }
    }
  };

  const findElementToDelete = (newValue, oldValue) => {
    const newValueLabels = newValue?.map(({ label }) => label);
    const elemToDelete = oldValue.find(
      (curElem) => !newValueLabels.includes(curElem.label)
    );
    if (elemToDelete) {
      return elemToDelete?.label;
    }
  };
  const handleDeleteItem = (labelToDelete) => {
    setTraitSkill((prev) =>
      prev.filter((curElem) => curElem?.label !== labelToDelete)
    );
  };

  const handleFilterOppositeFieldOptions = (
    currentFieldValue,
    currentFieldValueName
  ) => {
    if (currentFieldValue?.length) {
      const currentFieldLabels = currentFieldValue?.map(({ label }) => label);
      const filteredItems = skillListMapped?.filter(
        (curElem) => !currentFieldLabels?.includes(curElem?.label)
      );
      if (filteredItems?.length) {
        if (currentFieldValueName === "skills") {
          setGoodToSkills(filteredItems);
        } else {
          setSkills(filteredItems);
        }
      }
    }
  };
  return (
    <div>
      <section className="job-post-section">
        <Row>
          <Col md="12" className="mb-4">
            <Form.Group>
              <Form.Label>Description *</Form.Label>
              <div id="custom-ck">
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      ref={quillRef}
                      value={watch("description")}
                      theme="snow"
                      onChange={(html) => {
                        handleChange(html, field);
                      }}
                    />
                  )}
                />

                <p className="text-end text-muted font-14 mt-1">{`${getPlainText(watch("description"))?.length
                  ? getPlainText(watch("description")).length
                  : 0
                  }/10,000`}</p>
              </div>
              {errors?.description && (
                <p className="error-message ">{errors.description?.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col md="6" className="mb-4">
            <Form.Group>
              <Form.Label>Skills *</Form.Label>
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
                      if (
                        watch("skills")?.length < newValue.length ||
                        !watch("skills")
                      ) {
                        field.onChange(newValue);
                        handleAppend(newValue);
                      } else {
                        const elementToDelete = findElementToDelete(
                          newValue,
                          watch("skills")
                        );
                        field.onChange(newValue);

                        if (elementToDelete) {
                          handleDeleteItem(elementToDelete);
                        }
                      }
                      handleFilterOppositeFieldOptions(
                        newValue,
                        "skills"
                      );

                      setSelectedSkill(newValue);

                      // const traitSkillLabels = traitSkill?.map(({label}) => label)
                      // const optionalSkills = watch("optional_skills");
                      // const tempOptionalSkills =  optionalSkills.filter((curElem) => !traitSkillLabels.includes(curElem?.label))
                      // const tempSkills = newValue.filter((curElem) => !traitSkillLabels.includes(curElem?.label))

                      // const combined = [...tempOptionalSkills, ...tempSkills];
                      // const unique = removeDuplicateBasedOnLabels(combined);
                      // const uniqueLables = unique.map(({label}) => label);
                      // console.log(unique,"unique")
                      // setTraitSkill((prev)=>[...prev,...unique ])
                    }}
                  />
                )}
              />
            </Form.Group>
            {errors?.skills && (
              <p className="error-message ">{errors.skills?.message}</p>
            )}
          </Col>
          <Col md="6" className="mb-4">
            <Form.Group>
              <Form.Label>Good to have skills *</Form.Label>
              <Controller
                name="optional_skills"
                control={control}
                rules={{ required: "Good to have skills are required" }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isClearable
                    isMulti
                    options={goodToSkills}
                    onChange={(newValue) => {
                      if (
                        watch("optional_skills")?.length < newValue.length ||
                        !watch("optional_skills")
                      ) {
                        field.onChange(newValue);
                        handleAppend(newValue);
                      } else {
                        const elementToDelete = findElementToDelete(
                          newValue,
                          watch("optional_skills")
                        );
                        field.onChange(newValue);

                        if (elementToDelete) {
                          handleDeleteItem(elementToDelete);
                        }
                      }
                      handleFilterOppositeFieldOptions(
                        newValue,
                        "optional_skills"
                      );
                      setSelectedSkill(newValue);
                    }}
                  />
                )}
              />
            </Form.Group>
            {errors?.optional_skills && (
              <p className="error-message">{errors.optional_skills?.message}</p>
            )}
          </Col>
        </Row>
        <div className="skill-weight-wrapper mb-3">
          <SkillAndWeightSection
            skills={watch("skills")}
            optional_skills={watch("optional_skills")}
            traitSkill={traitSkill}
            setTraitSkills={setTraitSkill}
            setValue={setValue}
          />
          {/* <Row>
            <Col md={8}>
              <div>
                <h4 className="font-18 fw-medium">Skills and traits</h4>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <h5 className="text-center font-18 fw-medium">Weight</h5>
                <div className="d-flex justify-content-center gap-3">
                  <span className="font-14">Beginner </span>
                  <span className="font-14">Intermediate</span>
                  <span className="font-14">Expert</span>
                </div>
              </div>
            </Col>
            {traitSkill?.map((skill, index) => (
              <Row key={skill?.value}>
                <Col md={8} className="mb-3">
                  <div>
                    <div
                      className={`skill-progress low-skill${skill?.currentLevel}`}
                    >
                      <span className="skill-progress-name fw-semibold">
                        {skill?.label}
                      </span>
                      <span className="skill-percent">
                        {skill?.percentage || "0%"}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="align-self-center mb-3">
                  <div className="d-flex justify-content-center gap-3">
                    {skill?.level?.map((lvl, inx) => {
                      return (
                        <>
                          <div className="low-wrapper" key={inx}>
                            <Form.Check
                              type="radio"
                              id={`${inx}-${skill?.value}`}
                              onChange={(e) =>
                                handleSkillLevel(
                                  e,
                                  skill,
                                  index,
                                  lvl?.name,
                                  inx
                                )
                              }
                              className="weight-radio"
                              checked={lvl?.isTrue}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            ))}
          </Row> */}
        </div>
      </section>
    </div>
  );
};

export default JobPostStep2;
