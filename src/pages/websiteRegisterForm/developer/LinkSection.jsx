import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import { useFieldArray } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const LinkSection = ({ control, watch, errors, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "social_links",
  });

  const handleAppend = () => {
    const index = watch("social_links").findIndex(
      (curElem) => curElem.name === "" || curElem.url === ""
    );
    //if index value is less than 0 (.i.e -1) means no field is empty
    if (index < 0) {
      append({ name: "", url: "" });
    }
  };
  return (
    <div className="social-media-input">
      <label className="social-media-label">Social Media</label>
      {fields?.map((field, idx) => (
        <Fragment key={field.id}>
          <div className="input-group mb-3">
            <select
              {...register(`social_links.${idx}.name`, {
                required: "This field is required",
              })}
            >
              <option value="">Select</option>
              <option value="github_url">Github</option>
              <option value="linkedin_url">LinkedIn</option>
            </select>
            {errors?.social_links?.[idx]?.name && (
              <p className="error-message">
                {errors?.social_links?.[idx]?.name?.message}
              </p>
            )}
            <input
              {...register(`social_links.${idx}.url`, {
                required: "This field is required",
              })}
              type="text"
              placeholder="Enter URL"
            />
            {errors?.social_links?.[idx]?.url && (
              <p className="error-message">
                {errors?.social_links?.[idx]?.url?.message}
              </p>
            )}
            {watch("social_links")?.length !== 1 && (
              <button className="delete-button" onClick={() => remove(idx)}>
                <FaTimes />
              </button>
            )}
          </div>
        </Fragment>
      ))}
      <button type="button" className="appendButton" onClick={handleAppend}>
        +
      </button>

      <div className="social-links">
        {/* {socialLinks.map((link, index) => (
          <div key={index} className="social-link">
            <strong>{link.platform}:</strong> {link.url}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default LinkSection;
