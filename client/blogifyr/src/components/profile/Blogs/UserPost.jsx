import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../../utils/queries";
import {
  ADD_COMMENT,
  ADD_REACTION,
  REMOVE_REACTION,
} from "../../../utils/mutations";
import Spinner from "../../shared/Spinner";
import Auth from "../../../utils/auth";
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
    return <Spinner />;
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
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <div>
        <button onClick={handleReactionUp}>
          {/* Display a solid thumbs up icon if the logged in user has reacted to this post with a thumbs up */}
          <i key={iconUpClass}>
            <span className={iconUpClass} />
          </i>
        </button>
        <p>{post.reactionsCount.up}</p>
        <button onClick={handleReactionDown}>
          {/* Display a solid thumbs down icon if the logged in user has reacted to this post with a thumbs down */}
          <i key={iconDownClass}>
            <span className={iconDownClass} />
          </i>
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
