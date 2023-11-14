import React from "react";

const DepartmentMain = ({ children }: any) => {
  return (
    <div className="department-page">
      <>{children} </>
    </div>
  );
};

export default DepartmentMain;
