'use client';

import CourseDetailsPage from '../../../app/components/courses/CourseDetailsPage';
import React from 'react';

const page = ({ params }: any) => {
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default page;
