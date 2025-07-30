import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../index";
import { useSelector } from "react-redux";
import { Button } from "../index";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      url: "/add-posts",
      active: authStatus,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
  ];
  return (
    <nav className="flex flex-wrap justify-between h-15 shadow-[0_5px_5px_rgba(0,0,0,0.05)]">
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div>
        <ul className="flex flex-wrap h-full">
          {navItems.map((item) => {
            return item.active ? (
              <li
                key={item.name}
                onClick={() => {
                  navigate(item.url);
                }}
                className="transition-colors duration-300 ease-in-out hover:text-orange-700 cursor-default px-2 mx-2 py-2 flex flex-col items-center justify-center"
              >
                {item.name}
              </li>
            ) : null;
          })}
        </ul>
      </div>
      <div>
        <Button />
      </div>
    </nav>
  );
}

export default Header;
