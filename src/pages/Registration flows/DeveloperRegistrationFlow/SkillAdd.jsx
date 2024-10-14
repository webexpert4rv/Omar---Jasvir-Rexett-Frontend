import React, { useEffect, useState } from "react";
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


const SkillAdd = ({control,activeStep,watch,errors,register,skillOptions,nestedActiveStep,type,setSelectedRecommend,setValue,appendedSkills,selectedRecommend}) => {
  const [fieldName,setFieldName] = useState()
  
   useEffect(()=>{
   setValue("description",selectedRecommend)
   },[selectedRecommend])
 
   useEffect(()=>{
     if(nestedActiveStep === 1) {
       setFieldName("skills")
     }else{
       setFieldName("good_skills")
     }
     },[nestedActiveStep])
 
 const skills = [
   {
     id: 1,
     text: 'Typescript',
     isExpertRecommended: true,
   },
   {
     id: 2,
     text: 'CSS',
     isExpertRecommended: true,
   },
   {
     id: 3,
     text: 'HTML',
     isExpertRecommended: true,
   },
   {
     id: 4,
     text: 'Next',
     isExpertRecommended: false,
   },
   {
     id: 5,
     text: 'React',
     isExpertRecommended: false,
   },
   {
     id: 6,
     text: 'Laravel',
     isExpertRecommended: false,
   },
 ];


 console.log(skillOptions,"skillOptions")
 
 
 
   return (
     <>
       <div>
       <StepperHeadingSection nestedActiveStep={nestedActiveStep} activeStep={activeStep} type={type}/>
         <Row>
           <Col md={5}>
             <RecommendationAI control={control} setRecommend={setSelectedRecommend} options={skills} />
           </Col>
           <Col md={7}>
            
        {activeStep==4 && 
          <CustomSkill 
              activeStep={activeStep}
              errors={errors}
              control={control}
              watch={watch}
              register={register}
              skillOptions={skillOptions}
              appendedSkills={appendedSkills}
              nestedActiveStep={nestedActiveStep}
              fieldName={fieldName}
             />}
             { activeStep==5 && <div id="custom-ck">
           <Controller
             name="description"
             control={control}
             rules={{ required: "Job description is required" }}
            
             render={({ field }) => (
               <ReactQuill
                 {...field}
                 // value={selectedRecommendation}
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
