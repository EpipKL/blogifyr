import React from 'react';
import 'tailwindcss/tailwind.css'
import UserBlogs from './Blogs/UserBlogs';

const ProfileBlogs = () => {
    return (
        <div className="bg-white h-screen w-screen">
            <div className="flex justify-between items-center">
                
                <UserBlogs />

            </div>

        </div>
    )
}

export default ProfileBlogs;