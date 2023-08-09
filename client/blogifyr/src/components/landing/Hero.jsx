import React from 'react'
import { Link } from 'react-router-dom'
import 'tailwindcss/tailwind.css'

const Hero = () => {


    return (
        <div className="bg-dark-500 min-h-screen flex flex-col justify-center items-center">
                <div className="text-white-50 text-center">
                <h1 className="text-accent-500 text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Unleash Your Creativity and Ignite Your Ideas!</h1>
                <p className="text-xl md:text-3xl mt-3 md:mt-5"><span className="text-primary-500">Blazing Fast</span> Blog Creation for Passionate Writers</p>
                <Link to='/login'>
                <button className="bg-primary-500 hover:bg-primary-700 active:bg-primary-900 ac text-white-50 px-6 py-3 rounded-full text-xl mt-8 md:mt-12 shadow-lg transition duration-300">
                    Get Started Now
                    </button>
                </Link>
                </div>

                {/* TODO: ADD FUNCTION FOR USERS */}
            {/* <div className="flex w-full justify-around items-center my-10">
            <a href="#">
                <div className="flex items-center container mx-auto px-4">
                    <div className="p-20 rounded-full bg-primary border-white border-2"></div>
                    <p className="ml-2 text-white text-lg"> <span className="text-accent">Kyle</span> has created new post <span className="underline decoration-primary">Easiest way to make a blog</span></p>
                </div>
            </a>

            <a href="#">
                <div className="flex items-center container mx-auto px-4">
                    <div className="p-20 rounded-full bg-primary border-white border-2"></div>
                    <p className="ml-2 text-white text-lg"><span className="text-accent">Kyle</span> has created new post <span className="underline decoration-primary">How to quickly setup your web dev project</span></p>
                </div>
            </a>

            <a href="#">
                <div className="flex items-center container mx-auto px-4">
                    <div className="p-20 rounded-full bg-primary border-white border-2"></div>
                    <p className="ml-2 text-white text-lg"><span className="text-accent">Kyle</span> has created new post <span className="underline decoration-primary">My journey to Colombia!</span></p>
                </div>
            </a>
 
            </div> */}
                
            {/* INFORMATION BUTTONS */}

            <div className="absolute bottom-0 flex justify-end items-center w-full p-5 z-10">
                <a href="#about">
                <button className="bg-gray-500 p-3 rounded-xl mr-3">
                    About Us
                </button>
                </a>
                <button className="bg-gray-500 p-3 rounded-xl">
                    Disclaimers
                </button>
            </div>
        </div>
    )
}

export default Hero;