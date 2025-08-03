import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import AuthServices from "../../appwrite/auth";
import DbServices from "../../appwrite/db";
import { Input, Button } from "../index";
import { setPosts } from "../../store/postSlice";

function Login() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const log = async (data) => {
    try {
      setError(null);
      const session = await AuthServices.login(data);
      if (session) {
        const userData = await AuthServices.getCurrentUserInfo();
        if (userData) {
          dispatch(login(userData));
          const allPosts = await DbServices.getPosts(userData.$id, "active");
          if (allPosts) {
            // dispatch(clearPosts());
            console.log("1. User's posts", allPosts.documents);
            dispatch(setPosts(allPosts.documents));
            navigate("/");
          }
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="h-full w-full flex flex-row justify-center items-center">
      <div className="w-120 h-90 shadow-lg">
        <div className="flex flex-col justify-center items-center h-83">
          <h1 className="text-center font-bold text-lg">
            Login to your account
          </h1>
          {error && <p className="text-red-800">{error}</p>}
          <form
            onSubmit={handleSubmit(log)}
            className="h-full w-full flex flex-col justify-center items-center"
          >
            <Input
              className="my-2"
              label="Email :"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {<p className="text-red-800">{errors["email"]?.message}</p>}
            <Input
              className="my-2"
              type="password"
              label="Password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password should be minimum 8 characters long",
                },
              })}
            />
            {<p className="text-red-800">{errors["password"]?.message}</p>}
            <Button
              type="submit"
              className="mt-2 bg-black rounded-lg px-40 py-2 text-white"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
