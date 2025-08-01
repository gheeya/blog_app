import React from "react";
import { Link } from "react-router-dom";
import DbServices from "../../appwrite/db.js";
import "./PostCard.css";

function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="shadow-lg main-post-container">
      <Link to={`/post/${$id}`} className="w-full h-full">
        <div className="post-image-container">
          <img
            className="post-image"
            src={DbServices.previewFile(featuredImage)}
            alt="post-image"
          />
        </div>
        <div className="post-title-container text-md font-bold">
          {title.length > 10 ? `${title.slice(0, 8)}...` : title}
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
