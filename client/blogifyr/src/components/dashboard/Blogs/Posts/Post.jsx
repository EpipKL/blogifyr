import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../../../utils/queries";
import { UPDATE_POST } from "../../../../utils/mutations";
import Spinner from "../../../shared/Spinner";
import Sidepanel from "../../Sidepanel";
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
    return <div>Loading...</div>;
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
    <div className="flex flex-col md:flex-row">
      <Sidepanel />

    <div className="bg-white-50 w-full h-full p-5">
      <form>
        <label className="text-xl font-bold" htmlFor="title">Title</label>
        <input
          className="block w-full border-primary-500 border-2 rounded-xl p-2 mb-5"
          type="text"
          id="title"
          value={formState.title}
          onChange={(e) => setFormState({ title: e.target.value })}
          required={true}
        />
        <label className="text-xl font-bold" htmlFor="content">Content</label>
        <textarea
          className="block w-full border-primary-500 border-2 rounded-xl p-2 mb-2"
          id="content"
          value={formState.content}
          onChange={(e) => setFormState({ content: e.target.value })}
          rows="5"
          required={true}
        />
        <label className="relative inline-flex items-center mb-4 cursor=pointer">
          <input
            className="
            sr-only peer
            "
            type="checkbox"
            checked={formState.isPublished}
            readOnly={true}
          />
          <div className="
            w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-300
            peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-600
            
            
            ">
              </div>
          <span className="ml-3 text-sm font-bold text-primary-500">Publish</span>    
        </label>
        <br />
        <label className="text-xl font-bold">
          Last Published On{" "}
          {formState.publishedOn ? formState.publishedOn : "N/A"}
        </label>
        <button name="save" onClick={handlePostSubmit} 
        className="w-full bg-primary-500 text-white-50 py-2 px-4 rounded-md font-bold">
          Save
        </button>
        {!formState.isPublished ? (
          <button name="save-publish" onClick={handlePostSubmit} 
          className="w-full bg-success-500 text-white-50 py-2 px-4 rounded-md font-bold my-3">
            Save & Publish
          </button>
        ) : (
          <></>
        )}
        {formState.isPublished ? (
          <button name="save-unpublish" onClick={handlePostSubmit} 
          className="w-full bg-primary-500 text-white-50 py-2 px-4 rounded-md font-bold my-3">
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
    </div>

  );
};

export default Post;
