'use client';
import React, { FC, useState, useEffect } from 'react';
import SidebarProfile from './SidebarProfile';
import { useLogoutQuery } from '../../../redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import ProfileInfo from './ProfileInfo';
import ChangePassword from '../auth/ChangePassword';
import CourseCard from '../courses/CourseCard';
import Courses from '../courses/Courses';
import { useGetAllCoursesQuery } from '../../../redux/features/courses/coursesApi';

type Props = { user: any };

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);

  const { data, isLoading } = useGetAllCoursesQuery(undefined, {});

  const [courses, setCourses] = useState([]);

  const {} = useLogoutQuery(undefined, {
    skip: logout ? false : true,
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
    toast.success('Logout successful');
  };

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto gap-6">
      <div
        className={`w-[60px] h-[450px] 800px:w-[310px] bg-white dark:bg-slate-900 bg-opacity-90 border border-[#0000001e] rounded-[8px] shadow-md dark:shadow-sm mt-[80px] mb-[80px] left-[30px] sticky ${
          scroll ? 'top-[120px]' : 'top-[30px]'
        }`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logoutHandler={logoutHandler}
        />
      </div>

      {active === 1 && (
        <div className="w-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}

      {active === 2 && (
        <div className="w-full bg-transparent mt-[80px]">
          <ChangePassword user={user} />
        </div>
      )}

      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 800px:mt-[100px] ">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 mg:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl-gap-[35px] ">
            {courses &&
              courses.map((course: any, index: number) => (
                <CourseCard course={course} key={index} isProfile={true} />
              ))}
          </div>

          {Courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins">
              You do not have any purchased course yet!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
