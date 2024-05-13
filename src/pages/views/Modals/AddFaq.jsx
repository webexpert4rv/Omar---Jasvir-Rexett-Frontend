import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal, Form } from "react-bootstrap";
import RexettButton from "../../../components/atomic/RexettButton";
import { useForm } from "react-hook-form";
import { createFaq } from "../../../redux/slices/adminDataSlice";
import { getFaq } from "../../../redux/slices/clientDataSlice";
const AddFaq = ({ show, showFaqModal,isEdit,smallLoader}) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    defaultValues:{
      question:"",
      status:"",
      type:""
    }
  });

  useEffect(()=>{
  
    if(isEdit!==null){
      console.log("hell")
        setValue("question",isEdit?.question)
        setValue("status",isEdit?.status)
        setValue("type",isEdit?.type)
        setValue("user_type",isEdit?.user_type)
        setContent(isEdit?.answer)
    }else{
      setValue("question",'')
      setContent('')
      setValue("type",'')
      setValue("status",'')
      setValue("user_type",'')
    }

  },[isEdit])



  const onSubmit = async (value) => {
    let payload = {
      id:isEdit? isEdit?.id:null,
      question: value?.question,
      status: value?.status ?  value?.status :"not-active",
      type: value?.type,
      user_type:value?.user_type,
      answer: content,
    };
    await dispatch(createFaq(payload));
    dispatch(getFaq());
    showFaqModal()
  };

  return (
    <>
      <Modal
        show={show}
        onHide={showFaqModal}
        centered
        animation
        className="custom-modal w-100"
      >
        <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-4">
              <h3 className="popup-heading">{isEdit? "Edit Faq" : "Add Faq"}</h3>
              <div>
                {/* <Form.Label className="font-14">Add your question</Form.Label> */}
                <Form.Control
                  className="common-field"
                  placeholder="Enter your Question"
                  name="question"
                  {...register("question", {
                    required: {
                      value: true,
                      message: "Question is required",
                    },
                  })}
                ></Form.Control>
                <p className="error-message">{errors.question?.message}</p>
              </div>

              <div>
                <Form.Select
                  className="common-field"
                  {...register("user_type", {
                    required: {
                    value:true,
                      message: "Role is required",
                    },
                  })}
                >
                  <option disabled selected value="">
                    Select Role
                  </option>
                  <option value="developer">Developer</option>
                  <option value="vendor">Vendor</option>
                  <option value="client">Client</option>
                </Form.Select>
                <p className="error-message">{errors.user_type?.message}</p>
              </div>

              <div>
                <Form.Select
                  className="common-field"
                  {...register("type", {
                    required: {
                      value: true,
                      message: "Type is required",
                    },
                  })}
                >
                  <option selected disabled value="">
                    Select Type
                  </option>
                  <option value="general">General</option>
                  <option value="time_reporting">Time Reporting</option>
                  <option value="job_posting">Job Posting</option>
                </Form.Select>
              </div>

              <div className="d-flex gap-3 align-items-center my-3">
                <Form.Label className="font-14 mb-0">Status</Form.Label>
                <div className="form-check form-switch toggle-switch-wrapper">
                  <input
                    type="checkbox"
                    className="form-check-input toggle-switch-custom shadow-none"
                    id="custom-switch"
                    {...register("status", {
                      required: {
                        value: false,
                        message: "Status is required",
                      },
                    })}
                  />
                </div>
                <p className="error-message">{errors.status?.message}</p>
              </div>

              <div>
                <Form.Label className="font-14">Add your answer</Form.Label>

                <CKEditor
                  type=""
                  //   name={name}
                  editor={ClassicEditor}
                  config={{
                    // plugins: [ Paragraph, Bold, Italic, Essentials ],
                    toolbar: {
                      items: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "fontfamily",
                        "fontsize",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "bold",
                        "italic",
                        "strikethrough",
                        "subscript",
                        "superscript",
                        "|",
                        "link",
                        "blockQuote",
                        "|",
                        "bulletedList",
                        "numberedList",
                        ,
                        "outdent",
                        "indent",
                      ],
                    },
                  }}
                  //   config={{
                  //     ckfinder: {
                  //       // Upload the images to the server using the CKFinder QuickUpload command
                  //       // You have to change this address to your server that has the ckfinder php connector
                  //       uploadUrl: "" //Enter your upload url
                  //     }
                  //   }}
                  data={content}
                  onChange={(event, editor) => {
                    const value = editor.getData();
                    // setRequiredError(false);
                    setContent(value);
                  }}
                />
              </div>
            </Form.Group>
            <div className="text-center">
              <RexettButton
                type="submit"
                text="Submit"
                // onClick={callBackBtn}
                className="main-btn px-4 me-3 font-14 fw-semibold"
                variant="transparent"
                disabled={smallLoader}
                isLoading={smallLoader}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddFaq;
