import React, { useState } from "react";
import 'tailwindcss/tailwind.css'
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  QUERY_SINGLE_BLOG,
  QUERY_POSTS,
  QUERY_ME,
  QUERY_USER,
} from "../../../../utils/queries"; 
import { ADD_POST, ADD_COMMENT } from "../../../../utils/mutations";
import Sidepanel from "../../Sidepanel";

const CreatePost = () => {
    const { blogId } = useParams();
    
    const [title, setTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [isPublished, setIsPublished] = useState(false); // New state for isPublished
    
    const [addPost, { loading: addPostLoading, error: addPostError }] = useMutation(
      ADD_POST,
      {
        onCompleted: (data) => {
          console.log("Post added successfully:", data.addPost);
          setPostContent("");
          setTitle("");
          setIsPublished(false); // Clear the isPublished checkbox after successful submission
        },
        onError: (error) => {
          console.error("Error adding post:", error);
        },
      }
    );
    
    const handlePostSubmit = async (e) => {
      e.preventDefault();
      if (postContent.trim() === "" || title.trim() === "") return;
  
      try {
        const { data } = await addPost({
          variables: {
            blogId: blogId,
            title: title,
            content: postContent,
            isPublished: isPublished, // Use the isPublished state
          },
          refetchQueries: [
            { query: QUERY_SINGLE_BLOG, variables: { id: blogId } },
            { query: QUERY_POSTS, variables: { blogId: blogId } },
          ],
        });
        console.log("Post added successfully:", data.addPost);
        setPostContent("");
        setTitle("");
        setIsPublished(false); // Clear the isPublished checkbox after successful submission
      } catch (error) {
        console.error("Error adding post:", error);
      }
    };
    
    return (
      <div className="flex flex-col md:flex-row">
        <Sidepanel />
        <div className="bg-white-50 w-full h-full p-5">
        <h2 className="text-dark-500 text-2xl text-center font-bold mb-4">
          Create a New Post
        </h2>
        <form onSubmit={handlePostSubmit}>
        <label className="text-xl font-bold" htmlFor="title">
          Title
          </label>
          <input
            className="block w-full border-primary-500 border-2 rounded-xl p-2 mb-5"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the post title"
          />
          
          <textarea
            className="block w-full border-primary-500 border-2 rounded-xl p-2 mb-2"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={6}
          />
          <label className="relative inline-flex items-center mb-4 cursor=pointer">
            
            <input
              className="
              sr-only peer
              "
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
              />

            <div className="
            w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-300
            peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-600
            
            
            ">
            </div>
            <span className="ml-3 text-sm font-bold text-primary-500">Publish</span>
          </label>
          <button type="submit" className="w-full bg-primary-500 text-white-50 py-2 px-4 rounded-md font-bold">Create Post</button>
        </form>
        </div>
      </div>
    );
  };
  
  export default CreatePost;
