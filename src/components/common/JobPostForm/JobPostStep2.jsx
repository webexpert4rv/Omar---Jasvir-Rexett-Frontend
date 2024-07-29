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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MAX_CHARACTER_LIMIT = 10000;

const JobPostStep2 = ({ register, errors, watch, setValue, control, traitSkill, setTraitSkill }) => {
  const dispatch = useDispatch();
  const quillRef = useRef(null);
  const [selectedLevel, setSelectedLevel] = useState()
  const [newId, setNewId] = useState()
  const [descriptionText, setDescriptionText] = useState("");
  const [selectedSkill, setSelectedSkill] = useState()
  const [skills, setSkills] = useState([]);
  const [goodToSkills, setGoodToSkills] = useState([]);
  const { smallLoader, skillList } = useSelector((state) => state.clientData);
  const [skillLvl, setSkillLvl] = useState()
  const [skillId, setSkillId] = useState()
  const MAX_LENGTH = 10000;

  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });


  useEffect(() => {
    dispatch(getSkillList());
  }, [dispatch]);

  useEffect(() => {
    setSkills(skillListMapped);
    setGoodToSkills(skillListMapped)
  }, [skillList]);
  const getPlainText = (string) => {
    if (string) {
      const plainText = string.replace(/(<([^>]+)>)/ig, '');
      return plainText
    } else {
      return "";
    }
  }
  const handleSkillLevel = (event, skill, index, name, inx) => {
    // const skillId = (event.target.id)?.split("-")[1];
    let updatedSkills = traitSkill.map((s, idx) => {
      if (idx === index) {
        return {
          ...s,
          level: s.level.map((level, lIdx) => ({
            ...level,
            isTrue: lIdx === inx,
          })),
          currentLevel: name, 
          percentage: name === "Beginner" ? "25%" : name === "Intermediate" ? "50%" : "100%",
        };
      } else {
        return {
          ...s,
          percentage: s.currentLevel ? (s.currentLevel === "Beginner" ? "25%" : s.currentLevel === "Intermediate" ? "50%" : "100%") : "0%",
        };
      }
    });
    setTraitSkill(updatedSkills);
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

                <p className="text-end text-muted font-14 mt-1">{`${getPlainText(watch("description"))?.length ? getPlainText(watch("description")).length : 0}/10,000`}</p>
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
                      field.onChange(newValue);
                      if (traitSkill?.length > 0) {
                        let lastValue = newValue[newValue.length - 1]
                        if (lastValue) {
                          lastValue.level = [
                            { name: "Beginner", isTrue: false },
                            { name: "Intermediate", isTrue: false },
                            { name: "Expert", isTrue: false }
                          ];
                        }


                        const deletedItems = newValue.filter(
                          oldItem => !traitSkill.some(newItem => newItem.value === oldItem.value)
                        );

                        if (deletedItems.length == 0) {
                          const updatedValue = newValue.map(skill => ({
                            ...skill,
                            level: [
                              { name: "Beginner", isTrue: false },
                              { name: "Intermediate", isTrue: false },
                              { name: "Expert", isTrue: false }
                            ]
                          }));
                          setTraitSkill(updatedValue)
                        } else {
                          let cpyTraits = [...traitSkill, lastValue]
                          setTraitSkill(cpyTraits)
                        }
                      } else {
                        const updatedValue = newValue.map(skill => ({
                          ...skill,
                          level: [
                            { name: "Beginner", isTrue: false },
                            { name: "Intermediate", isTrue: false },
                            { name: "Expert", isTrue: false }
                          ]
                        }));

                        setTraitSkill(updatedValue)
                      }
                      setSelectedSkill(newValue)
                      let valuesToRemove = newValue.map(item => item.value);

                      let updatedArr = goodToSkills.filter(item => !valuesToRemove.includes(item.value));
                      setGoodToSkills(updatedArr)
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
                      field.onChange(newValue);

                      if (traitSkill?.length > 0) {
                        let lastValue = newValue[newValue.length - 1]
                        if (lastValue) {
                          lastValue.level = [
                            { name: "Beginner", isTrue: false },
                            { name: "Intermediate", isTrue: false },
                            { name: "Expert", isTrue: false }
                          ];
                        }
                        const deletedItems = newValue.filter(
                          oldItem => !traitSkill.some(newItem => newItem.value === oldItem.value)
                        );

                        if (deletedItems.length == 0) {
                          const updatedValue = newValue.map(skill => ({
                            ...skill,
                            level: [
                              { name: "Beginner", isTrue: false },
                              { name: "Intermediate", isTrue: false },
                              { name: "Expert", isTrue: false }
                            ]
                          }));
                          setTraitSkill(updatedValue)
                        } else {
                          let cpyTraits = [...traitSkill, lastValue]
                          setTraitSkill(cpyTraits)
                        }


                      } else {
                        const updatedValue = newValue.map(skill => ({
                          ...skill,
                          level: [
                            { name: "Beginner", isTrue: false },
                            { name: "Intermediate", isTrue: false },
                            { name: "Expert", isTrue: false }
                          ]
                        }));

                        setTraitSkill(updatedValue)
                      }
                      setSelectedSkill(newValue)
                      let valuesToRemove = newValue.map(item => item.value);

                      let updatedArr = skills.filter(item => !valuesToRemove.includes(item.value));
                      setSkills(updatedArr)
                    }}


                  />
                )}
              />
            </Form.Group>
            {errors?.optional_skills && (
              <p className="error-message">
                {errors.optional_skills?.message}
              </p>
            )}
          </Col>
        </Row>
        <div className="skill-weight-wrapper mb-3">
          <Row>
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
              <Row key={skill?.value} >
                <Col md={8} className="mb-3">
                  <div>
                    <div className={`skill-progress low-skill${skill?.currentLevel}`}>
                      <span className="skill-progress-name fw-semibold">
                        {skill?.label}
                      </span>
                      {/* <span className="skill-percent">{selectedLevel }</span> */}
                      {/* <span className="skill-percent">{skillId === skill?.value ?  skillLvl?.name === "Beginner" ? "25%" : skillLvl?.name === "Intermediate" ? "50%" : "100%"  : "0%" }</span> */}
                      <span className="skill-percent">
                        {skill?.percentage || "0%"}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="align-self-center mb-3">
                  <div className="d-flex justify-content-center gap-3">
                    {
                      skill?.level?.map(((lvl, inx) => {
                        return (
                          <>
                            <div className="low-wrapper" key={inx}>
                                <Form.Check type="radio" id={`${inx}-${skill?.value}`} onChange={(e) => handleSkillLevel(e, skill, index, lvl?.name, inx)} className="weight-radio" checked={lvl?.isTrue   } />
                            </div>
                          </>
                        )
                      }))
                    }

                    {/* <div className="medium-wrapper">
                  <Form.Check type="radio" name="react-skill-weight" id ={`intermediate-${skill?.value}` }value={"50%"}  onChange = {(e)=>handleSkillLevel(e,skill,index,"intermediate" )} className="weight-radio" checked={skill?.weight=="intermediate"} />
                </div>
                <div className="high-wrapper">
                  <Form.Check type="radio" name="react-skill-weight" id={`expert-${skill?.value}` } value={"100%" }  onChange = {(e )=>handleSkillLevel(e,skill,index,"expert")} className="weight-radio" checked={skill?.weight=="expert"} />
                </div> */}
                  </div>
                </Col>
              </Row>
            ))}
          </Row>
        </div>
      </section>
    </div>
  );
};

export default JobPostStep2;
