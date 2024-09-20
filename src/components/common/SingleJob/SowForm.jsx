import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IoCheckmarkOutline } from "react-icons/io5";
import CommonInput from "../../atomic/CommonInput";
import devImg from '../../../assets/img/demo-img.jpg';
import { useForm } from "react-hook-form";

const SowForm = () => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm();
  return (
    <>

        <Col md={6} className="mb-3">
          <CommonInput
            label="Name"
            name="text"
            placeholder="Aviox Technologies"
            control={control}
            rules={{ required: "Name is required" }}
            error={errors.name}
            type="date"
          />
        </Col>

        <Col md={6} className="mb-3">
          <CommonInput
            label="Address"
            name="address"
            placeholder="Aviox Technologies"
            control={control}
            value="Mohali, Punjab"
            rules={{ required: "Address is required" }}
            error={errors.name}
            type="text"
          />
        </Col>
        <Col md={6} className="mb-3">
          <CommonInput
            label="Start Date"
            name="start_date"
            control={control}
            rules={{ required: "Date is required" }}
            error={errors.name}
            type="date"
          />
        </Col>
        <Col md={6} className="mb-3">
          <CommonInput
            label="Work Location"
            name="location"
            control={control}
            rules={{ required: "Date is required" }}
            error={errors.name}
            type="text"
          />
        </Col>
        <Col md={12} className="mb-0">
          <Form.Label>Working Hours</Form.Label>
        </Col>
        <Col md={6} className="mb-3">

          <CommonInput
            label="Start Time"
            name="start_time"
            control={control}
            rules={{ required: "Date is required" }}
            error={errors.name}
            type="time"
          />
        </Col>
        <Col md={6} className="mb-3">
          <CommonInput
            label="End Time"
            name="end_time"
            control={control}
            rules={{ required: "Date is required" }}
            error={errors.name}
            type="time"
          />
        </Col>
        <Col md={8} className="mb-3">
          <div className="d-flex align-items-center gap-3">
            <CommonInput
              label="Price (in dollars)"
              name="price"
              control={control}
              rules={{ required: "GST is required" }}
              error={errors.name}
              type="text"
            />
            <CommonInput
              label="Inc. GST"
              name="gst"
              control={control}
              rules={{ required: "GST is required" }}
              error={errors.name}
              type="checkbox"
            />
          </div>
        </Col>
        <Col md={12} className="mb-3">
          <CommonInput
            label="Scope of work"
            name="scope_work"
            control={control}
            rules={{ required: "GST is required" }}
            error={errors.name}
            type="textarea"
          />
        </Col>
    </>
  );
};

export default SowForm;
