import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../components/atomic/RexettButton";
import { getClientProfile, updateClientProfile } from "../../redux/slices/clientDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { getAdminProfile, updateAdminProfile } from "../../redux/slices/adminDataSlice";
import { useTranslation } from "react-i18next";

const EditAdminProfile = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});
    const dispatch = useDispatch();
    const [isPassword,setPassword]=useState({
        firstPass:false,
        secondPass:false
    })
    const {smallLoader,profileData,screenLoader}=useSelector(state=>state.adminData)
    const { t } = useTranslation()
    useEffect(()=>{
       dispatch(getAdminProfile())
    },[dispatch])

    useEffect(()=>{
        setValue("name",profileData?.data?.name)
        setValue("email",profileData?.data?.email)
        setValue("phone_number",profileData?.data?.phone_number)
        setValue("address",profileData?.data?.address)
        setValue("address_2",profileData?.data?.address_2)
        setValue("city",profileData?.data?.city)
        setValue("country",profileData?.data?.country)
        setValue("passcode",profileData?.data?.passcode)
         
    },[profileData])

    const onSubmit = (values) => {
        let formData={
            ...values,
            password:values.password?values.password:null,
            previous_password:values.previous_password?values.previous_password:null
        }
     dispatch(updateAdminProfile(formData))
    }

    const validatePassword = (value) => {
        if (value === "") {
            return true; // Password is not required, so return true if empty
        } else {
            // Check if password matches the pattern
            const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!pattern.test(value)) {
                return "Password must contain at least a symbol, upper and lower case letters and a number";
            }
        }
        return true;
    };
    return (
        <>
            <section className="card-box">
                <h2 className="section-head mb-4 pb-3">{t("updateYourProfile")}</h2>
                <div>
                  {screenLoader?<ScreenLoader/>:  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Row className="mb-4">
                            <Col md="6">
                                <div className="inner-form">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("adminName")} *</Form.Label>
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
                                        <Form.Label className="common-label">{t("email")} *</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="email"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "Email is required",
                                                },
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: 'Invalid email format',
                                                  },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.email?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("phone")} *</Form.Label>
                                        <Form.Control type="tel" className="common-field"
                                            name="phone_number"
                                            {...register("phone_number", {
                                                required: {
                                                    value: true,
                                                    message: "Phone Number is required",
                                                },
                                                pattern: {
                                                    value:  /^[0-9]{10}$/,
                                                    message: "Please enter a valid phone number"
                                                }
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.phone_number?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("previousPassword")}</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control type={isPassword.firstPass?"text":"password"} className="common-field"
                                                name="previous_password"
                                                {...register("previous_password", {
                                                    validate: validatePassword
                                                })}
                                            />
                                            <span className="eye-btn"onClick={()=>setPassword({...isPassword,firstPass:!isPassword.firstPass})}  ><FaEye /></span>
                                        </div>
                                        <p className="error-message">
                                            {errors.previous_password?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("newPassword")}</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control  type={isPassword.secondPass?"text":"password"}  className="common-field"
                                                name="password"
                                                {...register("password", {
                                                    validate: validatePassword
                                                })}
                                            />
                                             <span className="eye-btn" onClick={()=>setPassword({...isPassword,secondPass:!isPassword.secondPass})}><FaEye /></span>
                                        </div>
                                        <p className="error-message">
                                            {errors.password?.message} </p>
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col md="6">
                                <div>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("address")} *</Form.Label>
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
                                        <Form.Label className="common-label">{t("address")} 2</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="address_2"
                                            {...register("address_2", {
                                                required: {
                                                    value: false,
                                                    message: "Address 2 is required",
                                                },
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.address_2?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("city")} *</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="city"
                                            {...register("city", {
                                                required: {
                                                    value: true,
                                                    message: "City is required",
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z\s]+$/,
                                                    message: "Country should not contain numbers or special character",
                                                }
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.city?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("postCode")} *</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="passcode"
                                            {...register("passcode", {
                                                required: {
                                                    value: true,
                                                    message: "Pass code is required",
                                                },
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Passcode should only contain numbers",
                                                }
                                                
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.passcode?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("country")} *</Form.Label>
                                        <Form.Control type="text" className="common-field"
                                            name="country"
                                            {...register("country", {
                                                required: {
                                                    value: true,
                                                    message: "Country is required",
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z\s]+$/,
                                                    message: "Country should not contain numbers or special character",
                                                }
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.country?.message} </p>
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <RexettButton
                                type="submit"
                                text={t("updateProfile")}
                                className="main-btn px-5"
                                variant="transparent"
                                isLoading={smallLoader}
                            />
                        </div>
                    </form>}
                </div>
            </section>
        </>
    )
}
export default EditAdminProfile;