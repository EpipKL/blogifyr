import React from 'react';
import 'tailwindcss/tailwind.css';

const Team = () => {
    return (
        <div className="bg-white pt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-primary text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-dark rounded-lg shadow-lg p-6">
              <img className="h-40 w-40 mx-auto rounded-full bg-white border-accent" src="" alt="Kyle" />
              <h3 className="text-xl font-semibold text-primary mt-4">Kyle Lucas</h3>
              <p className="text-white mb-4">Front End Developer</p>
              <p className="text-white">Bio / Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="flex justify-center mt-4">
                <a href="#" className="text-accent text-2xl mx-2">
                    <i class="fa-solid fa-address-card"></i>
                </a>
                <a href="#" className="text-accent text-2xl mx-2">
                    <i class="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
      
            <div className="bg-dark rounded-lg shadow-lg p-6">
              <img className="h-40 w-40 mx-auto rounded-full bg-white border-accent" src="" alt="Sergio" />
              <h3 className="text-xl font-semibold text-primary mt-4">Sergio Rodriguez</h3>
              <p className="text-white mb-4">Back End Developer</p>
              <p className="text-white">Bio / Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="flex justify-center mt-4">
                <a href="#" className="text-accent text-2xl mx-2">
                    <i class="fa-solid fa-address-card"></i>
                </a>
                <a href="#" className="text-accent text-2xl mx-2">
                    <i class="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
      
          </div>
        </div>
      </div>
    )
}

export default Team;