import React from "react";

import "./BottomBlur.css";

function BottomBlur() {
  return (
    <div
      className="global-bottom-blur"
      aria-hidden="true"
    >
      <div className="global-bottom-blur-layer" />

      <div className="global-bottom-blur-fade" />
    </div>
  );
}

export default BottomBlur;