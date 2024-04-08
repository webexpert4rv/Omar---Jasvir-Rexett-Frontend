import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import RexettButton from "../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { getVenderProfile } from "../../redux/slices/vendorDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";



const EditVendorProfile = () => {
    const dispatch = useDispatch()
    const { vendorProfile ,screenLoader } = useSelector(state => state.vendorData)
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

    useEffect(() => {
        setValue("vendor_name", vendorProfile?.data?.name)
        setValue("email", vendorProfile?.data?.email)
        setValue("phone_number", vendorProfile?.data?.phone_number)
        setValue("address", vendorProfile?.data?.address)
        setValue("address_2", vendorProfile?.data?.address_2)
        setValue("city", vendorProfile?.data?.city)
        setValue("country", vendorProfile?.data?.country)
        setValue("postcode", vendorProfile?.data?.passcode )

    }, [vendorProfile])

    useEffect(() => {
        setValue("company_name", vendorProfile?.data?.company?.name)
        setValue("company_email", vendorProfile?.data?.company?.email)
        setValue("company_phone_number", vendorProfile?.data?.company?.phone_number)
        setValue("company_address", vendorProfile?.data?.company?.address)
        setValue("company_address_2", vendorProfile?.data?.company?.address_2)
        setValue("company_city", vendorProfile?.data?.company?.city)
        setValue("company_country", vendorProfile?.data?.company?.country)
        setValue("company_postcode", vendorProfile?.data?.company?.passcode)

    }, [vendorProfile])

    useEffect(() => {
        dispatch(getVenderProfile())
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        // setValue()
    }

    return (
        <>
       {screenLoader ? <ScreenLoader/>: <>
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
                                                    name="password"
                                                    placeholder="Enter password"
                                                    {...register(`password`, {
                                                        required: "Password is required",
                                                    })}
                                                />
                                                {errors?.password && (
                                                    <p className="error-message">{errors.password.message}</p>
                                                )}
                                                <span className="eye-btn" onClick={() => setPassword({ ...password, firstPass: !password.firstPass })}><FaEye /></span>
                                            </div>

                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">New Password</Form.Label>
                                            <div className="position-relative">
                                                <Form.Control
                                                    type={password.secondPass ? "text" : "password"}
                                                    className="cv-field"
                                                    name="new_password"
                                                    placeholder="Enter New password"
                                                    {...register(`new_password`, {
                                                        required: "New Password is required",
                                                    })}
                                                />
                                                <span className="eye-btn" onClick={() => setPassword({ ...password, secondPass: !password.secondPass })}><FaEye /></span>
                                            </div>
                                            {errors?.new_password && (
                                                <p className="error-message">{errors.new_password.message}</p>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="common-label">Phone Number</Form.Label>
                                            <Form.Control
                                                type="number"
                                                className="cv-field"
                                                name="phone_number"
                                                placeholder="Enter phone_number"
                                                {...register(`phone_number`, {
                                                    required: "phone_number is required",
                                                })}
                                            />
                                            {errors?.phone_number && (
                                                <p className="error-message">{errors.phone_number.message}</p>
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
                                            <Form.Label className="common-label">Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="cv-field"
                                                name="company_address"
                                                placeholder="Enter Address"
                                                {...register(`company_address`, {
                                                    required: "Address is required",
                                                })}
                                            />
                                            {errors?.company_address && (
                                                <p className="error-message">{errors.company_address.message}</p>
                                            )}
                                        </Form.Group>
                                       < Form.Group className="mb-3">
                                            <Form.Label className="common-label">Phone Number</Form.Label>
                                        <Form.Control
                                                type="number"
                                                className="cv-field"
                                                name="company_phone_number"
                                                placeholder="Enter phone_number"
                                                {...register(`company_phone_number`, {
                                                    required: "company_phone_number is required",
                                                })}
                                            />
                                            {errors?.company_phone_number && (
                                                <p className="error-message">{errors.company_phone_number.message}</p>
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
                                                name="company_address2"
                                                placeholder="Enter Address"
                                                {...register(`company_address2`, {
                                                    required: "Address 2 is required",
                                                })}
                                            />
                                            {errors?.company_address2 && (
                                                <p className="error-message">{errors.company_address2.message}</p>
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
                                                name="company_postcode"
                                                placeholder="Enter postcode"
                                                {...register(`company_postcode`, {
                                                    required: "Postcode is required",
                                                })}
                                            />
                                            {errors?.company_postcode && (
                                                <p className="error-message">{errors.company_postcode.message}</p>
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
        </>}
        </>
    )
}
export default EditVendorProfile;