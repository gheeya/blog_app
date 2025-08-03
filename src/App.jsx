import { Outlet } from "react-router-dom";
import { Header } from "./components/index";
import { Footer } from "./components/index.js";
import { useState, useEffect } from "react";
import AuthServices from "./appwrite/auth.js";
import DbServices from "./appwrite/db.js";
import { login, logout } from "./store/authSlice.js";
import { useDispatch } from "react-redux";
import { setPosts } from "./store/postSlice.js";

function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    AuthServices.getCurrentUserInfo()
      .then((data) => {
        if (data) {
          dispatch(login(data));
          DbServices.getPosts(data.$id, "active").then((data) => {
            dispatch(setPosts(data.documents));
          });
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [dispatch]);
  return !loader ? (
    <div>
      <Header />
      <div className="h-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  ) : null;
}

export default App;
