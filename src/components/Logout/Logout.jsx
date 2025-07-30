import React from "react";
import { Button } from "../index";
import AuthServices from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    AuthServices.logout().then((data) => {
      if (data) {
        dispatch(logout());
        navigate("/");
      }
    });
  };
  return (
    <Button
      onClick={handleClick}
      className="bg-black text-white w-30 rounded-xl"
    >
      Logout
    </Button>
  );
}

export default Logout;
