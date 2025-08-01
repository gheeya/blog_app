import React, { useState, useEffect } from "react";
import DbServices from "../appwrite/db.js";
import { PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    DbServices.getPosts()
      .then((data) => {
        if (data) {
          setPosts(data.documents);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (posts.length === 0) {
    return <h1>Please login to see all the posts</h1>;
  }
  return (
    <div className="w-full h-full flex flex-row justify-start items-start px-4 py-2">
      {posts.map((post) => {
        console.log(post);
        return <PostCard key={post.title} {...post} className="my-2" />;
      })}
    </div>
  );
}

export default Home;
