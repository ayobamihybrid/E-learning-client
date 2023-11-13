'use client';
import React, { useState, useEffect, FC } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import {
  useEditCourseMutation,
  useGetAllCoursesAdminQuery,
} from '../../../../redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const { isLoading, data, refetch } = useGetAllCoursesAdminQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const editCourseData =
    data && data.courses.find((course: any) => course._id === id);

  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
  });

  const [benefits, setBenefits] = useState([{ title: '' }]);

  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);

  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Untitled Section',
      links: [
        {
          title: '',
          url: '',
        },
      ],
      suggestion: '',
    },
  ]);

  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData?.name,
        description: editCourseData?.description,
        price: editCourseData?.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData?.tags,
        level: editCourseData?.level,
        thumbnail: editCourseData?.thumbnail?.url,
        demoUrl: editCourseData?.demoUrl,
      });

      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Course updated successfully');
      redirect('/admin/courses');
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedCourseContentData = courseContentData.map(
      (CourseContent) => ({
        videoUrl: CourseContent.videoUrl,
        title: CourseContent.title,
        description: CourseContent.description,
        videoSection: CourseContent.videoSection,
        links: CourseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: CourseContent.suggestion,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo?.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCreateCourse = async (e: any) => {
    const data = courseData;

    if (!isLoading) {
      await editCourse({ id: editCourseData._id, data });
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      {editCourseData ? (
        <>
          <div className="w-[80%]">
            {active === 0 && (
              <CourseInformation
                courseInfo={courseInfo}
                setCourseInfo={setCourseInfo}
                active={active}
                setActive={setActive}
              />
            )}

            {active === 1 && (
              <CourseData
                benefits={benefits}
                setBenefits={setBenefits}
                prerequisites={prerequisites}
                setPrerequisites={setPrerequisites}
                active={active}
                setActive={setActive}
              />
            )}

            {active === 2 && (
              <CourseContent
                courseContentData={courseContentData}
                setCourseContentData={setCourseContentData}
                handleSubmit={handleSubmit}
                active={active}
                setActive={setActive}
              />
            )}

            {active === 3 && (
              <CoursePreview
                courseData={courseData}
                active={active}
                setActive={setActive}
                handleCreateCourse={handleCreateCourse}
                isEdit={true}
              />
            )}
          </div>

          <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
            <CourseOptions active={active} setActive={setActive} />
          </div>
        </>
      ) : (
        <p className="w-full h-screen flex items-center justify-center text-red-500">
          Error getting course details
        </p>
      )}
    </div>
  );
};

export default EditCourse;
