import React, { useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../components/atomic/RexettButton";
import { getDeveloperProfileDetails, updateDeveloperProfile } from "../../redux/slices/developerDataSlice";
const EditDeveloperProfile = () => {

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});
    const dispatch = useDispatch();
    const {smallLoader,developerProfileData}=useSelector(state=>state.developerData)
   
    useEffect(()=>{
        dispatch(getDeveloperProfileDetails())
     },[dispatch])

    useEffect(()=>{

        setValue("name",developerProfileData?.data?.name)
        setValue("email",developerProfileData?.data?.email)
        setValue("phone_number",developerProfileData?.data?.phone_number)
        setValue("address",developerProfileData?.data?.address)
        setValue("address_2",developerProfileData?.data?.address_2)
        setValue("city",developerProfileData?.data?.city)
        setValue("country",developerProfileData?.data?.country)
        setValue("passcode",developerProfileData?.data?.passcode)
        
    },[developerProfileData])

    const onSubmit=(values)=>{
      let formData=new FormData()
      for(const key in values){
        formData.append(key,values[key])
      }
      dispatch(updateDeveloperProfile(formData))
    }
    
    return (
        <>
            <section>
                <h2 className="section-head mb-4">Update your Profile</h2>
                <div>
                     <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Row className="mb-4">
                            <Col md="6">
                                <div className="inner-form">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Developer Name</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="name"
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: "Name is required",
                                                },
                                            })} />
                                        <p className="error-message">
                                            {errors.name?.message}
                                        </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Email</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="email"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "Email is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.email?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Phone</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="phone_number"
                                            {...register("phone_number", {
                                                required: {
                                                    value: true,
                                                    message: "Phone Number is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.phone_number?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Previous Password</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control type="password" className="common-field"
                                                name="previous_password"
                                                {...register("previous_password", {
                                                    required: {
                                                        value: false,
                                                        message: "Previous Password is required",
                                                    },
                                                })}
                                            />
                                            <span className="eye-btn"><FaEye /></span>
                                        </div>
                                        <p className="error-message">
                                            {errors.previous_password?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">New Password</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control type="password" className="common-field"
                                                name="password"
                                                {...register("password", {
                                                    required: {
                                                        value: false,
                                                        message: "Password is required",
                                                    },
                                                })}
                                            />
                                            <span className="eye-btn"><FaEye /></span>
                                        </div>
                                        <p className="error-message">
                                            {errors.password?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Address</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="address"
                                            {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: "Address 1 is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.address?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Address 2</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="address_2"
                                            {...register("address_2", {
                                                required: {
                                                    value: true,
                                                    message: "Address 2 is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.address_2?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">City</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="city"
                                            {...register("city", {
                                                required: {
                                                    value: true,
                                                    message: "City is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.city?.message} </p>
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col md="6">
                                <div>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Postcode</Form.Label>
                                        <Form.Control type="text" className="common-field"

                                            name="passcode"
                                            {...register("passcode", {
                                                required: {
                                                    value: true,
                                                    message: "Plan Name is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.passcode?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Country</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="country"
                                            {...register("country", {
                                                required: {
                                                    value: true,
                                                    message: "Country is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.country?.message} </p>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Image</Form.Label>
                                        <Form.Control type="file" id="developer-image"
                                         name="profile_picture"
                                         {...register("profile_picture", {
                                             required: {
                                                 value: true,
                                                 message: "Profile Picture is required",
                                             },
                                         })}
                                        className="d-none" />
                                        <Form.Label htmlFor="developer-image" className="upload-image-label d-block"><HiUpload/> Upload Image, Image must be jpg or png</Form.Label>
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <RexettButton
                                type="submit"
                                text="Update Profile"
                                className="main-btn px-5"
                                variant="transparent"
                                isLoading={smallLoader}
                            />
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
export default EditDeveloperProfile;