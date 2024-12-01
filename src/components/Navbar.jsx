import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/logo.png";
import { TaskContext } from "../AuthProvider/AuthProvider";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { users, logOutUsers } = useContext(TaskContext);

  const logOutHandler = () => {
    logOutUsers()
      .then(() => {
      })
      .catch((err) =>{
        Swal.fire({
          title: 'Error',
          text: 'Be Consistent Be a Achiever',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"Tasks"}>Task</NavLink>
      </li>
      <li>
        <NavLink to={"CompletedTask"}>Completed Task</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar  px-4 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
          >
            {links}
          </ul>
        </div>
        <div>
          <Link>
            <img className="w-14 h-14 rounded-xl" src={logo} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-10">{links}</ul>
      </div>
      <div className="navbar-end">
        {users ? (
          <div className="dropdown">
            <div tabIndex={0} role="button" className="m-1 ring-2 ring-green-600 rounded-full p-2">
            {
              users?.photoURL ? 
              <img className="w-10 h-10 rounded-full" src={users.photoURL} alt="photo" />
              :
              <FaUser size={25}/>
            }
              
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content right-2 top-16 menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow"
            >
              <li>
                <button
                  onClick={logOutHandler}
                  className="btn btn-accent bg-gray-500"
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "btn btn-accent bg-gray-500 "
                : "btn bg-[#1d232a] border-none "
            }
            to={"SignIn"}
          >
            LogIn
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
