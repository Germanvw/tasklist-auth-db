import { useState } from "react";
export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const reset = () => {
    setValues(initialState);
  };

  return [values, handleChange, reset];
};
