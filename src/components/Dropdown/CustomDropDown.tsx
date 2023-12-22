import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

const CustomDropDown = ({ children }: any) => {
  const [value, setValue] = useState("");
  return (
    <Dropdown>
      <Dropdown.Toggle>Custom toggle</Dropdown.Toggle>
      <Dropdown.Menu>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <Dropdown.Item>{children}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropDown;
