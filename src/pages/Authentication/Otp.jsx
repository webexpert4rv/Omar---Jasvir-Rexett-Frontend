import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import sidebarLogo from '../../assets/img/rexett-logo-white.png'
import authLoginImg from '../../assets/img/login-img-new.png'
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { getVerifyOtp, loginUser, resendOtpDispatch } from "../../redux/slices/authenticationDataSlice";
import OTPInput from "react-otp-input";
import RexettSpinner from "../../components/atomic/RexettSpinner";

const Otp = ({ userType }) => {
    const [otp, setOtpValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { smallLoader,otpLoader } = useSelector(state => state.authData);

    const {
        register,
        setValue,
        handleSubmit,

        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});


    const onSubmit = () => {
    let email = localStorage.getItem("email" )

        let data = {
           otp: otp,
           email: email
        }
        dispatch(getVerifyOtp(data))
    }


    const handleOtpInputChange = (otp) => {
        if (isNaN(otp)) return;
        setOtpValue(otp);
    };

  
    const resendOtpSys = () => {
        let email=localStorage.getItem("email")
        dispatch(resendOtpDispatch({email:email}))
    }

    return (
        <>
            <section className="auth-wrapper">
                <div className="h-100 ">
                    <Row className="mx-0 h-100 ">
                        <Col md={5} className="px-0">
                            <div className="inner-auth-wrapper h-100 d-flex justify-content-center flex-column position-relative">
                                <div>
                                    <div className="text-center mb-5 logo-auth-wrapper">
                                        <img src={sidebarLogo} className="logo-white" />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4 text-white">
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        {/* <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Email</Form.Label>
                                            <Form.Control type="email" className="auth-field"
                                                name="email"
                                                {...register("email", {
                                                    onChange: (e) => setEmail(e.target.value),
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
                                                {errors.email?.message}
                                            </p>
                                        </Form.Group> */}
                                        <Form.Group className="mb-4">
                                        <h2 className="text-center otp-heading ">Verify OTP</h2>
                                            <OTPInput className="mb-5"
                                                value={otp}
                                                onChange={handleOtpInputChange}
                                                numInputs={4}
                                                renderInput={(props) => (
                                                    <input
                                                        {...props}
                                                        placeholder="-"
                                                        className="otpInput"
                                                    />
                                                )}
                                                isInputNum={true}
                                                containerStyle="OTPInputContainer"
                                            />
                                        </Form.Group>
                                        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                                            {/* <Form.Check
                                                type="checkbox"
                                                id="remember_me"
                                                label="Remember Me"
                                                onChange={handleRemember}
                                                checked={isRemember}
                                                className="remeber-check"
                                            /> */}
                                            {/* <Link to={"/forgot-password"} className="link-text" >Forgot Password</Link> */}
                                        </div>
                                        <RexettButton
                                            type="submit"
                                            text="Submit"
                                            className="auth-btn d-block text-decoration-none"
                                            variant="transparent"
                                            isLoading={smallLoader}
                                        />
                                    </form>
                                    <div className="mt-3 text-center resend-top" onClick={resendOtpSys}>{otpLoader?<RexettSpinner/>: "Resend OTP"}</div>
                                </div>
                            </div>
                        </Col>
                        <Col md={7} className="h-100 d-md-block d-none">
                            <div className="h-100 text-center">
                                <img src={authLoginImg} className="auth-img" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}
export default Otp;