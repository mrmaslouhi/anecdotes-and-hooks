import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearInput = () => {
    setValue("");
  };

  return {
    name,
    value,
    onChange,
    clearInput,
  };
};
