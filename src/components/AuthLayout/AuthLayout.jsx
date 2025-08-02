import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function AuthLayout({ children, authenticated = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authenticated && authStatus !== authenticated) {
      navigate("/login");
    } else if (!authenticated && authStatus !== authenticated) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authenticated, setLoader, navigate]);
  return !loader ? <div>{children}</div> : <h1>Loading .....</h1>;
}

export default AuthLayout;
