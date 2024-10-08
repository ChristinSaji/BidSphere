// Author: Christin Saji

/* eslint-disable react/prop-types */
import React from 'react';

const RadioField = ({
  label,
  value,
  onChange,
  name,
  checked,
  className = '',
}) => (
  <div className={`flex items-center ${className}`}>
    <input
      type="radio"
      value={value}
      onChange={onChange}
      name={name}
      id={name + value}
      checked={checked}
      className={`appearance-none h-4 w-4 border border-bsnavyblue rounded-full bg-white checked:bg-bslightblue ${className}`}
    />
    <label htmlFor={name + value} className="ml-2 text-gray-900">{label}</label>
  </div>
);

export default RadioField;
