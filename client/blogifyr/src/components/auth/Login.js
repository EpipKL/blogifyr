import React from "react";
import 'tailwindcss/tailwind.css';
import Logo from '../../img/png/logo-no-background.png'

const Login = () => {
    return (
    <div className="bg-white h-screen justify-center items-center flex flex-col">
        <img src={Logo} className="mb-10" alt="Blogifyr Logo" />
        <div className="bg-dark m-10 p-24 rounded-xl shadow-2xl">
                <h1 className="text-white text-4xl mb-5">Log In</h1>
                <form className="">
                    <div className="mb-6">
                    <label for="text" className="block mb-2 text-white text-sm font-medium">Username</label>
                    <input type="text" className="text-sm rounded-lg block w-full p-2.5 " placeholder="Username" required />
                    </div>
                    <div className="mb-6">
                        <label for="password" className="block mb-2 text-white text-sm font-medium">Password</label>
                        <input type="password" id="password" className="text-sm rounded-lg block w-full p-2.5" required />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <p className="text-white">Don't have an account? <a href="#" className="text-accent underline">Sign Up</a></p>
                        </div>
                    </div>
                    <button type="submit" className="text-white text-xl bg-primary rounded-xl w-full text-center p-5">Log In</button>
            </form>
        </div>
    </div>
    )
}

export default Login;