import React, { useCallback, useContext, useState } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { Bell, Search } from "react-bootstrap-icons";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import useDebounce from "../../Hooks/useDebounce";

const Navbar = () => {
  const [active, setActive] = useState<string>("");
  const { currentUser }: any = useContext(CurrentUserContext);
  const [value, setValue] = useState("");

  const debounceOnChange = useDebounce(value);
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const activeHandler = useCallback(
    (opt: string) => {
      if (opt === active) {
        setActive("");
      } else {
        setActive(opt);
      }
    },
    [active]
  );
  return (
    <nav className="navbar">
      <div className="search-bar">
        <InputGroup>
          <Button className="search-button">
            <Search className="inline-icon" />
          </Button>
          <Form.Control placeholder="#hashtag" onChange={handleChange} />
        </InputGroup>
      </div>
      <div className="icon-items"></div>
    </nav>
  );
};

export default Navbar;
