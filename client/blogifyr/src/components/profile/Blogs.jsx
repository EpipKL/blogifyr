import React from 'react';
import 'tailwindcss/tailwind.css'
import UserBlogs from './Blogs/UserBlogs';
import BlogList from '../dashboard/Blogs/BlogList';

const ProfileBlogs = () => {
    return (
        <div className="bg-white h-screen w-screen">
            <div className="flex justify-between items-center">
                <BlogList />
            </div>

        </div>
    )
}

export default ProfileBlogs;