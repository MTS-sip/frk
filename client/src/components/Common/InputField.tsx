import React from 'react';
import { Form, Input } from 'semantic-ui-react';

interface InputFieldProps {
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder, type = 'text' }) => {
  return (
    <Form.Field>
      {label && <label>{label}</label>}
      <Input placeholder={placeholder} value={value} onChange={onChange} type={type} />
    </Form.Field>
  );
};

export default InputField;