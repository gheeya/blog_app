import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DbServices from "../appwrite/db.js";
import AuthServices from "../appwrite/auth.js";
import { useSelector } from "react-redux";
import "./Post.css";
import parse from "html-react-parser";
import { Button } from "../components/index.js";
import { useDispatch } from "react-redux";
import { deletePost as del } from "../store/postSlice.js";

function Post() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let slug = params?.slug;
  const [post, setPost] = useState("");

  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (slug) {
      DbServices.getPost(slug).then((data) => {
        if (data) {
          setPost(data);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate, post]);

  const deletePost = async () => {
    try {
      const res = await DbServices.deletePost(post.slug);
      if (res) {
        const msg = await DbServices.deleteFile(post.featuredImage);
        if (msg) {
          dispatch(del(post.slug));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  return post ? (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className="post-container shadow-lg h-90 w-200">
        <div className="heading-container h-90">
          <div className="title-container">
            <h2 className="post-title">{post.title}</h2>
          </div>
          <img
            className="w-full h-full"
            src={DbServices.previewFile(post.featuredImage)}
            alt=""
          />
        </div>
        <div className="body-container p-5">
          <div className="main-container">{parse(post.content)}</div>
          {isAuthor && (
            <div className="button-container flex flex-row items-center justify-center">
              <Button
                type="button"
                className="bg-green-500 text-white mx-5"
                children="Edit Post"
                onClick={() => {
                  navigate(`/edit-post/${post.slug}`);
                }}
              />
              <Button
                type="button"
                children="Delete Post"
                className="bg-red-500 text-white mx-5"
                onClick={deletePost}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <h1>Post doesn't exist</h1>
  );
}

export default Post;
