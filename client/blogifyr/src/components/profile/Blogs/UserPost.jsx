import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../../utils/queries";
import {
  ADD_COMMENT,
  ADD_REACTION,
} from "../../../utils/mutations";
import Spinner from "../../shared/Spinner";
import Auth from "../../../utils/auth";
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
    return <Spinner />;
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
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <div>
        <button onClick={handleReactionUp}>
          {/* Display a solid thumbs up icon if the logged in user has reacted to this post with a thumbs up */}
          <i className={userReaction && userReaction.type === "UP" ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
        </button>
        <p>{post.reactionsCount.up}</p>
        <button onClick={handleReactionDown}>
          {/* Display a solid thumbs down icon if the logged in user has reacted to this post with a thumbs down */}
          <i className={userReaction && userReaction.type === "DOWN" ? "fa-solid fa-thumbs-down" : "fa-regular fa-thumbs-down"}></i>
        </button>
        <p>{post.reactionsCount.down}</p>
      </div>
      <div>
        {Auth.loggedIn() ? (
          <>
            <h2>Leave a comment:</h2>
            {commentError ? (
              <h2>
                There's been an error adding your comment. Please try again
              </h2>
            ) : (
              <></>
            )}
            <form onSubmit={handleCommentSubmit}>
              <textarea
                rows="5"
                required={true}
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              ></textarea>
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <h2>
            Please <a href="/login">log in</a> to leave a comment
          </h2>
        )}
        <div>
          {post.comments.map((comment) => (
            <div key={comment.commentId}>
              <p>{comment.commentText}</p>
              <p>
                Comment Added By {comment.user.username} on {comment.createdOn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPost;
