'use client';
import { redirect } from 'next/navigation';
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';
import React, { useEffect } from 'react';
import Loader from '../../../app/components/Loader';
import CourseContent from '@/app/components/courses/courseContent';

const Page = ({ params }: any) => {
  const id = params.id;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (course: any) => course._id === id
      );

      if (!isPurchased) {
        redirect('/');
      }
    }

    if (error) {
      redirect('/');
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='!bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black min-h-[400vh]'>
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default Page;
