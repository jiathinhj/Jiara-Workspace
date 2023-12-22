import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const CustomCard = ({ children }: any) => {
  return <Card className="w-full lg:w-[600px] py-4 px-8">{children}</Card>;
};

export default CustomCard;
