import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import sidebarLogo from '../../assets/img/rexett-logo-white.png'
import authLoginImg from '../../assets/img/login-img-new.png'
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/slices/authenticationDataSlice";

const ForgotPassword = ({userType}) => {
    const dispatch =useDispatch();
    const navigate=useNavigate()
    const {smallLoader}=useSelector(state=>state.authData);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});
     
      const onSubmit=(values)=>{
     dispatch(forgotPassword(values))
      }


    return (
        <>
            <section className="auth-wrapper">
                <div className="h-100">
                    <Row className="mx-0 h-100">
                        <Col md={5} className="px-0">
                            <div className="inner-auth-wrapper h-100 d-flex justify-content-center flex-column position-relative">
                                <div>
                                    <div className="text-center mb-5 logo-auth-wrapper">
                                    <a href="https://rexett-web.rvtechnologies.in/">  <img src={sidebarLogo} alt="Sidebar Logo"/></a>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Email</Form.Label>
                                            <Form.Control type="email" className="auth-field"
                                            placeholder="Enter your email"
                                            name="email"
                                            {...register("email", {
                                                required: {
                                                  value: true,
                                                  message: "Email is required",
                                                },
                                              })}
                                            />
                                             <p className="error-message">
                                                {errors.email?.message}
                                                </p>
                                        </Form.Group>

                                        <RexettButton 
                                        type="submit" 
                                        text="Submit"
                                        className="auth-btn d-block text-decoration-none"
                                        variant="transparent"
                                        isLoading={smallLoader}
                                        />
                                    </form>
                                </div>
                            </div>
                        </Col>
                        <Col md={7} className="h-100">
                            <div className="h-100">
                                <img src={authLoginImg} className="auth-img" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}
export default ForgotPassword;