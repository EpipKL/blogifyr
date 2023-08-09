import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BLOG } from '../../../utils/mutations';
import Sidepanel from '../Sidepanel';
import Spinner from '../../shared/Spinner';

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
    <div className="flex flex-col md:flex-row">
      <Sidepanel />
      <div className="bg-white-50 w-full h-full p-5">
        <h2 className="text-dark-500 text-2xl text-center font-bold mb-4">
          Create a New Blog
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="text-xl font-bold" htmlFor="title">
            Title
          </label>
          <input
            className="block w-full border-primary-500 border-2 rounded-xl p-2"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label className="text-xl font-bold" htmlFor="image">
            Image URL (optional)
          </label>
          <input
            className="block w-full border-primary-500 border-2 rounded-xl p-2"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          
          <button
            className="w-full bg-primary-500 text-white-50 py-2 px-4 rounded-md font-bold"
            type="submit"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
