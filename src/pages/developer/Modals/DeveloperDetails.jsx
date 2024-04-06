import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import RexettButton from "../../../components/atomic/RexettButton";
import { fetchDeveloperCv, updateDeveloperCvBio, updateDeveloperCvDetails } from "../../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiUpload } from "react-icons/hi";
import { filePreassignedUrlGenerate } from "../../../redux/slices/clientDataSlice";

const DeveloperDetails = ({ show, handleClose, data, name, position, profile }) => {
    const dispatch = useDispatch();
    const { smallLoader } = useSelector(state => state.clientData)
    const [file, setFile] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});

    useEffect(() => {
        setValue("name", name);
        setValue("professional_title", position);
        setValue("profile_picture", profile);
    }, [name, position])




    const handleChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    const onSubmit = (values) => {
        console.log(values,"val")
        let fileData = new FormData();
        fileData.append("file",file);
        if(file==null){
            dispatch(updateDeveloperCvDetails(values, () => {
                dispatch(fetchDeveloperCv())
                handleClose()
            }))
        }else{
            dispatch(filePreassignedUrlGenerate(fileData, (url) => {
                let data = {
                    ...values,
                    "profile_picture": url,
                };
                dispatch(updateDeveloperCvDetails(data, () => {
                    dispatch(fetchDeveloperCv())
                    handleClose()
                }))
            }));
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Developer Section</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Form.Group className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" placeholder="Enter your name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Please Enter Name",
                                },

                            })}

                        ></Form.Control>
                        <p className="error-message">
                            {errors.name?.message}
                        </p>
                        <Form.Label>Position</Form.Label>
                        <Form.Control name="professional_title" placeholder="Enter your name"
                            {...register("professional_title", {
                                required: {
                                    value: true,
                                    message: "Please Enter Position",
                                },


                            })}

                        ></Form.Control>
                        <p className="error-message">
                            {errors.professional_title?.message}
                        </p>

                        <Form.Label className="common-label">Image</Form.Label>
                        <Form.Control type="file" id="developer-image"
                            name="profile_picture"
                            {...register("profile_picture", {
                                onChange: (e) => handleChange(e),
                                required: {
                                    value: false,
                                    message: "Profile Picture is required",
                                },
                            })}
                            className="d-none" />
                        <Form.Label htmlFor="developer-image" className="upload-image-label d-block"><HiUpload /> Upload Image, Image must be jpg or png</Form.Label>
                        <div>
                            <img src={selectedImage ? selectedImage : profile} alt="Selected" style={{ width: "150px", maxHeight: "150px" }} />
                        </div>


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
export default DeveloperDetails;