import { Textarea } from "@material-tailwind/react";
import { useField } from "formik";
import React from "react";

const TextareaWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configs = {
    ...field,
    ...otherProps,
  };

  if (meta.touched && meta.error) {
    configs.error = true;
    configs.helperText = meta.error;
  }
  return (
    <>
      <Textarea {...configs} />
      {meta.error ? (
        <p className="text-red-500 text-sm mt-1 px-1">{meta.error}</p>
      ) : null}
    </>
  );
};

export default TextareaWrapper;
