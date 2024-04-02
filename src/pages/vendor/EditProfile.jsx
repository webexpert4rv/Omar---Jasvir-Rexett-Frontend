import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch } from "react-redux";



const EditVendorProfile = () => {
    const dispatch = useDispatch()
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

    const [password, setPassword] = useState({
        firstPass: false,
        secondPass: false,
        thirdPass: false,
        fourthPass: false,
    })


    const [values, setValues] = useState({
        vendor_name: " ",
        email: "",
        password: "",
        new_password1: "",
        address: "",
        address2: "",
        city: "",
        postcode: "",
        country: "",
        company_email: "",
    })

    const onSubmit = () => {
        // setValues(values)
    }

    return (
        <>
            <section className="card-box">
                <div>
                    <div>
                        <h2 className="section-head mb-4">Update Your Profile</h2>
                        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                                                    required: "vendor_name is required",
                                                })}
                                            />
                                            {errors?.vendor_name && (
                                                <p className="error-message">{errors.vendor_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Email</Form.Label>
                                           <div>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="email"
                                                placeholder="Enter Email "
                                                {...register(`email`, {
                                                    required: "Email is required",
                                                })}
                                            />
                                            {errors?.email && (
                                                <p className="error-message">{errors.email.message}</p>
                                            )}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Previous Password</Form.Label>
                                            <div className="position-relative">
                                                <Form.Control
                                                    type={password.firstPass ? "text" : "password"}
                                                    className="cv-field"
                                                    name="password1"
                                                    placeholder="Enter password"
                                                    {...register(`password1`, {
                                                        required: "Password is required",
                                                    })}
                                                />
                                                <span className="eye-btn" onClick={() => setPassword({ ...password, firstPass: !password.firstPass })}><FaEye /></span>
                                            </div>
                                            {errors?.password1 && (
                                                    <p className="error-message">{errors.password1.message}</p>
                                                )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">New Password</Form.Label>
                                            <div className="position-relative">
                                                <Form.Control
                                                    type={password.secondPass ? "text" : "password"}
                                                    className="cv-field"
                                                    name="new_password1"
                                                    placeholder="Enter New password"
                                                    {...register(`new_password1`, {
                                                        required: "New Password is required",
                                                    })}
                                                />
                                                <span className="eye-btn" onClick={() => setPassword({ ...password, secondPass: !password.secondPass })}><FaEye /></span>
                                            {errors?.new_password1 && (
                                                    <p className="error-message">{errors.new_password1.message}</p>
                                                )}
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
                                            {errors?.address && (
                                                <p className="error-message">{errors.address.message}</p>
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
                                            {errors?.address2 && (
                                                <p className="error-message">{errors.address2.message}</p>
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
                                            {errors?.city && (
                                                <p className="error-message">{errors.city.message}</p>
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
                                            {errors?.postcode && (
                                                <p className="error-message">{errors.postcode.message}</p>
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
                                            {errors?.country && (
                                                <p className="error-message">{errors.country.message}</p>
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
                                            {errors?.company_name && (
                                                <p className="error-message">{errors.company_name.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="company_email"
                                                placeholder="Enter Email"
                                                {...register(`company_email`, {
                                                    required: "Email is required",
                                                })}
                                            />
                                            {errors?.company_email && (
                                                <p className="error-message">{errors.company_email.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Previous Password</Form.Label>
                                            <div className="position-relative">
                                                <Form.Control
                                                    type={password.thirdPass ? "text" : "password"}
                                                    className="cv-field"
                                                    name="password2"
                                                    placeholder="Enter password"
                                                    {...register(`password2`, {
                                                        required: "Password is required",
                                                    })}
                                                />
                                                <span className="eye-btn" onClick={() => setPassword({ ...password, thirdPass: !password.thirdPass })}><FaEye /></span>
                                            </div>
                                            {errors?.password2 && (
                                                <p className="error-message">{errors.password2.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">New Password</Form.Label>
                                            <div className="position-relative">
                                                <Form.Control
                                                    type={password.fourthPass ? "text" : "password"}
                                                    className="cv-field"
                                                    name="new_password2"
                                                    placeholder="Enter New password"
                                                    {...register(`new_password2`, {
                                                        required: "New password is required",
                                                    })}
                                                />
                                                <span className="eye-btn" onClick={() => setPassword({ ...password, fourthPass: !password.fourthPass })}><FaEye /></span>
                                            </div>
                                            {errors?.new_password2 && (
                                                <p className="error-message">{errors.new_password2.message}</p>
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
                                            {errors?.address && (
                                                <p className="error-message">{errors.address.message}</p>
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
                                                name="address 2"
                                                placeholder="Enter Address"
                                                {...register(`address 2`, {
                                                    required: "Address 2 is required",
                                                })}
                                            />
                                            {errors?.address2 && (
                                                <p className="error-message">{errors.address2.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="company_city"
                                                placeholder="Enter city"
                                                {...register(`company_city`, {
                                                    required: "City is required",
                                                })}
                                            />
                                            {errors?.company_city && (
                                                <p className="error-message">{errors.company_city.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Postcode</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="postcode2"
                                                placeholder="Enter postcode"
                                                {...register(`postcode2`, {
                                                    required: "Postcode is required",
                                                })}
                                            />
                                            {errors?.postcode2 && (
                                                <p className="error-message">{errors.postcode2.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="company_country"
                                                placeholder="Enter Country"
                                                {...register(`company_country`, {
                                                    required: "Country is required",
                                                })}
                                            />
                                            {errors?.company_country && (
                                                <p className="error-message">{errors.company_country.message}</p>
                                            )}
                                        </Form.Group>
                                    </div>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <RexettButton
                                    type="submit"
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