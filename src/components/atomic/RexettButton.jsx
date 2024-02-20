import React from "react";
import { Button } from "react-bootstrap";
import RexettSpinner from "./RexettSpinner";

const RexettButton = ({ type, text, className, variant, isLoading }) => {
  return (
    <Button type={type} variant={variant} className={className}>
      {isLoading ? <RexettSpinner /> : text}
    </Button>
  );
};

export default RexettButton;
