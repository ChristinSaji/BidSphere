import React from 'react';

function Textarea({
  placeholder = '', value, onChange, name, className,
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bsnavyblue ${className}`}
    >
    </textarea>
  );
}

export default Textarea;
