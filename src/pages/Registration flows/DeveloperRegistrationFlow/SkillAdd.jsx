import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  IoAddCircle,

  IoTrash,
} from "react-icons/io5";

import RecommendationAI from "./RecommendationAI";
import CustomSkill from "./CustomSkill";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import StepperHeadingSection from "../StepperHeadingSection";
const SkillAdd = ({control,activeStep,watch,errors,register,skillOptions,nestedActiveStep,type,selectedRecommend,setSelectedRecommend}) => {

  return (
    <>
      <div>
      <StepperHeadingSection nestedActiveStep={nestedActiveStep} activeStep={activeStep} type={type}/>
        <Row>
          <Col md={6}>
            <RecommendationAI control={control} setSelectedRecommend={setSelectedRecommend}/>
          </Col>
          <Col md={6}>
           
       {activeStep==4 &&   <CustomSkill 
             activeStep={activeStep}
             errors={errors}
             control={control}
             watch={watch}
             register={register}
             skillOptions={skillOptions}
             selectedRecommend={selectedRecommend}
            />}
            { activeStep==5 && <div id="custom-ck">
          <Controller
            name="description"
            control={control}
            rules={{ required: "Job description is required" }}
           
            render={({ field }) => (
              <ReactQuill
                {...field}
                value={field.value ? field.value : selectedRecommend}
                className={`common-field ${
                  errors.description?.message && "invalid-field"
                }`}
                theme="snow"
                onChange={(content, delta, source, editor) => field.onChange(content)}
              />
            )}
          />
          {errors?.description && (
            <p className="field-error">{errors.description?.message}</p>
          )}
        </div>}

          </Col>
        </Row>
      </div>
    </>
  );
};
export default SkillAdd;
