import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../../../utils/queries";
import { UPDATE_POST } from "../../../../utils/mutations";
import Spinner from "../../../shared/Spinner";
// import 'tailwindcss/tailwinds.css'

const Post = () => {
  const { blogId, postId } = useParams();

  const [formState, setFormState] = useState({
    title: "",
    content: "",
    isPublished: false,
    publishedOn: "",
  });

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { id: postId },
  });

  const [updatePost, { error, postData }] = useMutation(UPDATE_POST);

  useEffect(() => {
    if (data && data.post) {
      setFormState({
        title: data.post.title,
        content: data.post.content,
        isPublished: data.post.isPublished,
        publishedOn: data.post.publishedOn,
      });
    }
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const { name } = e.target;
    let isPublished;

    try {
      if (name === "save-publish") {
        isPublished = true;
      } else if (name === "save-unpublish") {
        isPublished = false;
      }

      let postData;
      if (name === "save") {
        const { data } = await updatePost({
          variables: {
            id: postId,
            title: formState.title,
            content: formState.content,
          },
        });
        postData = data.updatePost;
      } else {
        const { data } = await updatePost({
          variables: {
            id: postId,
            title: formState.title,
            content: formState.content,
            isPublished: isPublished,
          },
        });
        postData = data.updatePost;
      }

      console.log("Post updated succesfully: ", postData);
    } catch (err) {
      console.log("Error updating post: ", err);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={formState.title}
          onChange={(e) => setFormState({ title: e.target.value })}
          required={true}
        />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={formState.content}
          onChange={(e) => setFormState({ content: e.target.value })}
          rows="5"
          required={true}
        />
        <label>
          <input
            type="checkbox"
            checked={formState.isPublished}
            readOnly={true}
          />
          Is Published
        </label>
        <label>
          Last Published On{" "}
          {formState.publishedOn ? formState.publishedOn : "N/A"}
        </label>
        <button name="save" onClick={handlePostSubmit}>
          Save
        </button>
        {!formState.isPublished ? (
          <button name="save-publish" onClick={handlePostSubmit}>
            Save & Publish
          </button>
        ) : (
          <></>
        )}
        {formState.isPublished ? (
          <button name="save-unpublish" onClick={handlePostSubmit}>
            Save & Unpublish
          </button>
        ) : (
          <></>
        )}
      </form>

      {error ? 
      (<h1>There's been an error updating this post. Please try again.</h1>) : (<></>)
      }
    </div>
  );
};

export default Post;
