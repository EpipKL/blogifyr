import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../../utils/queries";
import {
  ADD_COMMENT,
  ADD_REACTION,
  REMOVE_REACTION,
} from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import Navbar from "../Navbar";
// import 'tailwindcss/tailwinds.css'

const UserPost = () => {
  const { blogId, postId } = useParams();

  const [commentText, setCommentText] = useState("");
  const [userReaction, setUserReaction] = useState();
  const [iconUpClass, setIconUpClass] = useState("fa-regular fa-thumbs-up");
  const [iconDownClass, setIconDownClass] = useState(
    "fa-regular fa-thumbs-down"
  );

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { id: postId },
  });

  const [addComment, { commentError, commentData }] = useMutation(ADD_COMMENT);
  const [addReaction, { addReactionError, addReactionData }] =
    useMutation(ADD_REACTION);
  const [removeReaction, { removeReactionError, removeReactionData }] =
    useMutation(REMOVE_REACTION);

  useEffect(() => {
    if (data && data.post) {
      const authData = Auth.getProfile();

      setUserReaction({
        ...data.post.reactions.find(
          (reaction) => authData && reaction.user._id === authData.data._id
        ),
      });
    }
  }, [data]);

  useEffect(() => {
    setIconUpClass(
      userReaction && userReaction.type === "UP"
        ? "fa-solid fa-thumbs-up"
        : "fa-regular fa-thumbs-up"
    );

    setIconDownClass(
      userReaction && userReaction.type === "DOWN"
        ? "fa-solid fa-thumbs-down"
        : "fa-regular fa-thumbs-down"
    );
  }, [userReaction]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const post = data?.post || null;

  if (!post) {
    return document.location.assign("/error/not-found");
  }

  const handleReactionUp = async (e) => {
    if (!Auth.loggedIn()) {
      return;
    }

    if (userReaction && userReaction.type === "UP") {
      try {
        const { data } = await removeReaction({
          variables: { postId: post._id, reactionId: userReaction.reactionId },
        });

        console.log("Removed reaction successfully", data);
      } catch (err) {
        console.log(`Error on remove reaction up: `, err);
      }
      return;
    }

    e.preventDefault();

    try {
      const { data } = await addReaction({
        variables: { postId: post._id, type: "UP" },
      });

      console.log("Added reaction successfully", data);
    } catch (err) {
      console.log(`Error on add reaction up: `, err);
    }
  };

  const handleReactionDown = async (e) => {
    if (!Auth.loggedIn()) {
      return;
    }

    if (userReaction && userReaction.type === "DOWN") {
      try {
        const { data } = await removeReaction({
          variables: { postId: post._id, reactionId: userReaction.reactionId },
        });

        console.log("Removed reaction successfully", data);
      } catch (err) {
        console.log(`Error on remove reaction down: `, err);
      }
      return;
    }

    e.preventDefault();

    try {
      const { data } = await addReaction({
        variables: { postId: post._id, type: "DOWN" },
      });

      console.log("Added reaction successfully", data);
    } catch (err) {
      console.log(`Error on add reaction down: `, err);
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

      <div className="flex justify-center text-white-50 text-xl">
        <button className="flex px-3 py-1 mx-2 bg-success-500 rounded-xl items-center" onClick={handleReactionUp}>
          {/* Display a solid thumbs up icon if the logged in user has reacted to this post with a thumbs up */}
          <i key={iconUpClass} className="m-1">
            <span className={iconUpClass} />
          </i>
        <p className="font-bold m-1">{post.reactionsCount.up}</p>
        </button>
        <button className="flex px-3 py-1 mx-2 bg-danger-500 rounded-xl items-center" onClick={handleReactionDown}>
          {/* Display a solid thumbs down icon if the logged in user has reacted to this post with a thumbs down */}
          <i key={iconDownClass} className="m-1">
            <span className={iconDownClass} />
          </i>
          <p className="font-bold m-1">{post.reactionsCount.down}</p>
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
