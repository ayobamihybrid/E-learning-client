'use client';
import React, { FC, useState } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/header/Header';
import Profile from '../components/profile/Profile';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

type Props = {};

const Page: FC = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <div className="min-h-screen">
          <Heading
            title={`${user?.name}'s profile - E-learning`}
            description="User's profile"
            keywords="Programming, MERN, Redux, Machine Learning"
          />

          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            route={route}
            setRoute={setRoute}
          />
          <Profile user={user} />

          <Footer/>
        </div>
      </Protected>
    </div>
  );
};

export default Page;
