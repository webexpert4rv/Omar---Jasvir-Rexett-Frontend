import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import logoWhite from '../../../assets/img/logo-white.png'
import authLoginImg from '../../../assets/img/login-img.png'
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/authenticationDataSlice";

const RexetLogin = ({userType}) => {
    const dispatch =useDispatch();
    const {smallLoader}=useSelector(state=>state.authData);
    const [isPassword,setPassword]=useState(false)
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});
     
      const onSubmit=(values)=>{
        let allRoles={
            client:"client",
            developer:"developer",
            admin:"admin"
        }
        let data={
            email:values.email,
            password:values.password,
            role:allRoles[`${userType}`]
        }
        dispatch(loginUser(data))
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
                                        <img src={logoWhite} className="logo-white" />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                       { userType==="client"? <Form.Group>
                                            <Form.Select className="p-0 border-0 bg-transparent text-white">
                                                <option value="client_login">Client Login</option>
                                                <option value="agency_login">Agency Login</option>
                                                <option value="developer_login">Developer Login</option>
                                            </Form.Select>
                                        </Form.Group>:
                                        <Link to={"#"} className="link-text text-decoration-none">{ userType=== "developer"?"Developer Login": "Agency Login"}</Link>
                                        }
                                        {/* <Link to={"#"} className="link-text text-decoration-none">Client Login</Link> */}
                                        <Link to={"#"} className="link-text">Register</Link>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Email</Form.Label>
                                            <Form.Control type="email" className="auth-field"
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
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Password</Form.Label>
                                            <div className="position-relative">
                                                <Form.Control type={isPassword?"text":"password"} className="auth-field pe-5" 
                                                name="password"
                                                {...register("password", {
                                                    required: {
                                                      value: true,
                                                      message: "Password is required",
                                                    },
                                                  })}
                                                />
                                                <span className="eye-btn" onClick={()=>setPassword(!isPassword)}><FaEye /></span>
                                            </div>
                                            <p className="error-message">
                                                {errors.password?.message}
                                                </p>
                                        </Form.Group>
                                        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                                            <Form.Check
                                                type="checkbox"
                                                id="remember_me"
                                                label="Remember Me"
                                                className="remeber-check"
                                            />
                                            <Link className="link-text">Forgot Password</Link>
                                        </div>
                                        <RexettButton 
                                        type="submit" 
                                        text="Login"
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
export default RexetLogin;