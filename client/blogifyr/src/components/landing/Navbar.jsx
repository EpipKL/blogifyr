import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import Logo from '../../img/png/logo-no-background.png'


const Navbar = () => {

    return (
        // NAVBAR BEGINS
        <nav className="bg-white-50 p-2 border-b-4 border-dark drop-shadow-xl fixed w-screen z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* LOGO */}
                <Link to="/">
                <img src={Logo} className="max-w-xs" alt="Blogifyr Logo" />
                </Link>
                <div>
            {/* BUTTON: MOBILE */}
                <Link to='/login'>
                <button className="block bg-gray-500 text-dark-500 rounded-xl p-4 mx-2 md:hidden focus:outline-none">
                <i className="fa-solid fa-user text-white-"></i>
                </button>

            {/* BUTTON: DESKTOP */}

                <div className="hidden md:block">
                <button className="
                    bg-gray-500 text-dark-500 px-6 py-2 rounded-xl text-lg shadow-lg mr-3 font-semibold
                    transition duration-300 hover:bg-gray-700 hover:text-dark-100 hover:shadow-xl
                    active:bg-gray-900 active:text-gray-200 active:shadow-md
                    ">
                        Log In / Sign Up
                    </button>
                    </div>
                </Link>
                {/* <Link to='/signup'>
                <button className="
                    bg-primary text-white px-10 py-5 rounded-xl text-xl mr-5 shadow-lg
                    ">
                        
                        Sign Up
                    </button>
                </Link> */}
                    </div>

          </div>
        </div>
      </nav>
    )
}

export default Navbar;