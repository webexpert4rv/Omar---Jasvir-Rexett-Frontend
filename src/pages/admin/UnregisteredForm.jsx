import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoCloudUploadOutline } from "react-icons/io5";
import BasicDetail from "./StepForm/BasicDetails";
const UnregisteredForm = () => {
    return (
        <>
            <div className="apply-job-section">
                <Container>
                    <div>
                        <BasicDetail />
                    </div>
                </Container>
            </div>
        </>
    )
}
export default UnregisteredForm;