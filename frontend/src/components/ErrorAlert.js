import React from "react";
import { Alert } from "react-bootstrap";

function ErrorAlert(props) {
  console.log(props.message);
  return (
    <div className="text-center">
      <Alert variant={props.variant}>{props.message}</Alert>
    </div>
  );
}

export default ErrorAlert;
