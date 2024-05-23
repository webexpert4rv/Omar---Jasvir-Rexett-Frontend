import React from "react";
import { Nav, Tab } from "react-bootstrap";

const Header = ({ data }) => {
  return (
    <div>
      <table className="table time-table table-bordered table-ui-custom">
        <thead>
          {data?.map((item) => (
            <th key={item} value={item} className="time-table-head">
              {item}
            </th>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Header;
