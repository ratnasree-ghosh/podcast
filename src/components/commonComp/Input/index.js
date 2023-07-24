import React from "react";
import "./style.css";

const InputComponenet = ({ type, state, placeholder, setState, required }) => {
  return (
    <div>
      <input
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
        required={required}
      />
    </div>
  );
};

export default InputComponenet;
