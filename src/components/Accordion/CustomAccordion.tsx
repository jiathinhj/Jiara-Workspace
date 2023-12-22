import {
  ChevronDownIcon,
  ChevronRightIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const CustomAccordion = ({
  value,
  icon,
  label,
  listItems,
  onClick,
  ...otherProps
}: any) => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (num: any) => {
    setOpen(open === num ? 0 : num);
  };

  return (
    <Accordion
      open={open === value}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            open === value ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={open === value}>
        <AccordionHeader
          onClick={() => handleOpen(value)}
          className="border-b-0 p-3"
        >
          <ListItemPrefix>{icon}</ListItemPrefix>
          <Typography className="mr-auto font-normal">{label}</Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List className="p-0">
          {listItems?.map((item: any) => (
            <ListItem className={otherProps} onClick={onClick}>
              <ListItemPrefix>
                {item.icon || <HeartIcon strokeWidth={3} className="h-3 w-5" />}
              </ListItemPrefix>
              {item.label}
            </ListItem>
          ))}
        </List>
      </AccordionBody>
    </Accordion>
  );
};

export default CustomAccordion;
