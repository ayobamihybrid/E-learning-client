'use client';
import React, { FC, useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/header/Header';
import About from './About';
import Footer from '../components/Footer';

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title={`About us - Elearning`}
        description="E-learning is a learning management system dedicated to helping programmers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />

      <Header
        activeItem={2}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      <About/>

      <Footer/>
    </div>
  );
};

export default Page;
