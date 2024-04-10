import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import logoWhite from '../../../assets/img/logo-white-new.png'
import authLoginImg from '../../../assets/img/login-img-new.png'
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/authenticationDataSlice";

const RexetLogin = ({userType}) => {
    const dispatch =useDispatch();
    const navigate=useNavigate()
    const {smallLoader}=useSelector(state=>state.authData);
    const [isRemember,setRemember]=useState(false)
    const [email,setEmail]=useState("")
    const [isPassword,setPassword]=useState(false)
    const {
        register,
        setValue,
        handleSubmit,

        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});

      useEffect(()=>{
        let email=localStorage.getItem("email")
        if(email){
            setValue("email",email)
            setRemember(true)
        }

      },[])
     
      const onSubmit=(values)=>{
        localStorage.setItem("email",values.email)
        let allRoles={
            client:"client",
            developer:"developer",
            admin:"admin",
            vendor:"vendor"
        }
        let data={
            email:values.email,
            password:values.password,
            role:allRoles[`${userType}`],
            mac_address: "abc454tedgfdgfd"
        }
        dispatch(loginUser(data,()=>{
            navigate(`/otp`)
        }))
      }
    

      const handleRoles=(e)=>{
     navigate(`/${e.target.value}`)
      }

     const handleRemember=(e)=>{
        if(e.target.checked){
            localStorage.setItem("email",email)
            setRemember(true)
        }else{
            localStorage.removeItem("email")
            setRemember(false)
        }
     } 

     const currentRoles=(userType)=>{
        let allRoles={
            client:"Client Login",
            developer:"Developer Login",
            admin:"Admin Login",
            vendor:"Vendor Login"
        }

        return allRoles[userType]
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
                                    <div className="d-flex justify-content-between align-items-center mb-4 text-white">
                                      
                                        <Link to={"#"} className="link-text text-decoration-none">{currentRoles(userType)}</Link>
                                        
                                        {/* <Link to={"#"} className="link-text text-decoration-none">Client Login</Link> */}
                                        {/* <Link to={"#"} className="link-text">Register</Link> */}
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">Email</Form.Label>
                                            <Form.Control type="email" className="auth-field"
                                            name="email"
                                            {...register("email", {
                                                onChange:(e)=>setEmail(e.target.value),
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
                                                onChange={handleRemember}
                                                checked={isRemember}
                                                className="remeber-check"
                                            />
                                            <Link to={"/forgot-password"} className="link-text" >Forgot Password</Link>
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
export default RexetLogin;