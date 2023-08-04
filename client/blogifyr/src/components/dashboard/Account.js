import React from 'react';
import 'tailwindcss/tailwind.css';

const Account = () => {
    return (
        <div className="bg-white h-screen w-screen">
            <div className="flex justify-between items-center">
                <div className="flex flex-col m-5 items-center">
                <div className="p-20 rounded-full bg-gray"></div>
                <button className="bg-gray text-sm text-dark mt-2 p-3 font-bold rounded-full">Select Avatar</button>
                </div>

            <div className="flex flex-col m-5 text-center">
                <div>
                <label for="twitter" className="block text-sm font-medium leading-6 text-dark">
                <i class="fa-brands fa-twitter"></i> Twitter / X 
                    </label>
                <input type="text" for="twitter" className="block w-full border-primary border-solid border-2 rounded-full p-1" placeholder="@username" />
                </div>
                <div>
                <label for="twitter" className="block text-sm font-medium leading-6 text-dark">
                <i class="fa-brands fa-facebook"></i> Facebook
                    </label>
                <input type="text" for="twitter" className="block w-full border-primary border-solid border-2 rounded-full p-1" placeholder="@username" />
                </div>
                <div>
                <label for="twitter" className="block text-sm font-medium leading-6 text-dark">
                <i class="fa-brands fa-instagram"></i> Instagram
                    </label>
                <input type="text" for="twitter" className="block w-full border-primary border-solid border-2 rounded-full p-1" placeholder="@username" />
                </div>
                <button className="text-sm text-dark bg-gray p-2 m-1 mt-2 font-bold rounded-full">Save</button>
            </div>



            </div>

            <div className="mt-20 flex flex-col justify-center items-center">
            <h1 className="text-dark text-4xl font-bold underline">About Me</h1>
            <div className="container">
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-primary border-2 mt-2 " placeholder="Write about yourself here..."></textarea>
            </div>
            <button className=" text-white text-md bg-primary py-5 px-10 m-2 font-bold rounded-full">Save</button>
            </div>

            <div className="flex justify-end mr-5 mt-5">
            <button className=" text-white text-md bg-dark py-5 px-10 font-bold rounded-full">Log Out</button>
            </div>

        </div>
    )
}

export default Account;