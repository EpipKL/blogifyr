import React from 'react'
import 'tailwindcss/tailwind.css'
import Logo from '../../img/png/logo-no-background.png'


const Navbar = () => {

    return (
        <nav className="bg-white p-2 border-b-4 border-dark drop-shadow-xl shadow-black fixed w-full">
        <div className="container-fluid">
          <div className="flex flex-wrap items-center justify-between">
                <img src={Logo} className="max-w-xl" alt="Blogifyr Logo" />
                <div>
                <button className="
                    bg-gray text-dark px-10 py-5 rounded-xl text-xl shadow-lg mx-5
                    ">
                        Log In
                    </button>
                <button className="
                    bg-primary text-white px-10 py-5 rounded-xl text-xl mr-5 shadow-lg
                    ">
                        Sign Up
                    </button>
                    </div>

          </div>
        </div>
      </nav>
    )
}

export default Navbar;