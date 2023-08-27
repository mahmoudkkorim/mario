import React from "react";

import "./spinner.css";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center flex-1">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
