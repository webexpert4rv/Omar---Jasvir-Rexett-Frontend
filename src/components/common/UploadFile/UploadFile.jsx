import React from 'react'
import { Form } from 'react-bootstrap'

function UploadFile({handleImageUpload , text}) {
    return (
        <div>
            <Form.Control
                type="file"
                className="upload-custom-field"
                id="company-logo"
                accept="image/jpeg, image/png, image/svg+xml"
                onChange={handleImageUpload}
            />
            <Form.Label htmlFor="company-logo" className="upload-field-label">
                {text}
            </Form.Label>




        </div>
    )
}

export default UploadFile