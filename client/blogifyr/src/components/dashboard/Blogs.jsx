import React from 'react';
import 'tailwindcss/tailwind.css'
import Sidepanel from './Sidepanel'
import BlogList from './Blogs/BlogList';
import CreateBlog from './Blogs/CreateBlog';
import BlogPosts from './Blogs/BlogPosts';
import CreatePost from './Blogs/Posts/CreatePost';

const Blogs = () => {
    return (
        <div className='flex '>
            <div>
            <Sidepanel />
            </div>

            <div>
                <BlogList />


                
                {/* <BlogPosts />
                <CreateBlog />
                <CreatePost /> */}
            </div>
        </div>
    )
}

export default Blogs;