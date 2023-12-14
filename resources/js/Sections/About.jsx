import React from 'react';
import AboutImage from '/public/assets/about1.png';

const About = () => {
  return (
    <section
      id="about"
      className=" bg-white w-full px-4 py-24 lg:px-24 md:px-10"
    >
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-10 bg-blue-600 rounded-2xl py-10">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12 ">
          <div className="md:5/12 lg:w-5/12 flex justify-center">
            <img
              src={AboutImage}
              alt="image"
              loading="lazy"
              className="rounded-lg max-h-72 shadow-md"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-amber-400 font-bold md:text-4xl">
              Smanda iLearn
            </h2>
            <p className="mt-6 text-gray-100">
              Smanda iLearn is a practical, multifunctional, fast, flexible, and
              user-friendly website-based Learning Management System (LMS) for
              SMA Negeri 1 Pandaan.
            </p>
            <p className="mt-4 text-gray-100">
              {' '}
              This website is very helpful for online and hybrid learning,
              covering school material management, assignments, quizzes, and
              student score management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
