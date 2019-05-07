import React from "react";

export default function InputWithLabel(props) {
  return (
    <div className={props.className}>
      <label
        htmlFor={props.id}
        className={`${props.className}__label`}
      >{props.labelText}</label>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`input ${props.className}__input`}
      />
    </div>
  );
}
