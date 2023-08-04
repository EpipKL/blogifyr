import React from "react";
import 'tailwindcss/tailwind.css';
import Logo from '../../img/png/logo-no-background.png';

const Sidepanel = () => {
    return (
        <div className="bg-gray text-dark h-screen">
            <div className="p-5">
                <a href="#">
                <img src={Logo} className="max-w-xs object-contain w-32" alt="Blogifyr Logo" />
                </a>
                <ul className="mt-4">
                <li className="mb-2">
                    <a href="#" className="block px-2 py-1 text-primary font-bold text-xl hover:underline">Account</a>
                </li>
                <li className="mb-2">
                    <a href="#" className="block px-2 py-1 text-primary font-bold text-xl hover:underline">Blogs</a>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidepanel;