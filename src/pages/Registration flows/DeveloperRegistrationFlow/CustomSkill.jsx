import React, { useEffect, useState } from 'react'
import { LEVEL_OPTIONS, createOptionsForReactSelect, experienceLevels } from '../../websiteRegisterForm/developer/developeStepConstant';
import { useFieldArray } from 'react-hook-form';
import CommonInput from '../../../components/atomic/CommonInput';
import { IoAddCircle, IoTrash } from 'react-icons/io5';
import { Button } from 'react-bootstrap';

const CustomSkill = ({
  errors,
  control,
  watch,
  register,
  skillOptions,
  appendedSkills,
  nestedActiveStep,
  fieldName
}) => {
  const [formattedSkillOptions, setFormattedSkillOptions] = useState([]);
  console.log(formattedSkillOptions,"formattedSkillOptions")
  console.log(nestedActiveStep,"nestedActiveStep")

  useEffect(() => {
    if (appendedSkills && appendedSkills.length > 0) {
      appendedSkills.forEach((skl, i) => append(skl))
    }
  }, [appendedSkills])
  console.log(appendedSkills.length,"appendedSkills")
  useEffect(() => {
    if (skillOptions?.length) {
      const formattedSkillOptions = createOptionsForReactSelect(
        skillOptions,
        "id",
        "title"
      );
      setFormattedSkillOptions(formattedSkillOptions);
    }
  }, [skillOptions]);
  const { fields, remove, append } = useFieldArray({
    control,
    name: fieldName,
  });
  const handleAppend = () => {
    if(nestedActiveStep===1){
      const index = watch(`${fieldName}`)?.findIndex(
        (curElem) => curElem.skill === "" || curElem.skill_weight === "" 
      )
      if (index < 0) {
        append({ skill: "", skill_weight: "" });
      }
    }else{
      const idx = watch(`${fieldName}`)?.findIndex(
        (curElem) => curElem.skill === "" || curElem.skill_weight === "" 
      );
      if (idx < 0) {
        append({ skill: "", skill_weight: "" });
      }
    }
  }

  console.log(watch("skills"),"skills")
  console.log(watch("good_skills"),"good_skills")
  console.log(fields,"these are fields")



 
  return (
    <div>
      {fields?.map((field, idx) => (
        <>
          <div
            key={field.id}
            className="d-md-flex align-items-center gap-2 mt-md-0 mt-4"
          >
            <div className="w-100">
              <CommonInput
                label={"Enter Skill"}
                name={ `${fieldName}.${idx}.skill`}
                type={"select2"}
                control={control}
                rules={{ required: "This field is required" }}
                error={nestedActiveStep == 1 ? errors?.skills?.[idx]?.skill :  errors?.good_skills?.[idx]?.skill}
                selectOptions={formattedSkillOptions}
                invalidFieldRequired={true}
                placeholder="Select Skill"
              />
            </div>
           { nestedActiveStep == 1  ? <div className="w-100">
              <CommonInput
                label={"Enter Experience"}
                name={`skills.${idx}.experience`}
                type={"select2"}
                control={control}
                selectOptions={experienceLevels}
                rules={{ required: "This field is required" }}
                error={errors?.experience?.[idx]?.level}
                invalidFieldRequired={true}
                placeholder="Select Experience"
              />
            </div> : ""}
            <div className="w-100">
              <CommonInput
                label={"Enter Level"}
                name={`${fieldName}.${idx}.skill_weight` }
                type={"select2"}
                control={control}
                rules={{ required: "This field is required" }}
                error={nestedActiveStep == 1 ? errors?.skills?.[idx]?.skill_weight :  errors?.good_skills?.[idx]?.skill_weight}
                selectOptions={LEVEL_OPTIONS}
                invalidFieldRequired={true}
                placeholder="Select Level"
              />
            </div>
            {/* <Button
              onClick={handleAppend}
              variant="transparent"
              className="text-green font-24 p-0 shadow-none border-0"
            >
              <IoAddCircle />
            </Button> */}
            {watch(`${fieldName}`)?.length > 1  && (
              <Button
                onClick={() => remove(idx)}
                variant="transparent"
                className="text-danger font-24 p-0 shadow-none border-0"
              >
                <IoTrash />
              </Button>
            )}
          </div>
        </>
      ))}
      <div className='text-end'>
        <Button
          onClick={handleAppend}
          variant="transparent"
          className="arrow-btn font-24 p-0 shadow-none border-0"
        >
          <IoAddCircle />
        </Button>
      </div>
    </div>
  )
}

export default CustomSkill