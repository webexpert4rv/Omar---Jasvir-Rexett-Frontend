import React from "react";

const Guidelines = ({heading ,guideLines}) => {
  return (
    <div>
      <div className="helper-text-section">
        <h3>{heading}</h3>
        <ol className="ps-3  mb-0">
          {guideLines?.map((lines, index) => (
            <li className="mb-1">
              <p key={index}> {lines} </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Guidelines;
