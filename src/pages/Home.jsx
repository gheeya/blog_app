import React, { useEffect, useState } from "react";
import DbServices from "../appwrite/db.js";
import { PostCard } from "../components";
// import { useSelector } from "react-redux";

function Home() {
  // TOPIC Home should contain all posts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    DbServices.getAllPosts()
      .then((data) => {
        if (data) {
          setPosts(data.documents);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // MODIFIED
  // const posts = useSelector((state) => state.posts);
  if (posts.length === 0) {
    return <h1>Please login to see all the posts</h1>;
  }
  return (
    <div className="w-full h-full flex flex-row justify-start items-start px-4 py-2">
      {posts.map((post) => {
        return <PostCard key={post.title} {...post} className="my-2" />;
      })}
    </div>
  );
}

export default Home;
