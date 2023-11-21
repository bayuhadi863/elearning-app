import React from 'react';
import FeatureCard from '@/Components/FeatureCard';

const Features = () => {
  return (
    <section id='features' className="flex-wrap items-center justify-center gap-8 text-center sm:flex pt-10 pb-16 px-4 bg-gray-800">
      <FeatureCard image={1} title={'Manage Leraning Materials'} description={'Providing features for easy, fast, and flexible material upload, viewing, and download.'} />
      <FeatureCard image={2} title={'Manage Assignments'} description={'Uploading, viewing, and downloading assignments to facilitate the assignment submission.'} />
      <FeatureCard image={3} title={'Manage Student Score'} description={'Providing features for easy and fast scoring, viewing scores, and score tracking.'}/>
    </section>
  );
};

export default Features;
