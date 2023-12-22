import {
  CalendarIcon,
  PhoneIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const SpaceCard = () => {
  return (
    <div className="relative bg-gray-900 py-6 px-6 rounded-3xl w-64 shadow-black shadow-md hover:z-10 hover:scale-105">
      <div className="flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-primary left-4 -top-6">
        <PhoneIcon className="w-6" />
      </div>
      <div className="mt-6">
        <p className="text-xl font-semibold my-3 text-gray-200">
          App Development
        </p>
        <div className="flex space-x-2 text-gray-500 text-sm">
          <UserGroupIcon className="w-5" />
          <p>Marketing Team</p>
        </div>
        <div className="flex space-x-2 text-gray-500 text-sm my-3">
          <CalendarIcon className="w-5" />
          <p>1 Weeks Left</p>
        </div>
        <div className="border-t-2"></div>

        <div className="flex justify-between">
          <div className="my-2">
            <p className="font-semibold text-base text-gray-600 mb-2">
              Team Member
            </p>
            <div className="flex space-x-2">
              <img
                alt="img"
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                className="w-6 h-6 rounded-full"
              />
              <img
                alt="img"
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Woman_7.jpg"
                className="w-6 h-6 rounded-full"
              />
              <img
                alt="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxSqK0tVELGWDYAiUY1oRrfnGJCKSKv95OGUtm9eKG9HQLn769YDujQi1QFat32xl-BiY&usqp=CAU"
                className="w-6 h-6 rounded-full"
              />
            </div>
          </div>
          <div className="my-2">
            <p className="font-semibold text-base mb-2 text-gray-600 ">
              Progress
            </p>
            <div className="text-base text-gray-400 font-semibold">
              <p>34%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
