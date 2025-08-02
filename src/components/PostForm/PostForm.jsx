import React, { useState, useCallback, useEffect } from "react";
import { Input, Button, Select } from "../index";
import "./PostForm.css";
import { useForm } from "react-hook-form";
import { TextEditor } from "../index";
import { useSelector } from "react-redux";
import DbServices from "../../appwrite/db.js";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const {
    setValue,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "Sample Title",
      slug: post?.slug || "sample-slug",
      content: post?.content || "Sample Content",
    },
  });

  const slugTransform = useCallback((value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(" ", "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  const postData = async (data) => {
    try {
      console.log(data, post);
      if (post) {
        console.log(post);
        // Upload file
        const file = await DbServices.uploadFile(data?.featuredImage[0]);
        // Delete file
        // if (file) {
        //   await DbServices.deleteFile(post?.featuredImage);
        // }
        // update post
        const dbPost = await DbServices.updatePost(data?.slug, {
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });
        // redirect
        if (dbPost) {
          navigate(`/post/${data?.slug}`);
        }

        // update post
        // If succesfull, delete file
      } else {
        // Upload File
        const file = await DbServices.uploadFile(data.featuredImage[0]);
        // Create Post
        if (file) {
          console.log({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });
          const dbPost = await DbServices.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });
          if (dbPost) {
            // Redirect to post
            navigate(`/post/${data.slug}`);
          }
        }
      }
    } catch (error) {
      setError(error.message);
    }
    console.log(data);
  };
  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className="border-0.5 shadow-lg w-230 h-90 ">
        <div className="main-container w-full h-full">
          <form className="w-full h-full" onSubmit={handleSubmit(postData)}>
            <div className="input-container h-full flex flex-col items-center justify-evenly">
              <h1 className="text-center text-md font-bold  h-5">Post Form</h1>
              {<p className="text-red-700">{error}</p>}
              <Input
                label="Title: "
                className={`placeholder:pl-2`}
                placeholder="Post Title"
                {...register("title", {
                  required: "Post Title is Required",
                  minLength: {
                    value: 8,
                    message: "Post Title should be atleast 8 Characters long",
                  },
                })}
              />
              {<p className="text-red-800">{errors["title"]?.message}</p>}
              <Input
                label="Slug: "
                className={`placeholder:pl-2`}
                placeholder="slug-value"
                readOnly
                {...register("slug")}
              />
              <Input
                label="Image: "
                type="file"
                {...register("featuredImage")}
              />
              <Select
                label="Status: "
                options={["active", "inactive"]}
                {...register("status")}
              />
            </div>
            <div className="content-container h-full flex flex-col justify-start">
              <TextEditor
                control={control}
                label="Content: "
                name="content"
                defaultValue={post?.content}
              />
              <Button
                type="submit"
                className="bg-green-700 text-white mt-4 mx-3"
                children={post ? `Edit Post` : `Create Post`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
