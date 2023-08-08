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
      <div>
        <h2>Create a New Post</h2>
        <form onSubmit={handlePostSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the post title"
          />
          <label>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
            />
            Is Published
          </label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={6}
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  };
  
  export default CreatePost;
