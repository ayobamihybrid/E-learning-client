import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div>
      <div className={'w-[90%] 800px:w-[80%] m-auto'}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl text-[#000] dark:text-white 800px:!leading-[60px] font-[700] tracking-tight ">
          Expand Your Career{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Opportunities
          </span>
          <br /> With Our Courses
        </h1>

        <br />
        <br />

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[25px] 1500px:gap-[35px] mb-12 border-0 ">
          {courses &&
            courses.map((course: any, index: number) => (
              <CourseCard course={course} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
