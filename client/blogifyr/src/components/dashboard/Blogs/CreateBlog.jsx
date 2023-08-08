import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BLOG } from '../../../utils/mutations';
import Sidepanel from '../Sidepanel';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
  });

  const [addBlog, { loading, error }] = useMutation(ADD_BLOG);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog({
      variables: {
        title: formData.title,
        image: formData.image,
        description: formData.description,
      },
    })
      .then((res) => {
        // Handle success, reset form, show confirmation, etc.
        console.log('Blog created successfully:', res.data.addBlog);
        setFormData({
          title: '',
          image: '',
          description: '',
        });
      })
      .catch((err) => {
        // Handle error, show error message, etc.
        console.error('Error creating blog:', err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='flex'>
      
      <div>
        <Sidepanel />
      </div>

    <div className='bg-white items-center w-screen h-screen container-fluid'>
      

      <h2 className='text-dark text-2xl text-center font-bold'>Create a New Blog</h2>
      <div className="container items-center justify-center w-full flex flex-col text-center">

      <form className='' onSubmit={handleSubmit}>
        <div className='flex justify-between mr-5 items-center w-full'>
          <label className='text-xl font-bold mr-1' htmlFor="title">Title </label>
          <input
            className="block w-100 border-primary border-solid border-2 rounded-full mt-2 p-1"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            />
        </div>
        <div className='flex justify-between mr-5 items-center w-full'>
          <label className='text-xl font-bold mr-1' htmlFor="image">Image URL (optional) </label>
          <input
            className="block w-100 border-primary border-solid border-2 rounded-full mt-2 p-1"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            />
        </div>
        <div className='flex justify-between mr-5 items-center w-full'>
          <label className='text-xl font-bold mr-1' htmlFor="description">Blog Description </label>
          <textarea
            className="block w-100 border-primary border-solid border-2 rounded-lg mt-2 p-5"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            ></textarea>
        </div>
        <button
        className=" text-white text-md bg-primary py-2 px-5 m-2 font-bold rounded-full mx-auto flex justify-between items-center"
        type="submit">Create Blog</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default CreateBlog;
