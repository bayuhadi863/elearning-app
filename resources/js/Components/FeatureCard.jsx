import React from 'react';
import materiImg from '/public/assets/feature1.png';
import tugasImg from '/public/assets/feature2.png';
import nilaiImg from '/public/assets/feature3.png';

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="w-full px-4 py-6 mt-6 bg-gray-700 rounded-lg shadow-lmd sm:w-1/2 md:w-1/2 lg:w-1/4">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
          <img
            src={
              image === 1
                ? materiImg
                : image === 2
                ? tugasImg
                : image === 3
                ? nilaiImg
                : ''
            }
            alt="logo"
            height="50"
            width="50"
            className='rounded-lg'
          />
        </div>
      </div>
      <h3 className="py-4 text-2xl font-semibold text-white sm:text-xl">
        {title}
      </h3>
      <p className="py-4 text-gray-100 text-md">{description}</p>
    </div>
  );
};

export default FeatureCard;
