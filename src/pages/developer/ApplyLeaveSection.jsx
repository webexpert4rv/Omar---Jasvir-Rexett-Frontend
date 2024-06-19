import { Row, Col, Form } from 'react-bootstrap';
import RexettButton from "../../components/atomic/RexettButton";
import { LEAVE_TYPE } from "../../components/clients/TimeReporiting/constant";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DateRangePicker } from "react-date-range";import { useSelector } from 'react-redux';


const ApplyLeaveSection=({ allContracts, handleRange,id,selectionRange,setSelectionRange , onSubmit, smallLoader  }) =>{
  const { register,handleSubmit ,setValue ,formState: { errors } } = useForm({});
  const {leaveDetails} = useSelector(state => state.developerData)
  const today = new Date();
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState({
    status: false,
    leaveId: '',
  });

 
  console.log(id ,"editleaveid")
  console.log(leaveDetails)

  useEffect(()=>{
    const selectedLeave = leaveDetails.find((item) => item.id == id);
    if (selectedLeave) {
      setSelectionRange({
        startDate: new Date(selectedLeave.start_date),
        endDate: new Date(selectedLeave.end_date),
        key: "selection",
      });

      setIsEdit({ status: true, leaveId: id });
      setValue("client_name", selectedLeave?.contract_id);
      setValue("leave_type", selectedLeave?.type);
      setValue("reason", selectedLeave?.reason_for_leave);
    }

  },[id])

  // const handleEditLeave = (id) => {
  //   console.log(id,"id")
  //   const selectedLeave = leaveDetails.find((item) => item.id == id);
  //   console.log(selectedLeave,"selectredleave")
  //   if (selectedLeave) {
  //     setSelectionRange({
  //       startDate: new Date(selectedLeave.start_date),
  //       endDate: new Date(selectedLeave.end_date),
  //       key: "selection",
  //     });

  //     setIsEdit({ status: true, leaveId: id });
  //     setValue("client_name", selectedLeave?.contract_id);
  //     setValue("leave_type", selectedLeave?.type);
  //     setValue("reason", selectedLeave?.reason_for_leave);
  //   }
  // };

  useEffect(()=>{
    if(id){

    }
  })

  return (
    <Row className="gx-4">
      <Col lg={7}>
        <div className="leave-calendar h-100">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleRange}
            minDate={today}
          />
        </div>
      </Col>
      <Col lg={5}>
        <div className="plan-leave-wrapper">
          <h3 className="section-head border-0 mb-3">Apply Leave</h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <Form.Label className="mb-2 font-14">Select Client</Form.Label>
              <Form.Select
                className="common-field font-14 mb-4"
                {...register("client_name", {
                  required: t("clientNameRequired"),
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select client
                </option>
                {allContracts?.map((item, idx) => (
                  <option key={idx} value={item?.id}>
                    {item?.client?.name}
                  </option>
                ))}
              </Form.Select>
              {errors.client_name && <span className="error-message">{errors.client_name.message}</span>}
            </div>
            <div className="mb-4">
              <Form.Label className="mb-2 font-14">Leave Type</Form.Label>
              <Form.Select
                className="common-field font-10 mb-4"
                {...register("leave_type", {
                  required: t("leaveTypeRequired"),
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select leave type
                </option>
                {LEAVE_TYPE.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.key}
                  </option>
                ))}
              </Form.Select>
              {errors.leave_type && <span className="error-message">{errors.leave_type.message}</span>}
            </div>
            <div className="mb-4">
              <Form.Label className="mb-2 font-14">Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                className="common-field font-14"
                placeholder="Enter Reason"
                {...register("reason", {
                  required: {
                    value: true,
                    message: t("reasonRequired"),
                  },
                })}
              />
              {errors.reason && <span className="error-message">{errors.reason.message}</span>}
            </div>
            <div className="text-center">
              <RexettButton
                type="submit"
                text={t("Submit")}
                className="main-btn font-14 px-4 py-2"
                variant="transparent"
                isLoading={smallLoader}
              />
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
}

export default ApplyLeaveSection;
