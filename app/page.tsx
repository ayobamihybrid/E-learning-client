'use client';
import React, { FC, useState } from 'react';
import Heading from './utils/Heading';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Courses from './components/courses/Courses';
import Reviews from './components/review/Reviews';
import FAQ from './components/faq/FAQ';
import Footer from './components/Footer';

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title="E-learning"
        description="Get your programming skills up by learning with E-learning"
        keywords="Programming, MERN, Redux, Machine Learning"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Hero />

      <Courses />

      <Reviews/>

      <FAQ/>

      <Footer/>
    </div>
  );
};

export default Page;
