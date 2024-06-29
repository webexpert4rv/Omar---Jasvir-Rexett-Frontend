import React from "react";
import moment from "moment";

const CommonListingCard = ({
  title,
  startDate,
  endDate,
  bodyTitle1,
  bodyTitle2,
  onRemove,
  id,
  index
}) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <h2>{title}</h2>
        {startDate && <p>{startDate}</p>}-
        {/* {endDate && <p>{moment(endDate).format("YYYY-MM-DD")}</p>} */}
        {endDate && <p>{endDate}</p>}
        {onRemove && (
          <button
          type="button"
            className="remove-button"
            onClick={() => {
              onRemove(id,index);
            }}
          >
            ×
          </button>
        )}
      </div>
      <div className="card-body">
        <p>{bodyTitle1}</p>
        <p>{bodyTitle2}</p>
        </div>
    </div>
  );
};

export default CommonListingCard;
