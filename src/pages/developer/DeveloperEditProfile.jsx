import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import RexettButton from "../../components/atomic/RexettButton";
import { getDeveloperProfileDetails, updateDeveloperProfile } from "../../redux/slices/developerDataSlice";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { createNewFolderAndFile, filePreassignedUrlGenerate } from "../../redux/slices/clientDataSlice";
const EditDeveloperProfile = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});
    const dispatch = useDispatch();
    const [isPassword, setPassword] = useState({
        firstPass: false,
        secondPass: false
    })
    const [file,setFile]=useState(null)
    const { smallLoader, developerProfileData, screenLoader } = useSelector(state => state.developerData)

    useEffect(() => {
        dispatch(getDeveloperProfileDetails())
    }, [dispatch])

    useEffect(() => {

        setValue("name", developerProfileData?.data?.name)
        setValue("email", developerProfileData?.data?.email)
        setValue("phone_number", developerProfileData?.data?.phone_number)
        setValue("address", developerProfileData?.data?.address)
        setValue("address_2", developerProfileData?.data?.address_2)
        setValue("city", developerProfileData?.data?.city)
        setValue("country", developerProfileData?.data?.country)
        setValue("passcode", developerProfileData?.data?.passcode)
        setValue("profile_picture", developerProfileData?.data?.profile_picture)

    }, [developerProfileData])

    const onSubmit = (values) => {
        let formData = new FormData();
        let fileData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
      
        fileData.append("file",file);
        if(file==null){
            dispatch(updateDeveloperProfile(values)); 
        }else{
            dispatch(filePreassignedUrlGenerate(fileData, (url) => {
                let data = {
                    ...values,
                    "profile_picture": url,
                };
                // formData.append("file",data.s3_path);
                dispatch(updateDeveloperProfile(data));
            }));
        }
      
    };
    


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
        return true; // Password meets the criteria
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <section className="card-box">
                <h2 className="section-head mb-4">Update your Profile</h2>
                <div>
                    {screenLoader ? <ScreenLoader /> : <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Row className="mb-4">
                            <Col md="6">
                                <div className="inner-form">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Client Name</Form.Label>
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
                                        <Form.Label className="common-label">Email</Form.Label>
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
                                        <Form.Label className="common-label">Phone</Form.Label>
                                        <Form.Control type="tel" className="common-field"
                                            name="phone_number"
                                            {...register("phone_number", {
                                                required: {
                                                    value: true,
                                                    message: "Phone Number is required",
                                                },
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "Please enter a valid phone number"
                                                }
                                            })}
                                        />
                                        <p className="error-message">
                                            {errors.phone_number?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Previous Password</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control type={isPassword.firstPass ? "text" : "password"} className="common-field"
                                                name="previous_password"
                                                {...register("previous_password", {
                                                    validate: validatePassword
                                                })}
                                            />
                                            <span className="eye-btn" onClick={() => setPassword({ ...isPassword, firstPass: !isPassword.firstPass })}  ><FaEye /></span>
                                        </div>
                                        <p className="error-message">
                                            {errors.previous_password?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">New Password</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control type={isPassword.secondPass ? "text" : "password"} className="common-field"
                                                name="password"
                                                {...register("password", {
                                                    validate: validatePassword
                                                })}
                                            />
                                            <span className="eye-btn" onClick={() => setPassword({ ...isPassword, secondPass: !isPassword.secondPass })}><FaEye /></span>
                                        </div>
                                        <p className="error-message">
                                            {errors.password?.message} </p>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Address</Form.Label>
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
                                </div>
                            </Col>
                            <Col md="6">
                                <div>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Address 2</Form.Label>
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
                                        <Form.Label className="common-label">City</Form.Label>
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
                                        <Form.Label className="common-label">Postcode</Form.Label>
                                        <Form.Control type="text" className="common-field"

                                            name="passcode"
                                            {...register("passcode", {
                                                required: {
                                                    value: true,
                                                    message: "Plan Name is required",
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
                                        <Form.Label className="common-label">Country</Form.Label>
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
                                    <Form.Group className="mb-3">
                                        <Form.Label className="common-label">Image</Form.Label>
                                        <Form.Control type="file" id="developer-image"
                                            name="profile_picture"
                                            {...register("profile_picture", {
                                                onChange:(e)=>handleFileChange(e), 
                                                required: {
                                                    value: false,
                                                    message: "Profile Picture is required",
                                                },
                                            })}
                                            className="d-none" />
                                        <Form.Label htmlFor="developer-image" className="upload-image-label d-block"><HiUpload /> Upload Image, Image must be jpg or png</Form.Label>
                                    </Form.Group>

                                        <div>
                                            <img src={selectedImage?selectedImage:developerProfileData?.data?.profile_picture} alt="Selected" className="uploaded-image"/>
                                        </div>
                                    
                                </div>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <RexettButton
                                type="submit"
                                text="Update Profile"
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
export default EditDeveloperProfile;