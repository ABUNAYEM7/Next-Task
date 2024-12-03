import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Tasks = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        {/* info-container */}
        <div className="space-y-3 text-center">
          <h3 className="text-3xl font-bold ">What is your Next Task ??</h3>
          <p className="text-base font-medium w-11/12 md:w-2/3 mx-auto">
            Emphasizes defining actionable steps toward a goal, encouraging
            productivity through prioritization and focus on immediate
            objectives
          </p>
        </div>
      </div>
      <div className="w-full min-h-[500px] lg:w-4/5 mx-auto p-4">
        <Outlet/>
      </div>
    </div>
  );
};

export default Tasks;
