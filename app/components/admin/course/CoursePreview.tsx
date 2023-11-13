import React, { FC } from 'react';
import CoursePlayer from './CoursePlayer';
import { styles } from '../../styles/styles';
import Ratings from '../Ratings';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';

type Props = {
  courseData: any;
  active: number;
  setActive: (active: number) => void;
  handleCreateCourse: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  setActive,
  handleCreateCourse,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(-1);
  };

  const createCourse = () => {
    handleCreateCourse();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>

        <div className="flex items-center">
          <h1 className="pt-5 text-[25px] text-black dark:text-white">
            {courseData?.price == 0 ? 'Free' : courseData.price + '$'}
          </h1>

          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
            {courseData?.estimatedPrice}$
          </h5>

          <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
            {discountPercentagePrice}% off
          </h4>
        </div>

        <div className="flex items-center">
          <div
            className={`${styles.button} 1w-[1800px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Discount code..."
            className={`${styles.input} 1100px:!w-[60%] 1500px:!w-[50%] ml-3 !mt-0`}
          />

          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>

        <p className="pb-1 text-black dark:text-white">
          . Source code included
        </p>
        <p className="pb-1 text-black dark:text-white">
          . Full lifetime access
        </p>
        <p className="pb-1 text-black dark:text-white">
          . Certificate of completion
        </p>
        <p className="pb-3 text-black dark:text-white">. Premium support</p>
      </div>

      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            {courseData?.name}
          </h1>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={4} />
              <h5 className="text-black dark:text-white">0 Reviews</h5>
            </div>

            <h5 className="text-black dark:text-white">
              {courseData.purchased} students
            </h5>
          </div>

          <br />

          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            What you will learn from this course
          </h1>

          {courseData?.benefits?.map((benefit: any, index: number) => (
            <div className="w-full flex 800px:items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>

              <p className="pl-2 text-black dark:text-white">{benefit.title}</p>
            </div>
          ))}
        </div>

        <br />
        <br />

        <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
          What are the prerequisites for this course
        </h1>

        {courseData?.prerequisites.map((prerequisite: any, index: number) => (
          <>
            <div
              className="w-full flex 800px:items-center py-2 text-black dark:text-white"
              key={index}
            >
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>

              <p className="pl-2">{prerequisite.title}</p>
            </div>
          </>
        ))}

        <br />
        <br />

        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white ">
            {courseData?.description}
          </p>
        </div>

        <br />
        <br />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-black dark:text-white rounded mt-8 cursor-pointer "
          onClick={() => prevButton()}
        >
          Prev
        </div>

        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-black dark:text-white rounded mt-8 cursor-pointer "
          onClick={() => createCourse()}
        >
          {isEdit ? 'Update course' : 'Create'}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
