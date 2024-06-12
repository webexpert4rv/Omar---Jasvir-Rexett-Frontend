import React, { useState } from 'react'
import CommonInput from '../../../components/atomic/CommonInput';
import { useForm } from 'react-hook-form';

const Step2 = () => {
    const {
        register,
        setValue,
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});
    const [selectedOption, setSelectedOption] = useState('current_team');

    const options = [
        { value: 'current_team', label: 'Additional support for your current team' },
        { value: 'new_project', label: 'Starting fresh on a new project' },
        { value: 'specific_tasks', label: 'Need help with specific tasks' },
        { value: 'not_sure', label: 'I am not sure at the moment' }
      ]

    //   const handleOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    //   };
  return (
    <div className="container">
      <h1>Select the ideal length for your engagement</h1>
      <p>Select the ideal length for your engagement</p>
      <form id="stepForm">

          <CommonInput
                        // label={t("As Company")}
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        error={errors.name}
                        type="radio"
                        options={options}
                      />
      </form>
    </div>
  )
}

export default Step2