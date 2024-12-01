import React from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";

const SingIn = () => {
    const {state} = useLocation()
  return (
    <div>
      <div className="w-full md:w-11/12 mx-auto bg-[#1d232a] my-6 rounded-lg min-h-[500px]">
      <Outlet context={state}/>
      </div>
    </div>
  );
};

export default SingIn;
