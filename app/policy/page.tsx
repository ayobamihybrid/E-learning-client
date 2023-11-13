'use client';
import React, { FC, useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Policy from './Policy';

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title={`Policy - Elearning`}
        description="E-learning is a learning management system dedicated to helping programmers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />

      <Header
        activeItem={3}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      <Policy/>

      <Footer/>
    </div>
  );
};

export default Page;
