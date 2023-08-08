import React from 'react';
import Team from './Team';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const About = () => {
    return (
            <div className="bg-white-50 min-h-screen w-screen pt-12 md:pt-24 items-center" id="about">

                <h1 className="text-dark-500 text-4xl md:text-6xl mx-6 md:mx-auto mb-3 md:mb-5 w-full text-center font-bold underline decoration-primary-500">About Blogifyr</h1>
                <div className="container w-full text-center mx-auto px-6 md:px-12">
                    <p className="text-dark-500 text-base md:text-lg leading-relaxed md:leading-loose">
                        Are you a passionate writer, eager to share your ideas with the world? Look no further!
                        <br></br>
                        Blogifyr is here to fuel your creativity and empower you to create your very own blog in a flash.
                        <br></br> 
                        With our blazing fast blog creation process, you can focus on what truly matters – your words. 
                        <br></br>
                        Unleash your thoughts, tell your stories, and engage with your audience like never before. 
                        <br></br>
                        Join the Blogifyr community today and let your voice roar!
                    </p>

                </div>

                <div>
                    <Team />
                </div>


            </div>
    )
}

export default About;