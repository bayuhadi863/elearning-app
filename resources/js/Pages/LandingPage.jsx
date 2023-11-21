import React from 'react';
import Hero from '@/Sections/Hero';
import About from '@/Sections/About';
import Features from '@/Sections/Features';
import Contact from '@/Sections/Contact';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

const LandingPage = () => {
  return (
    <>
      <GuestLayout page={'landingPage'}>
        <Head title="SMAN 1 Pandaan LMS - Smanda iLearn" />
        <Hero />
        <About />
        <Features />
        <Contact />
      </GuestLayout>
    </>
  );
};

export default LandingPage;
