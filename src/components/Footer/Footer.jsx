import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const authStatus = useSelector((state) => state.auth.status);
  return (
    <div className="footer-container h-38 shadow-[0_-5px_5px_rgba(0,0,0,0.05)]">
      <div className="contact-container flex flex-col justify-start mt-5 ml-10">
        <h1 className="mb-1">Subscribe to our weekly mail letter</h1>
        <div>
          <input
            className="border-1 w-80 h-8"
            placeholder="johndoe@website.com"
            type="text"
          />
          <button className="bg-black text-white px-3 py-1">Subscribe</button>
        </div>
      </div>
      <div className="link-container mt-10">
        <ul className="flex flex-row justify-center items-center">
          <li className="transition-colors duration-300 ease-in-out hover:text-orange-700 cursor-default px-2 mx-2 py-1 ">
            <Link to="/">Home</Link>
          </li>
          <li
            className={
              authStatus
                ? `text-gray-500 px-2 mx-2 py-1`
                : `transition-colors duration-300 ease-in-out hover:text-orange-700 cursor-default px-2 mx-2 py-1`
            }
          >
            {authStatus ? (
              <span className="cursor-not-allowed">All Posts</span>
            ) : (
              <Link to="/all-posts">All Posts</Link>
            )}
          </li>
          <li
            className={
              authStatus
                ? `text-gray-500 px-2 mx-2 py-1`
                : `transition-colors duration-300 ease-in-out hover:text-orange-700 cursor-default px-2 mx-2 py-1`
            }
          >
            {authStatus ? (
              <span className="cursor-not-allowed">Login</span>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li
            className={
              authStatus
                ? `text-gray-500 px-2 mx-2 py-1`
                : `transition-colors duration-300 ease-in-out hover:text-orange-700 cursor-default px-2 mx-2 py-1`
            }
          >
            {authStatus ? (
              <span className="cursor-not-allowed">Signup</span>
            ) : (
              <Link to="/signup">New Here? Join Us....</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
