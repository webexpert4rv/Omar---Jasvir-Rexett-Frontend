import React from 'react'
import { Form } from 'react-bootstrap'

function UploadFile({ handleImageUpload, text, name }) {
    return (
        <>
            <Form.Control
                type="file"
                className="upload-custom-field"
                name={name}
                id="company-logo"
                accept="image/jpeg, image/png, image/svg+xml"
                onChange={handleImageUpload}
            />
            <Form.Label htmlFor="company-logo" className="upload-field-label">
                {text}
            </Form.Label>




        </>
    )
}

export default UploadFile