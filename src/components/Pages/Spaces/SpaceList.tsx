import React from "react";
import SpaceCard from "./SpaceCard";

const SpaceList = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((e, i) => (
          <SpaceCard/>
        ))}
      </div>
    </div>
  );
};

export default SpaceList;
