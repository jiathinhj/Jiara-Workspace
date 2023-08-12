import {
  BookmarkPlus,
  DashCircle,
  Flag,
  Pen,
  PersonDash,
  Share,
  Trash,
} from "react-bootstrap-icons";

export const CONTACT_ACTION = [
{  action: "Unfollow", icon:  <PersonDash />},
{  action: "Hide Contact", icon:<DashCircle />},
];

export const COMMENT_ACTION = [
 {action: "Hide Comment",icon: <DashCircle />},
 {action: "Report",icon: <Flag />},
];

export const POST_ACTION = [
  {action: "Save Post", icon:  <BookmarkPlus />},
  {action: "Hide Post", icon:  <DashCircle />},
  {action: "Share Post", icon:  <Share />},
  {action: "Unfollow", icon:  <PersonDash />},
];

export const DELETE = [{action: "Delete",icon:  <Trash />}];

export const AUTHOR_ACTION = [
 {action: "Edit", icon: <Pen />},
 {action: "Delete", icon: <Trash />},
];
