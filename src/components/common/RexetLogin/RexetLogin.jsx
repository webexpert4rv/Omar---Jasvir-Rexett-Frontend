import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";
import authLoginImg from '../../../assets/img/login-img-new.png'
import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/authenticationDataSlice";
import sidebarLogo from '../../../assets/img/rexett-logo-white.png'
import { useTranslation } from "react-i18next";
import { FaEyeSlash } from "react-icons/fa6";


const RexetLogin = ({userType}) => {
    const dispatch =useDispatch();
    const navigate=useNavigate()
    const {smallLoader }=useSelector(state=>state.authData);
    const [isRemember,setRemember]=useState(false)
    const [email,setEmail]=useState("")
    const [isPassword,setPassword]=useState(false)
    const { t } = useTranslation()
    function generateBrowserId() {
        const userAgent = navigator.userAgent;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const pixelRatio = window.devicePixelRatio;
        const browserId = `${userAgent}-${screenWidth}-${screenHeight}-${pixelRatio}`;
        return browserId;
      }
      
      const browserId = generateBrowserId();

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
            vendor:"vendor",
            subAdmin:"sub-admin"
        }
        let data={
            email:values.email,
            password:values.password,
            role:allRoles[`${userType}`],
            mac_address: browserId
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
            client:t("clientLogin"),
            developer:t("developerLogin"),
            admin:t("adminLogin"),
            vendor:t("vendorLogin")
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
                                    <a href="https://www.rexett.com/">  <img src={sidebarLogo} alt="Sidebar Logo"/></a>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4 text-white">
                                      
                                        <Link to={"#"} className="link-text text-decoration-none">{currentRoles(userType)}</Link>
                                        
                                        {/* <Link to={"#"} className="link-text text-decoration-none">Client Login</Link> */}
                                        {/* <Link to={"#"} className="link-text">Register</Link> */}
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="label-form">{t("email")}</Form.Label>
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
                                            <Form.Label className="label-form">{t("password")}</Form.Label>
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
                                                <span className="eye-btn" onClick={()=>setPassword(!isPassword)}>
                                                    {
                                                      isPassword ? <FaEyeSlash/> : <FaEye/>
                                                    }
                                                </span>
                                            </div>
                                            <p className="error-message">
                                                {errors.password?.message}
                                                </p>
                                        </Form.Group>
                                        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                                            <Form.Check
                                                type="checkbox"
                                                id="remember_me"
                                                label={t("rememberMe")}
                                                onChange={handleRemember}
                                                checked={isRemember}
                                                className="remeber-check"
                                            />
                                            <Link to={"/forgot-password"} className="link-text" >{t("forgotPassword")}</Link>
                                        </div>
                                        <RexettButton 
                                        type="submit" 
                                        text={t("login")}
                                        className="auth-btn d-block text-decoration-none"
                                        onClick={handleSubmit}
                                        variant="transparent"
                                        disabled={smallLoader}
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