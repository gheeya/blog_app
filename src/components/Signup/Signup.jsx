import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import AuthServices from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const [error, setError] = useState(null);

  const create = async (data) => {
    setError(null);
    try {
      const session = await AuthServices.createAccount(data);
      if (session) {
        const userData = await AuthServices.getCurrentUserInfo();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="h-full w-full flex flex-row justify-center items-center">
      <div className="w-120 h-90 shadow-lg">
        <h1 className="text-center font-bold text-lg">Signup</h1>
        <div className="flex flex-row justify-center items-center h-83">
          {error && <p className="text-red">{error.message}</p>}
          <form
            onSubmit={handleSubmit(create)}
            className="h-full w-full flex flex-col justify-center items-center"
          >
            <Input
              className="my-2"
              label="Full Name:"
              {...register("name", { required: "Field is required" })}
            />
            {<p className="text-red-800">{errors["name"]?.message}</p>}
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
              Signup
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
