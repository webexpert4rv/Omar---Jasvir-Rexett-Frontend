import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../components/atomic/RexettButton";
import { getClientProfile, updateClientProfile } from "../../redux/slices/clientDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import { FaTrashCan } from "react-icons/fa6";

const EditProfile = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [isPassword,setPassword]=useState({
        firstPass:false,
        secondPass:false
    })
    const {smallLoader,clientProfileDetails,screenLoader}=useSelector(state=>state.clientData)

    useEffect(()=>{
       dispatch(getClientProfile())
    },[dispatch])

    useEffect(()=>{
        setValue("name",clientProfileDetails?.data?.name)
        setValue("email",clientProfileDetails?.data?.email)
        setValue("phone_number",clientProfileDetails?.data?.phone_number)
        setValue("address",clientProfileDetails?.data?.address)
        setValue("address_2",clientProfileDetails?.data?.address_2)
        setValue("city",clientProfileDetails?.data?.city)
        setValue("country",clientProfileDetails?.data?.country)
        setValue("passcode",clientProfileDetails?.data?.passcode)
         
    },[clientProfileDetails])

    const onSubmit = (values) => {
        let formData={
            ...values,
            password:values.password?values.password:null,
            previous_password:values.previous_password?values.previous_password:null
        }
     dispatch(updateClientProfile(formData))
    }
    const deleteprofile = (
        <Tooltip id="tooltip">
          Delete Profile
        </Tooltip>
      );
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
                <div className="d-flex justify-content-between pb-2 mb-3 border-bottom-grey">
                    <h2 className="section-head-sub mb-0 border-0">{t("updateYourProfile")}</h2>
                    <OverlayTrigger placement="bottom" overlay={deleteprofile}>
                        <Button className="delete-btn"><FaTrashCan /></Button>
                    </OverlayTrigger>
                </div>
                <div>
                  {screenLoader?<ScreenLoader/>:  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Row className="mb-4">
                            <Col md="6">
                                <div className="inner-form">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">{t("clientName")}</Form.Label>
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
                                        <Form.Label className="common-label">{t("email")}</Form.Label>
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
                                        <Form.Label className="common-label">{t("phone")}</Form.Label>
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
                                        <Form.Label className="common-label">{t("address")}</Form.Label>
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
                                        <Form.Label className="common-label">{t("city")}</Form.Label>
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
                                        <Form.Label className="common-label">{t("postCode")}</Form.Label>
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
                                        <Form.Label className="common-label">{t("country")}</Form.Label>
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
export default EditProfile;