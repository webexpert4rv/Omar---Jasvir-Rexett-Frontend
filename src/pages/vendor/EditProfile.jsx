import React, { useState } from "react";
import { Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch } from "react-redux";



const EditVendorProfile = () => {
    const dispatch = useDispatch()
    const [password , setPassword] = useState({
        firstpass : false ,
        secondpass : false , 
    })

    const {
        register,
        control,
        setValue,
        watch,
        handleSubmit,
        reset,
        trigger,
        setError,
        formState: { errors },
    } = useForm();

    // const onSubmit = ()=>{
    //     dispatch(())
    // }

    return (
        <>
            <section className="card-box">
                <div>
                    <div>
                        <h2 className="section-head mb-4">Update Your Profile</h2>
                        {/* <Form onSubmit={handleSubmit(onSubmit)} noValidate> */}
                        <Form>
                            <Row className="mb-4">
                                <Col md="6">
                                    <div className="inner-form">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Vendor Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="vendor_name"
                                                placeholder="Enter Vendor Name"
                                                {...register(`vendor_name`, {
                                                    required: "Vendor name is required",
                                                })}
                                            />
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="email"
                                                placeholder="Enter Vendor Name"
                                                {...register(`email`, {
                                                    required: "Email is required",
                                                })}
                                            />
                                             {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Previous Password</Form.Label>
                                            <div className="position-relative">
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="password"
                                                placeholder="Enter password"
                                                {...register(`password`, {
                                                    required: "Password is required",
                                                })}
                                            />
                                             {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                                <button className="eye-btn"><FaEye /></button>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">New Password</Form.Label>
                                            <div className="position-relative">
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="new_password"
                                                placeholder="Enter New password"
                                                {...register(`new_password`, {
                                                    required: "New Password is required",
                                                })}
                                            />
                                             {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                                <button className="eye-btn"><FaEye /></button>
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="address"
                                                placeholder="Enter Address"
                                                {...register(`address`, {
                                                    required: "Address is required",
                                                })}
                                            />
                                             {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Address 2</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="address2"
                                                placeholder="Enter Address2"
                                                {...register(`address2`, {
                                                    required: "Address2 is required",
                                                })}
                                            />
                                             {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="city"
                                                placeholder="Enter City"
                                                {...register(`city`, {
                                                    required: "City is required",
                                                })}
                                            />
                                             {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Postcode</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="postcode"
                                                placeholder="Enter postcode"
                                                {...register(`postcode`, {
                                                    required: "Postcode is required",
                                                })}
                                            />
                                             {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="country"
                                                placeholder="Enter Country name"
                                                {...register(`country`, {
                                                    required: "Country is required",
                                                })}
                                            />
                                             {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div>
                        <h2 className="section-head mb-4">Update Company Profile</h2>
                        <Form>
                            <Row className="mb-4">
                                <Col md="6">
                                    <div className="inner-form">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Company Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="company_name"
                                                placeholder="Enter Company Name"
                                                {...register(`company_name`, {
                                                    required: "Company name is required",
                                                })}
                                            />
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="email"
                                                placeholder="Enter Email"
                                                {...register(`email`, {
                                                    required: "Email is required",
                                                })}
                                            />
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Previous Password</Form.Label>
                                            <div className="position-relative">
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="password"
                                                placeholder="Enter password"
                                                {...register(`password`, {
                                                    required: "Password is required",
                                                })}
                                            />
                                                <button className="eye-btn"><FaEye /></button>
                                            </div>
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">New Password</Form.Label>
                                            <div className="position-relative">
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="new_password"
                                                placeholder="Enter New password"
                                                {...register(`new_password`, {
                                                    required: "New password is required",
                                                })}
                                            />
                                                <button className="eye-btn" onClick={handleClick}><FaEye /></button>
                                            </div>
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="address"
                                                placeholder="Enter Address"
                                                {...register(`address`, {
                                                    required: "Address is required",
                                                })}
                                            />
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Address 2</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="address 2"
                                                placeholder="Enter Address"
                                                {...register(`address 2`, {
                                                    required: "Address 2 is required",
                                                })}
                                            />
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="city"
                                                placeholder="Enter city"
                                                {...register(`city`, {
                                                    required: "City is required",
                                                })}
                                            />
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Postcode</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="postcode"
                                                placeholder="Enter postcode"
                                                {...register(`postcode`, {
                                                    required: "Postcode is required",
                                                })}
                                            />
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="country"
                                                placeholder="Enter Country"
                                                {...register(`country`, {
                                                    required: "Country is required",
                                                })}
                                            />
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <RexettButton
                                    type="onSubmit"
                                    text="Update profile"
                                    className="main-btn px-4"
                                    variant="transparent"
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}
export default EditVendorProfile;