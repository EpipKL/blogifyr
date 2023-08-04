import React from 'react';
import 'tailwindcss/tailwind.css';
import Sidepanel from './Sidepanel';
import Account from './Account';
import Blogs from './Blogs';

const MainContent = () => {
    return (
        <div className="flex">
            <Sidepanel />
            <Account />
        </div>
    )
}

export default MainContent;