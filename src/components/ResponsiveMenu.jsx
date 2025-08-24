import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();
  const location = useLocation();
  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-200 backdrop-blur-lg px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-2xl transition-all`}
    >
      <div>
        <div className="flex items-center justify-start gap-3">
          {user ? (
            <UserButton size={50} />
          ) : (
            <FaUserCircle size={50} />
          )}
          <div>
            <h1>
              Hello, {user?.firstName ? user.firstName : "Guest"}
            </h1>
            <h1 className="text-sm text-slate-500">
              {user ? "Premium User" : "Welcome!"}
            </h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link
              to="/"
              onClick={() => setOpenNav(false)}
              className={`cursor-pointer ${
                location.pathname === "/" ? "text-red-500" : ""
              }`}
            >
              <li>Home</li>
            </Link>
            <Link
              to="/product"
              onClick={() => setOpenNav(false)}
              className={`cursor-pointer ${
                location.pathname === "/product" ? "text-red-500" : ""
              }`}
            >
              <li>Products</li>
            </Link>
            <Link
              to="/about"
              onClick={() => setOpenNav(false)}
              className={`cursor-pointer ${
                location.pathname === "/about" ? "text-red-500" : ""
              }`}
            >
              <li>About</li>
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpenNav(false)}
              className={`cursor-pointer ${
                location.pathname === "/contact" ? "text-red-500" : ""
              }`}
            >
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;