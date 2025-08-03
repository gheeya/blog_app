import React from "react";
import { PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import DbServices from "../appwrite/db";
import { useSelector } from "react-redux";
import { getPost } from "../store/postSlice";

function EditPost() {
  const params = useParams();
  // const navigate = useNavigate();
  // const [post, setPost] = useState("");
  const slug = params.slug;

  // useEffect(() => {
  //   if (slug) {
  //     DbServices.getPost(slug).then((data) => {
  //       if (data) {
  //         setPost(data);
  //       } else {
  //         navigate("/");
  //       }
  //     });
  //   }
  // });

  // MODIFIED
  const post = useSelector((state) => getPost(state.posts, slug));

  return post ? (
    <div className="w-full h-full">
      <PostForm post={post} />
    </div>
  ) : null;
}

export default EditPost;
