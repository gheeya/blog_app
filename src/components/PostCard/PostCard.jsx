import React from "react";
import { Link } from "react-router-dom";
import DbServices from "../../appwrite/db.js";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div>
        <div>
          <img src={DbServices.previewFile(featuredImage)} alt="post-image" />
        </div>
        <div>{title}</div>
      </div>
    </Link>
  );
}

export default PostCard;
