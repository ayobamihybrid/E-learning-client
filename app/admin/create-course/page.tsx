'use client';
import React from 'react';
import AdminSidebar from '../../components/admin/sidebar/AdminSidebar';
import Heading from '../../utils/Heading';
import DashboardHeader from '../../components/admin/dashboard/DashboardHeader';
import CreateCourse from '../../components/admin/course/CreateCourse';
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="E-learning - Admin"
        description="Get your programming skills up by learning with E-learning"
        keywords="Programming, MERN, Redux, Machine Learning"
      />

      <div className="flex">
        <div className="1500px:w-[16%] w-[20%]">
          <AdminSidebar />
        </div>

        <div className='w-[80%] z-999999999999999999999999999999999999999999999 '>
            <DashboardHeader/>
            <CreateCourse/>

        </div>
      </div>
    </div>
  );
};

export default page;
