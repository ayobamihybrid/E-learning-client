'use client';
import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetAllCoursesQuery } from '../../redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Loader from '../components/Loader';
import Header from '../components/header/Header';
import Heading from '../utils/Heading';
import { styles } from '../components/styles/styles';
import CourseCard from '../components/courses/CourseCard';
import Footer from '../components/Footer';

type Props = {};

const Page: FC<Props> = ({}) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title');
  const { data, isLoading } = useGetAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery('Categories', {});
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    if (category === 'All') {
      setCourses(data?.courses);
    } else {
      setCourses(
        data?.courses.filter((course: any) => course.categories === category)
      );
    }

    if (search) {
      setCourses(
        data?.courses.filter((course: any) =>
          course.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />

          <div className="w-[95%] 800px:w-[85%] m -auto min-h-[90vh] ">
            <Heading
              title="All courses - E-learning"
              description="A programming community"
              keywords={
                'programming community, coding, expert insights, collaboration, growth'
              }
            />

            <br />

            <div className="w-full flex items-center flex-wrap ml-14">
              <div
                className={`h-[35px] ${
                  category === 'All' ? 'bg-[crimson]' : 'bg-[#5050cb]'
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
                onClick={() => setCategory('All')}
              >
                All
              </div>

              {categories &&
                categories.map((categoryy: any, index: number) => (
                  <>
                    <div key={index}>
                      <div
                        className={`h-[35px] ${
                          categoryy.title === category
                            ? 'bg-[crimson]'
                            : 'bg-[#5050cb]'
                        } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
                        onClick={() => {
                          setCategory(categoryy.title);
                        }}
                      >
                        {categoryy.title}
                      </div>
                    </div>
                  </>
                ))}
            </div>

            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} flex items-center justify-center  h-[50vh] `}
              >
                {search
                  ? 'No courses found!'
                  : 'No courses found in this category. Please try another one.'}
              </p>
            )}

            <br />
            <br />

            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 ml-16 border-0 ">
              {courses &&
                courses.map((course: any, index: number) => (
                  <CourseCard course={course} key={index} />
                ))}
            </div>
          </div>

          <br />
          <br />

          <Footer/>
        </>
      )}
    </>
  );
};

export default Page;
