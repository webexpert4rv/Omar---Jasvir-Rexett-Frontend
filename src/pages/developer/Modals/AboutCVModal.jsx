import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { fetchDeveloperCv, updateDeveloperCvBio } from "../../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";
 
const AboutCV = ({ show, handleClose,data }) => {
    const dispatch =useDispatch();
    const {smallLoader}=useSelector(state=>state.developerData)
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});
      const [charCount, setCharCount] = useState(0);
  const maxChars = 1000;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setCharCount(value.length);
      setValue("bio", value.slice(0, maxChars)); 
    } 
  };

      useEffect(()=>{
        setValue("bio",data)
      },[data])

      const onSubmit=(values)=>{
       dispatch(updateDeveloperCvBio(values,()=>{
        dispatch(fetchDeveloperCv())
        handleClose()
       }))
      }

    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
            <Modal.Title>About Section</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Form.Group className="mb-4">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows="6" name="bio"  placeholder="Enter your bio" 
                         {...register("bio", {
                            required: {
                              value: true,
                              message: "Please Enter Bio Data",
                            },
                            validate: (value) =>
                            value.length <= maxChars || "Maximum character limit reached",
                         
                          })}
                        
                          onChange={handleChange}
                        ></Form.Control>
                            <p className="error-message">
                                {errors.bio?.message}
                            </p>
                            <p className="font-13 text-end">{maxChars - charCount} characters remaining</p>
                    </Form.Group>
                    <div className="text-center">
                        <RexettButton
                         type="submit" 
                         text="Submit"
                         className="main-btn px-4"
                         variant="transparent"
                         isLoading={smallLoader}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default AboutCV;