import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import sidebarLogo from '../../assets/img/rexett-logo-white.png'
import authLoginImg from '../../assets/img/login-img.png'
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetPassword } from "../../redux/slices/authenticationDataSlice";

const ResetPassword = ({userType}) => {
    const dispatch =useDispatch();
    const navigate=useNavigate()
    const location=useLocation()
    let tkn=location.search.split("=")[1]
    const [isPassword,setPassword]=useState({
        firstPass:false,
        secondPass:false
    })
    const {smallLoader}=useSelector(state=>state.authData);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});
     
      const onSubmit=(values)=>{
        let newData={
            new_password:values.password,
            token:tkn
        }

     dispatch(resetPassword(newData))
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
                                        <img src={sidebarLogo} className="logo-white" />
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Password</Form.Label>
                                            <div className="position-relative">
                                            <Form.Control  type={isPassword.firstPass?"text":"password"} className="auth-field"
                                            placeholder="Enter Password"
                                            name="password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                  value: 8,
                                                  message: "Password must be at least 8 characters",
                                                },
                                                pattern: {
                                                  value:/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                                  message:
                                                    "Password must contain at least a symbol, upper and lower case letters and a number",
                                                },
                                              })}
                                            />
                                             <span className="eye-btn"onClick={()=>setPassword({...isPassword,firstPass:!isPassword.firstPass})}  ><FaEye /></span>
                                            </div>
                                           
                                            
                                             <p className="error-message">
                                                {errors.password?.message}
                                                </p>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Confirm Password</Form.Label>
                                            <div className="position-relative">
                                            <Form.Control  type={isPassword.secondPass?"text":"password"} className="auth-field"
                                            placeholder="Enter confirm Password"
                                            name="confirmPassword"
                                            {...register("confirmPassword", {
                                                required: "Confirm Password is required",
                                                validate: {
                                                  matchesPreviousPassword: (value) => {
                                                    const { password } = getValues();
                                                    return (
                                                      password === value ||
                                                      "The passwords do not match"
                                                    );
                                                  },
                                                },
                                              })}
                                            />
                                              <span className="eye-btn" onClick={()=>setPassword({...isPassword,secondPass:!isPassword.secondPass})}><FaEye /></span>
                                            </div>
                                            
                                             <p className="error-message">
                                                {errors.confirmPassword?.message}
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
export default ResetPassword;