import React from 'react';
import Team from './Team';
import 'tailwindcss/tailwind.css';

const About = () => {
    return (
            <div className="bg-white min-h-screen pt-24 items-center">

                <h1 className="text-dark text-6xl mx-auto mb-5 w-full text-center font-bold underline decoration-primary">About Blogifyr</h1>
                <div className="container w-full text-center mx-auto">
                    <h1 className="text-dark text-3xl font-bold ">
                        Are you a passionate writer, eager to share your ideas with the world? Look no further!
                        <br></br>
                        Blogifyr is here to fuel your creativity and empower you to create your very own blog in a flash.
                        <br></br> 
                        With our blazing fast blog creation process, you can focus on what truly matters – your words. 
                        <br></br>
                        Unleash your thoughts, tell your stories, and engage with your audience like never before. 
                        <br></br>
                        Join the Blogifyr community today and let your voice roar!
                    </h1>
                </div>

                <div>
                    <Team />
                </div>


            </div>
    )
}

export default About;