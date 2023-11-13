'use client';
import React, { FC, useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import FAQ from '../components/faq/FAQ';

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title={`FAQ - Elearning`}
        description="E-learning is a learning management system dedicated to helping programmers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />

      <Header
        activeItem={4}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      <FAQ/>

      <Footer/>
    </div>
  );
};

export default Page;
