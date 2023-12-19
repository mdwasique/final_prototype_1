import React from "react";

const CheckoutSteps = (props) => {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Sign-in</div>
      <div className={props.step2 ? "active" : ""}>Form</div>
      <div className={props.step3 ? "active" : ""}>Apply Course</div>
    </div>
  );
};

export default CheckoutSteps;
