'use client';
import React, { FC } from 'react';
import Heading from '../utils/Heading';
import AdminProtected from '../hooks/adminProtected';
import AdminSidebar from '../components/admin/sidebar/AdminSidebar';
import DashboardHero from '../components/admin/dashboard/DashboardHero';

type Props = {};

const Page: FC<Props> = () => {

  return (
    <AdminProtected>
      <div>
        <Heading
          title={`Users - E-learning`}
          description="Admins's dashboard"
          keywords="Programming, MERN, Redux, Machine Learning"
        />

        <div className="flex min-h-screen">
          <div className="w-[20%] 1500px:w-[16%]">
            <AdminSidebar/>
          </div>

          <div className="w-[80%] 1500px:w-[84%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
