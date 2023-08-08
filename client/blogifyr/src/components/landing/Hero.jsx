import React from 'react'
import { Link } from 'react-router-dom'
import 'tailwindcss/tailwind.css'

const Hero = () => {
    return (
        <div className="bg-dark min-h-screen flex items-center justify-center flex-col">
                <div className="text-white text-center">
                <h1 className="text-accent text-6xl font-bold mb-4">Unleash Your Creativity and Ignite Your Ideas!</h1>
                <p className="text-4xl mt-10"><span className="text-primary">Blazing Fast</span> Blog Creation for Passionate Writers</p>
                <Link to='/login'>
                <button className="bg-primary text-white px-6 py-3 rounded-full text-xl mt-5 mb-5 shadow-lg">Get Started Now</button>
                </Link>
                </div>
            <div className="flex w-full justify-around items-center my-10">
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
 
            </div>
                
            <div className="flex justify-end m-10 w-full">
                <button className="bg-gray p-3 rounded-xl mr-5">
                    About Us
                </button>
                <button className="bg-gray p-3 rounded-xl mr-5">
                    Disclaimers
                </button>
            </div>
        </div>
    )
}

export default Hero;