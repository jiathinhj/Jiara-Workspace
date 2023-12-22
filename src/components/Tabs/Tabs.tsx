import React, { useState } from "react";
import {
  TabsBody,
  Tabs as MTTabs,
  TabPanel,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";

const Tabs = ({ data }: any) => {
  const [activeTab, setActiveTab] = React.useState(data[0].value);

  return (
    <>
      <MTTabs
        value={activeTab}
        className="w-full flex flex-col items-center [&>nav]:w-screen [&>nav]:z-[1] [&>nav]:xl:w-[500px]"
      >
        <TabsHeader
          className="my-4 rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value, icon }: any) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={
                activeTab === value
                  ? "text-gray-900 font-semibold [&>*:first-child]:flex [&>*:first-child]:items-center [&>*:first-child]:gap-2 [&>*:last-child]:border-primary -z-10"
                  : "text-gray-600 [&>*:first-child]:flex [&>*:first-child]:items-center [&>*:first-child]:gap-2"
              }
            >
              {icon}
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          className="min-h-[400px]"
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, children }: any) => (
            <TabPanel key={value} value={value}>
              {children}
            </TabPanel>
          ))}
        </TabsBody>
      </MTTabs>
    </>
  );
};

export default Tabs;
