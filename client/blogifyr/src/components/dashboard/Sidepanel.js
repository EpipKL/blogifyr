import React from "react";
import 'tailwindcss/tailwind.css';
import Logo from '../../img/png/logo-no-background.png';

const Sidepanel = () => {
    return (
        <div class="bg-gray text-dark h-screen">
            <div class="p-5">
                <a href="#">
                <img src={Logo} className="max-w-xs object-contain w-32" alt="Blogifyr Logo" />
                </a>
                <ul class="mt-4">
                <li class="mb-2">
                    <a href="#" class="block px-2 py-1 text-primary font-bold text-xl hover:underline">Account</a>
                </li>
                <li class="mb-2">
                    <a href="#" class="block px-2 py-1 text-primary font-bold text-xl hover:underline">Blogs</a>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidepanel;