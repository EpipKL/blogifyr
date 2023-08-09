import React from 'react';
import 'tailwindcss/tailwind.css';

const Team = () => {
    return (
        <div className="bg-white-50 pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-primary-500 text-center mb-8 sm:mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

            {/* Cards */}
            <div className="bg-dark-500 rounded-lg shadow-lg p-6 hover:scale-110">
              <img className="h-40 w-40 mx-auto rounded-full bg-white-50 border-2 border-accent-500" src="" alt="Kyle" />
              <h3 className="text-xl font-semibold text-primary-500 mt-2 md:mt-4">Kyle Lucas</h3>
              <p className="text-white-50 mb-2">Front End Developer</p>
              <p className="text-white-50 text-sm md:text-base mb-4">Bio / Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="flex justify-center">
                <a href="#" className="text-accent-500 text-2xl mx-2">
                    <i className="fa-solid fa-address-card"></i>
                </a>
                <a href="#" className="text-accent-500 text-2xl mx-2">
                    <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
      
            <div className="bg-dark-500 rounded-lg shadow-lg p-6 mb-2 hover:scale-110">
              <img className="h-40 w-40 mx-auto rounded-full bg-white-50 border-2 border-accent-500" src="" alt="Kyle" />
              <h3 className="text-xl font-semibold text-primary-500 mt-2 md:mt-4">Sergio Rodriguez</h3>
              <p className="text-white-50 mb-2">Back End Developer</p>
              <p className="text-white-50 text-sm md:text-base mb-4">Bio / Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="flex justify-center">
                <a href="#" className="text-accent-500 text-2xl mx-2">
                    <i className="fa-solid fa-address-card"></i>
                </a>
                <a href="#" className="text-accent-500 text-2xl mx-2">
                    <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
      
          </div>
        </div>
      </div>
    )
}

export default Team;