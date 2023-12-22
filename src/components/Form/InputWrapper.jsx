import { Input } from "@material-tailwind/react";
import { useField } from "formik";
import React from "react";

const InputWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configs = {
    ...field,
    ...otherProps,
  };

  if (meta.touched && meta.error) {
    configs.error = true;
  }
  return (
    <>
      <Input {...configs} />
      {meta.error ? (
        <p className="text-red-500 text-sm mt-1 px-1">{meta.error}</p>
      ) : null}
    </>
  );
};

export default InputWrapper;
