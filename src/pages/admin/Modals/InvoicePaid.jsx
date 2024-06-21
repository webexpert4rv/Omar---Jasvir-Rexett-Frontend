import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
const InvoicePaidModal = ({ show, handleClose }) => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const onSubmit = (values) => {

    }
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-4">
                        <Form.Label className="d-block text-center font-18">Are you sure?</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control {...register("transaction_id",{required:"Transaction ID is required"})} className="common-field" placeholder="Enter Transaction ID*" />
                        {errors?.transaction_id && <p className="error-message">{errors?.transaction_id?.message}</p>}
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit" variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default InvoicePaidModal;