import React from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SCREENING_OPTIONS = [
  {
    label: "Work Experience",
    title: "",
    question_type: "",
    question: "How many years of experience do you currently have?",
  },
  {
    label: "Education",
    question_type: "Degree",
    title: "",
    question: "Have you completed the following level of education: [Degree]",
    ideal_answer:"Yes",
    uniqueId:"2"
  },
  {
    label: "Language",
    title: "",
    question_type: "language",
    question: "What is your level of proficiency in [Language]?",
    uniqueId:"3"
  },
 
  {
    label: "Location",
    title: "",
    question_type: "",
    ideal_answer:"Yes",
    question: "Are you comfortable commuting to this job's location?",

  },
  {
    label: "Remote Work",
    title: "",
    question_type: "",
    question: "Are you comfortable working in a remote setting?",
    ideal_answer:"Yes",

  },
  {
    label: "Expertise with Skill",
    title:"",
    question_type: "Skill",
    question: "Have many years of work experience do you have with [Skill]?",
  },
  {
    label: "Onsite Work",
    title: "",
    question: "Are you comfortable working in an onsite setting?",
    // inputType: "",
    ideal_answer:"Yes",
    uniqueId:"1"
  },
];

const JobPostStep3 = ({ register, errors, control, watch }) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "screening_questions",
  });
  const handleAddField = (opt) => {
    append({
      question_type: opt.question_type,
      question: opt.question,
      title: opt?.title,
      ideal_answer: opt?.ideal_answer ? opt.ideal_answer :"",
      must_have: false,
      alreadyYes: opt?.alreadyYes ? opt?.alreadyYes : null,
    });
  };
  const isFieldAlreadyAdded = (idx) => {
    const screeningQuestions = watch("screening_questions");
    const index = screeningQuestions?.findIndex(
      (curElem,index) => index === idx
    );
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      {" "}
      <section className="job-post-section">
        <h4 className="section-head font-18 border-0 mb-1 pb-0">
          Screening questions
        </h4>
        <p className="font-14">We recommend adding 3 or more questions.</p>
        {fields.map((field, idx) => (
          <div key={field.id} className="screening-wrapper mb-4">
            <div className="d-flex justify-content-between align-items-center screen-wrapper-heading">
              <h3 className="mb-0">{field.question}</h3>
              {field?.isRecommended && "Recommended"}
              <Button
                variant="transparent"
                className="border-0 p-0"
                onClick={() => remove(idx)}
              >
                <IoClose />
              </Button>
            </div>
            <Row className="align-items-end screening-grid">
              <Col md="4" className="mb-md-0 mb-4">
                <Form.Group>
                  {field?.question_type && (
                    <>
                      <Form.Label className="font-14">
                        {field?.question_type}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        {...register(`screening_questions.${idx}.title`, {
                          required: t("required_message"),
                        })}
                        className="common-field font-14"
                        placeholder={`Enter ${field?.question_type} name`}
                      />
                    </>
                  )}
                </Form.Group>
                {errors?.screening_questions?.[idx]?.title && (
                  <p className="error-message ">
                    {errors.screening_questions?.[idx].title?.message}
                  </p>
                )}
              </Col>
              <Col md="4" className="mb-md-0 mb-4">
                <Form.Group>
                  <Form.Label className="font-14">Ideal answer</Form.Label>
                  {field?.ideal_answer === "Yes" ? (
                     <Form.Control
                     type="text"
                     readOnly
                     {...register(`screening_questions.${idx}.ideal_answer`, {
                       required: t("required_message"),
                     })}
                     value="Yes"
                     className="common-field font-14"
                     placeholder="Enter Answer"
                   />
                  ) : field?.question_type === "language" ? (
                    <>
                    <Form.Select
                      {...register(`screening_questions.${idx}.ideal_answer`, {
                        required: t("required_message"),
                      })}
                    >
                      <option selected value="conversational">
                        Conversational
                      </option>
                      <option value="none">None</option>
                      <option value="professional">Professional</option>
                      <option value="nativeOrBilingual">
                        Native or bilinguals
                      </option>
                    </Form.Select>
                    </>
                  ) : (
                    <Form.Control
                      type={(field?.question_type === "Years" || "Expertise with Skill") ? "number" :"text"}
                      min={field?.question_type === "Years" ? 0 :null}
                      {...register(`screening_questions.${idx}.ideal_answer`, {
                        required: t("required_message"),
                      })}
                      className="common-field font-14"
                      placeholder="Enter Answer"
                    />
                  )}
                  {/* <Form.Control
                      type="text"
                      {...register(`screening_questions.${idx}.ideal_answer`, {
                        required: t("required_message"),
                      })}
                      className="common-field font-14"
                      placeholder="Enter Answer"
                    /> */}
                </Form.Group>
                {errors?.screening_questions?.[idx]?.ideal_answer && (
                  <p className="error-message ">
                    {errors.screening_questions?.[idx].ideal_answer?.message}
                  </p>
                )}
              </Col>
              <Col md="4" className="pb-md-2">
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    {...register(`screening_questions.${idx}.must_have`, {
                      // required: t("required_message"),
                    })}
                    className="font-14 job-post-checkbox"
                    id="must2"
                    label="Must have qualification"
                  />
                </Form.Group>
                {errors?.screening_questions?.[idx]?.must_have && (
                  <p className="error-message ">
                    {errors.screening_questions?.[idx]?.must_have?.message}
                  </p>
                )}
              </Col>
            </Row>
          </div>
        ))}
        {/* <div className="screening-wrapper mb-3">
          <div className="d-flex justify-content-between align-items-center screen-wrapper-heading">
            <h3 className="mb-0">
              Have you completed the following level of education: [Degree]
            </h3>
            <Button variant="transparent" className="border-0 p-0">
              <IoClose />
            </Button>
          </div>
          <Row  className="align-items-end screening-grid">
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">{field.title}</Form.Label>
                <Form.Control
                  {...register(`screening_questions.${idx}.question`, {
                    required: "This field is required",
                  })}
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Job Name"
                />
              </Form.Group>
              {errors?.screening_questions?.[idx]?.question && (
                <p className="error-message">
                  {errors.screening_questions[idx]?.question.message}
                </p>
              )}
            </Col>
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Ideal answer</Form.Label>
                <Form.Control
                  type="text"
                  {...register(`screening_questions.${idx}.ideal_answer`, {
                    required: "This field is required",
                  })}
                  className="common-field font-14"
                  placeholder="Enter Anwser"
                />
              </Form.Group>
              {errors?.screening_questions?.[idx].ideal_answer && (
                <p className="error-message ">
                  {errors.screening_questions?.[idx].ideal_answer?.message}
                </p>
              )}
            </Col>
            <Col md="4" className="pb-md-2">
              <Form.Group>
                <Form.Check
                  {...register(`screening_questions.${idx}.must_have`, {
                    required: "This field is required",
                  })}
                  type="checkbox"
                  className="font-14 job-post-checkbox"
                  id="must1"
                  label="Must have qualification"
                />
              </Form.Group>
              {errors?.screening_questions?.[idx].must_have && (
                <p className="error-message ">
                  {errors.errors?.screening_questions?.[idx].must_have}
                </p>
              )}
            </Col>
          </Row>
          <Row className="align-items-end screening-grid">
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Degree</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Job Name"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Ideal answer</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Anwser"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
            <Col md="4" className="pb-md-2">
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  className="font-14 job-post-checkbox"
                  id="must1"
                  label="Must have qualification"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
          </Row>
        </div> */}
        {/* <div className="screening-wrapper mb-4">
          <div className="d-flex justify-content-between align-items-center screen-wrapper-heading">
            <h3 className="mb-0">
              Have many years of work experience do you have with [Skill]?
            </h3>
            <Button variant="transparent" className="border-0 p-0">
              <IoClose />
            </Button>
          </div>
          <Row className="align-items-end screening-grid">
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Skill</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Job Name"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">
                  Ideal answer (minimum)
                </Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Anwser"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
            <Col md="4" className="pb-md-2">
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  className="font-14 job-post-checkbox"
                  id="must2"
                  label="Must have qualification"
                />
              </Form.Group>
              {errors?.email && (
                <p className="error-message ">{errors.email?.message}</p>
              )}
            </Col>
          </Row>
        </div> */}
        <p className="font-14 mb-2">Add screening questions:</p>
        <div className="mb-3">
          {SCREENING_OPTIONS.map((curElem, idx) => (
            <Button
              key={idx}
              onClick={() => {
                handleAddField(curElem);
              }}
              disabled={isFieldAlreadyAdded(curElem?.title)}
              // disabled={() => {
              //   isFieldAlreadyAdded(curElem?.title);
              // }}
              variant="transparent"
              className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
            >
              {isFieldAlreadyAdded(idx) ? (
                <FiCheck />
              ) : (
                <FiPlus />
              )}
              {curElem.label}
            </Button>
          ))}
          {/* <Button
            variant="transparent"
            className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
          >
            <FiPlus /> Onsite Work
          </Button>
          <Button
            variant="transparent"
            className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
            disabled
          >
            <FiCheck /> Education
          </Button>
          <Button
            variant="transparent"
            className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
          >
            <FiPlus /> Language
          </Button>
          <Button
            variant="transparent"
            className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
          >
            <FiPlus /> Work Experience
          </Button>
          <Button
            variant="transparent"
            className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
          >
            <FiPlus /> Location
          </Button>
          <Button
            variant="transparent"
            className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
          >
            <FiPlus /> Remote Work
          </Button>
          <Button
            variant="transparent"
            className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
            disabled
          >
            <FiCheck /> Expertise with Skill
          </Button> */}
        </div>
        <h4 className="section-head font-18 border-0 pb-0 mb-2">
          Qualification Settings
        </h4>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            {...register("qualification_filter_out")}
            className="font-14 job-post-checkbox"
            id="filter-check"
            label="Filter out and send rejections to applicants who don't meet any must have qualifications."
          />
          {errors?.qualification_filter_out && (
            <p className="error-message">
              {errors.qualification_filter_out?.message}
            </p>
          )}
        </Form.Group>
      </section>
    </div>
  );
};

export default JobPostStep3;
