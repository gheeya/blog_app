import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DbServices from "../appwrite/db.js";
import { PostCard } from "../components/index.js";

function AllPosts() {
  // const [posts, setPosts] = useState([]);
  // const userData = useSelector((state) => state.auth.userData);
  // useEffect(() => {
  //   if (userData) {
  //     DbServices.getPosts().then((posts) => {
  //       if (posts) {
  //         setPosts(posts.documents);
  //       }
  //     });
  //   }
  // }, [userData]);

  // MODIFIED
  const posts = useSelector((state) => state.posts);

  return posts.length === 0 ? null : (
    <div className="w-full h-full flex flex-row justify-start items-start px-4 py-2">
      {posts.map((post) => {
        return <PostCard key={post.title} {...post} className="my-2" />;
      })}
    </div>
  );
}

export default AllPosts;
