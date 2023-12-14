import React from 'react';
import LandingPageImg from '/public/assets/landing-page.png';

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-white w-full pt-16 px-4 md:px-10 lg:px-24 lg:h-screen "
    >
      <div className="grid max-w-screen-xl px-0 py-8 mx-auto lg:gap-8 xl:gap-8 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="text-gray-950 max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-4xl xl:text-5xl ">
            Be Smart and Be Experienced With Smanda iLearn
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
            To become a high-quality student with the best online learning
            resources at SMA Negeri 1 Pandaan.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition ease-in duration-200"
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  transition ease-in duration-200"
          >
            Contact Us
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={LandingPageImg} alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
