import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { updateDeveloperCvBio } from "../../../redux/slices/developerDataSlice";
import { useDispatch } from "react-redux";
 
const AboutCV = ({ show, handleClose,data }) => {
    const dispatch =useDispatch();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});

      useEffect(()=>{
        setValue("bio",data)
      },[data])

      const onSubmit=(values)=>{
       dispatch(updateDeveloperCvBio(values))
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
                          })}
                        ></Form.Control>
                            <p className="error-message">
                                {errors.bio?.message}
                            </p>
                    </Form.Group>
                    <div className="text-center">
                        <RexettButton
                         type="submit" 
                         text="Submit"
                         className="main-btn px-4"
                         variant="transparent"
                         isLoading={false}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default AboutCV;