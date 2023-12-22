import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PencilIcon,
  CalendarIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import logo from "../../../../logo.png";
import SpaceList from "../../../Pages/Spaces";
import CustomAccordion from "../../../Accordion/CustomAccordion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const WorkList = [
  {
    label: "Scheduler",
    icon: <CalendarIcon strokeWidth={3} className="h-3 w-5" />,
    href: "/scheduler",
  },
  {
    label: "Note",
    icon: <BookOpenIcon strokeWidth={3} className="h-3 w-5" />,
    href: "#",
  },
];

const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];
const SideBar = () => {
  const [width, setWidth] = useState(defaultWidth);
  const isResized = useRef(false);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;

        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener("mouseup", () => {
      isResized.current = false;
    });
  }, []);

  return (
    <div className="flex">
      <div
        style={{ width: `${width / 16}rem` }}
        className="h-screen min-w-max p-4 shadow-xl shadow-blue-gray-900/5"
      >
        <div className="mb-2 flex items-center gap-4 p-4">
          <img src={logo} alt="brand" className="h-8 w-8" />
          <Typography variant="h5">Workspace</Typography>
        </div>
        <div className="p-2">
          <Input
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            label="Search"
          />
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="mr-auto font-normal">
                  Your spaces
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <SpaceList />
              </List>
            </AccordionBody>
          </Accordion>
          <CustomAccordion
            value={2}
            icon={<PencilIcon className="h-5 w-5" />}
            label={"Your work"}
            listItems={WorkList}
          />
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>

      <div
        className="w-2 cursor-col-resize"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
  );
};

export default SideBar;
