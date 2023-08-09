import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../../utils/queries";
import {
  ADD_COMMENT,
  ADD_REACTION,
} from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import Navbar from "../Navbar";
// import 'tailwindcss/tailwinds.css'

const UserPost = () => {
  const { blogId, postId } = useParams();

  const [commentText, setCommentText] = useState("");


  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { id: postId },
  });

  const [addComment, { commentError, commentData }] = useMutation(ADD_COMMENT);
  const [addReaction, { addReactionError, addReactionData }] =
    useMutation(ADD_REACTION);

  if (loading) {
    return <div>Loading...</div>;
  }

  const post = data?.post || null;

  if (!post) {
    return document.location.assign("/error/not-found");
  }

  // get the decoded token data
  const authData = Auth.getProfile();

  // get the user reaction for the logged in user if the user is logged in and a reaction exists
  const userReaction = post.reactions.find(
    (reaction) => authData && reaction.user._id === authData.data._id
  );

  const handleReactionUp = async (e) => {
    if (!Auth.loggedIn()) {
      return;
    }

    // stop code execution if the logged in user has previously reacted to post with a thumbs up to prevent from overloading the database
    if (userReaction && userReaction.type === "UP") {
        return;
    }
    
    e.preventDefault();

    try {
      const { data } = await addReaction({
        variables: { postId: post._id, type: "UP" },
      });

      console.log('Added reaction successfully', data);
    } catch (err) {
      console.log(`Error on reaction up: `, err);
    }

  };

  const handleReactionDown = async (e) => {
    if (!Auth.loggedIn()) {
      return;
    }

    // stop code execution if the logged in user has previously reacted to post with a thumbs down to prevent from overloading the database
    if (userReaction && userReaction.type === "DOWN") {
        return;
    }
    
    e.preventDefault();

    try {
      const { data } = await addReaction({
        variables: { postId: post._id, type: "DOWN" },
      });

      console.log('Added reaction successfully', data);
    } catch (err) {
      console.log(`Error on reaction down: `, err);
    }
 
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addComment({
        variables: { postId: post._id, commentText },
      });

      setCommentText("");
      console.log("Comment added successfully: ", data);
    } catch (err) {
      console.error("Error adding comment: ", err);
    }
  };

  return (
      <div>
      <Navbar />
      <div className="m-5">

      <div className="bg-white-50 p-4 rounded-xl shadow-md my-4 text-center">
        <h1 className="text-4xl font-semibold">{post.title}</h1>
        <p className="text-xl mt-2">{post.content}</p>
      </div>

      </div>

      <div className="flex justify-center mt-4 ">


      <div className="mt-4 flex">


      <button
          onClick={handleReactionUp}
          className={`text-xl mx-2 flex p-2 items-center bg-primary-500 rounded-full ${
            userReaction && userReaction.type === "UP" ? "text-white-50" : "text-dark-500"
          }`}
          >
          <i
            className={`fa-solid fa-thumbs-up ${
              userReaction && userReaction.type === "UP" ? "text-white-50" : "text-dark-500"
            }`}
            >


            </i>
        <p className="text-xl ml-1 mr-2">{post.reactionsCount.up}</p>
        </button>

        <button
          onClick={handleReactionDown}
          className={`text-xl mx-2 flex p-2 items-center bg-primary-500 rounded-full ${
            userReaction && userReaction.type === "DOWN" ? "text-white-50" : "text-dark-500"
          }`}
          >
          <i
            className={`fa-solid fa-thumbs-down ${
              userReaction && userReaction.type === "DOWN" ? "text-white-50" : "text-dark-500"
            }`}
            ></i>
        <p className="text-xl ml-2">{post.reactionsCount.down}</p>
        </button>

      </div>

      </div>

      <div className="text-xl ml-2">
        {Auth.loggedIn() ? (
          <>
            <h2 className="text-lg font-semibold">Leave a comment:</h2>
            {commentError ? (
              <p className="text-danger-500">
                There's been an error adding your comment. Please try again
              </p>
            ) : (
              <></>
            )}
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full p-2 border border-primary-500 rounded-xl"
                rows="5"
                required={true}
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              ></textarea>
              <button className="text-white-50 bg-primary-500 px-4 py-2 mt-2 rounded-xl" type="submit">Send</button>
            </form>
          </>
        ) : (
          <p className="text-lg mt-2">
            Please <a className="text-primary-500 hover:underline" href="/login">log in</a> to leave a comment
          </p>
        )}
        <div className="mt-4">
          {post.comments.map((comment) => (
            <div key={comment.commentId} className="bg-white-50 rounded-xl border-primary-300 border-2 shadow-md mx-5 p-2 mb-4">
              <p className="text-base">{comment.commentText}</p>
              <p className="text-dark-500 text-sm mt-1">
              <span className="text-primary-500">{comment.user.username} </span>
               on 
              <span> {comment.createdOn} </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPost;
