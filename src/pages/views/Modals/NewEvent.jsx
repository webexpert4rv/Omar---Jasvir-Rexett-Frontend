import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
import { useForm } from "react-hook-form";
import { getAddHoliday, getLeaveList } from "../../../redux/slices/clientDataSlice";
import { useDispatch, useSelector } from "react-redux";
const NewEvent = ({ show, handleClose ,status}) => {
    const dispatch = useDispatch()
    const { leaveList } = useSelector((state) => state.clientData);
    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});

   useEffect(()=>{
    const selectedHoliday = leaveList?.find((value)=>value.id===status?.id)
        if(status?.status==="edit"){
        setValue("name",selectedHoliday?.name)
        setValue("country",selectedHoliday?.country)
        setValue("description",selectedHoliday?.description)
        setValue("date",selectedHoliday?.date)
        }
    },[status,leaveList])

    const onSubmit = async (values) => {
        const payload = {
            country: values?.country,
            name: values?.name,
            description: values?.description,
            date: values?.date
        }
        await dispatch(getAddHoliday(payload))
        dispatch(getLeaveList())
        handleClose()
        reset()

    }

    return (
        <Modal show={show} onHide={(e) => handleClose(e)} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
                {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Create New Holiday</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className="d-block font-14">Holiday Name</Form.Label>
                                <Form.Control type="text" className="common-field font-14"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Event name is required"
                                        }
                                    })}

                                />
                                <p className="error-message">
                                    {errors?.name?.message}
                                </p>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label className="d-block font-14">Country</Form.Label>
                                <Form.Control type="text" className="common-field font-14"
                                    {...register("country", {
                                        required: {
                                            value: true,
                                            message: "Country is required"
                                        }
                                    })}

                                />
                                <p className="error-message">
                                    {errors?.name?.message}
                                </p>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label className="d-block font-14">Description</Form.Label>
                                <Form.Control type="text" className="common-field font-14"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: "Description is required"
                                        }
                                    })}

                                />
                                <p className="error-message">
                                    {errors?.name?.message}
                                </p>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label className="d-block font-14">Date</Form.Label>
                                <Form.Control type="date" className="common-field font-14"
                                    {...register("date", {
                                        required: {
                                            value: true,
                                            message: "Date is required"
                                        }
                                    })} />
                                <p className="error-message">
                                    {errors?.date?.message}
                                </p>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <div className="d-flex align-items-center gap-2 justify-content-center">
                                <div className="text-center ">
                                    <RexettButton
                                        type="submit"
                                        text="Submit"
                                        className="main-btn px-4 me-2 font-14 fw-semibold"
                                        variant="transparent"
                                    />
                                </div>
                                <div className="text-center"> <RexettButton type="button" variant="transparent"  onClick = {handleClose} text = "Cancel" className="outline-main-btn font-14 fw-semibold bg-transparent border-black text-black px-4"/></div> 
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default NewEvent;