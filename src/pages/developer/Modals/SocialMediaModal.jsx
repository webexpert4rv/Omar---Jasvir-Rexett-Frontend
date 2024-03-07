import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";

const socialMediaOptions = [
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "Linkedin" },
    { value: "twitter", label: "Twitter" },
    { value: "github", label: "Github" },
    { value: "instagram", label: "Instagram" },
    { value: "gitlab", label: "Gitlab" },
    { value: "pinterest", label: "Pinterest" }
  ];

const SocialMediaModal = ({ show, handleClose,data }) => {
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
      const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "test",
      });

    const [socialMediaRows, setSocialMediaRows] = useState(fields);

    useEffect(() => {
        if (data) {
          data?.forEach((item, index) => {
            append({
             url:item.url,
             name:item.name
    
            });
          });
        }
        setSocialMediaRows(fields)
      }, [data]);
    const handleAddMore = () => {
        
    };

    console.log(fields,"fields")
    console.log(socialMediaRows,"socialMediaRows")

    // const handleDeleteRow = (id) => {
    //     const updatedRows = socialMediaRows.filter(row => row.id !== id);
    //     setSocialMediaRows(updatedRows);
    // };

    const handleSocialMediaChange = (e) => {
        console.log(e.target.value,"lll")
      let d=  fields?.some((item)=>item.name===e.target.value)
      console.log(d,"lll")

    };

    // const handleUrlChange = (index, value) => {
    //     const updatedRows = [...socialMediaRows];
    //     updatedRows[index].url = value;
    //     setSocialMediaRows(updatedRows);
    // };
    const onSubmit=(data)=>{

    }

    console.log(socialMediaRows,"socialMediaRows")

    return (
        <Modal show={show} onHide={handleClose} centered animation size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Social Media</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <Form.Select className="mb-2" onChange={handleSocialMediaChange}>
                                            <option selected disabled>Please Select media</option>
                                           {
                                            socialMediaOptions?.map((item)=>{
                                                return (
                                                    <>
                                                      <option value={item.label}>{item.label}</option>
                                                    </>
                                                )
                                            })
                                           }
                                        </Form.Select>
                                        <div className="text-end mb-3">
                        <Button className="main-btn py-2 px-3" onClick={handleAddMore}>Add More</Button>
                    </div>
                    {fields?.map((row, index) => (
                        <div className="experience-container" key={row.id}>
                            <Row>
                                <Col md="12">
                                    <Form.Group className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            {/* <Form.Label>Add Social Media</Form.Label> */}
                                            {index > 0 && <Button type="button" variant="danger" className="mb-3">Delete</Button>}
                                        </div>
                                       
                                        <Form.Label>{row.name}</Form.Label>
                                        <Form.Control type="text" className="cv-field" placeholder="Enter Url" 
                                         {...register(`test[${index}].url`, {
                                            required: "Url is required",
                                          })}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    <div className="text-center">
                        <Button variant="transparent" className="main-btn px-4">Submit</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default SocialMediaModal;
