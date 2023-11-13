'use client';
import React, { FC } from 'react';
import Heading from '../../utils/Heading';
import EditHero from '../../../app/components/admin/EditHero';
import AdminSidebar from '../../../app/components/admin/sidebar/AdminSidebar';
import AdminProtected from '../../../app/hooks/adminProtected';
import DashboardHero from '../../../app/components/admin/dashboard/DashboardHero';

type Props = {};

const Page: FC<Props> = () => {
  return (
    <AdminProtected>
      <div>
        <Heading
          title={`Hero - E-learning`}
          description="Admins's dashboard"
          keywords="Programming, MERN, Redux, Machine Learning"
        />

        <div className="flex min-h-[100vh]">
          <div className="w-[20%] 1500px:w-[16%]">
            <AdminSidebar />
          </div>

          <div className="w-[80%] 1500px:w-[84%]">
            <DashboardHero />
            <EditHero />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
