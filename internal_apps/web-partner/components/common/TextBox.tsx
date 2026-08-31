import React from 'react';

interface TextBoxProps {
  group: string;
  name: string;
  value: string;
  id: string;
  status: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  group,
  name,
  value,
  id,
  status,
  onChange,
  checked
}) => {
  return (
    <>
      <input
        className="textbox-radio d-none"
        type="radio"
        checked={checked === value}
        name={group}
        id={`${group}-${id}`}
        value={value}
        onChange={onChange}
      />
      <label
        className={`textbox ${status}`}
        htmlFor={`${group}-${id}`}
      >
        {name}
      </label>
    </>
  );
};

export default TextBox;