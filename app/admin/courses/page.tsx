'use client';
import React, { FC } from 'react';
import DashboardHero from '../../components/admin/dashboard/DashboardHero';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebar';
import Heading from '../../../app/utils/Heading';
import AllCourses from '../../components/admin/course/AllCourses';

type Props = {};

const Page: FC<Props> = () => {
  return (
    <div>
      <Heading
        title={`Admin's profile - E-learning`}
        description="Admins's dashboard"
        keywords="Programming, MERN, Redux, Machine Learning"
      />

      <div className="flex min-h-screen">
        <div className="w-[20%] 1500px:w-[16%]">
          <AdminSidebar />
        </div>

        <div className="w-[80%] 1500px:w-[84%]">
          <DashboardHero />
          <AllCourses />
        </div>
      </div>
    </div>
  );
};

export default Page;
