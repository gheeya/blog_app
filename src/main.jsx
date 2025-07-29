import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import Home from "./pages/Home.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// Paths
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/all-posts",
        element: <AllPosts />,
      },
      {
        path: "/add-post",
        element: <AddPost />,
      },
      {
        path: "/edit-post/:slug",
        element: <EditPost />,
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
