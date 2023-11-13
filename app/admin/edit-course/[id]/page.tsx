'use client';
import EditCourse from '@/app/components/admin/course/EditCourse';
import AdminSidebar from '../../../components/admin/sidebar/AdminSidebar';
import CreateCourse from '../../../components/admin/course/CreateCourse';
import DashboardHeader from '../../../components/admin/dashboard/DashboardHeader';
import Heading from '../../../../app/utils/Heading';
import React from 'react';

type Props = {};

const page = ({params}: any) => {
    const id = params?.id
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

        <div className='w-[80%] z-999999999999999999999999999999999999999999999'>
            <DashboardHeader/>
            <CreateCourse/>
            <EditCourse id={id}/>

        </div>
      </div>
    </div>
  );
};

export default page;
