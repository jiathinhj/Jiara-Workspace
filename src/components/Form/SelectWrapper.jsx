import { Select, Option } from "@material-tailwind/react";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ label, name, options, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (value) => {
    setFieldValue(name, value);
  };

  const configs = {
    ...field,
    otherProps,
    select: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configs.error = true;
  }

  return (
    <>
      <Select onChange={handleChange} label={label}>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.value}
          </Option>
        ))}
      </Select>
      {meta.error ? (
        <p className="text-red-500 text-sm mt-1 px-1">{meta.error}</p>
      ) : null}
    </>
  );
};

export default SelectWrapper;
