import React from "react";
import { Controller } from "react-hook-form";
import Autocomplete from "react-google-autocomplete";
import { Form } from "react-bootstrap";

const CommonAutocomplete = ({
    label,
    name,
    control,
    rules,
    error,
    apiKey,
    onPlaceSelected,
    options,
    placeholder = "",
}) => (
    <Form.Group className="mb-3">
        <Form.Label className="common-label">{label}</Form.Label>
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    apiKey={apiKey}
                    onPlaceSelected={onPlaceSelected}
                    options={options}
                    placeholder={placeholder}
                    className="common-field font-14 w-100"
                />
            )}
        />
        {error && <p className="error-message">{error.message}</p>}
    </Form.Group>
);

export default CommonAutocomplete;
