import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Ratings from '../admin/Ratings';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { format } from 'timeago.js';
import CoursePlayer from '../admin/course/CoursePlayer';
import Link from 'next/link';
import { styles } from '../styles/styles';
import CourseContentList from './CourseContentList';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../payment/CheckOutForm';
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';
import Image from 'next/image';
import avatar from '../../../public/assets/avatar3.png';
import { MdVerified } from 'react-icons/md';

type Props = {
  course: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

const CourseDetails: FC<Props> = ({
  course,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen: setOpenAuthModal,
}) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const [open, setOpen] = useState(false);

  const discountPercentage =
    ((course?.estimatedPrice - course?.price) / course?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === course._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute('Login');
      setOpenAuthModal(true);
    }
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5 ">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              {course.name}
            </h1>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={course.ratings} />

                <h5 className="text-black dark:text-white ">
                  {course.reviews?.length} Reviews
                </h5>
              </div>

              <h5 className="text-black dark:text-white ">
                {course.purchased} Students
              </h5>
            </div>

            <br />

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              What will you learn from this course?
            </h1>

            <div>
              {course.benefits.map((benefit: any, index: number) => (
                <>
                  <div
                    className="w-full flex 800px:items-center py-2"
                    key={index}
                  >
                    <div className="w-[15px] mr-1 ">
                      <IoCheckmarkDoneOutline
                        size={20}
                        classname="text-black dark:text-white"
                      />
                    </div>

                    <p className="pl-2 text-black dark:text-white">
                      {benefit.title}
                    </p>
                  </div>
                </>
              ))}
            </div>

            <br />
            <br />

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              What are the prequisites for starting this course?
            </h1>

            <div>
              {course.prerequisites.map((prerequisite: any, index: number) => (
                <>
                  <div
                    className="w-full flex 800px:items-center py-2"
                    key={index}
                  >
                    <div className="w-[15px] mr-1 ">
                      <IoCheckmarkDoneOutline
                        size={20}
                        classname="text-black dark:text-white"
                      />
                    </div>

                    <p className="pl-2 text-black dark:text-white">
                      {prerequisite.title}
                    </p>
                  </div>
                </>
              ))}

              <br />
              <br />

              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
                Course Overview
              </h1>
              <CourseContentList
                courseContent={course?.courseData}
                isDemo={true}
              />
            </div>

            <br />
            <br />

            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              Course Details
            </h1>
            <p className="text-black dark:text-white font-[600] font-[Poppins] text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden ">
              {course.description}
            </p>

            <br />
            <br />

            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={course?.ratings} />

                <div className="mb-2 800px:mb-[unset] " />

                <h5 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">
                  {Number.isInteger(course?.ratings)
                    ? course?.ratings.toFixed(1)
                    : course.ratings.toFixed(2)}{' '}
                  Course Rating * {course.reviews?.length} Reviews
                </h5>
              </div>

              <br />

              {(course.reviews && [...course.reviews].reverse()).map(
                (review: any, index: number) => (
                  <>
                    <div className="w-full pb-4" key={index}>
                      <div className="flex">
                        <div className="w-[50px] h-[50px] ">
                          <Image
                            src={
                              review?.user.avatar
                                ? review?.user.avatar.url
                                : avatar
                            }
                            alt=""
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>

                        <div className="hidden 800px:block pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[18px] pr-2 text-black dark:text-white ">
                              {review.user.name}
                            </h5>

                            <Ratings rating={review.rating} />
                          </div>

                          <p className="text-black dark:text-white ">
                            {review.comment}
                          </p>
                          <small className="text-[#000000d1] dark:text-[#ffffff83] ">
                            {' '}
                            {format(review.createdAt)} *
                          </small>
                        </div>

                        <div className="pl-2 flex 800px:hidden items-center ">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white ">
                            {review.user.name}
                          </h5>

                          <Ratings rating={review.rating} />
                        </div>
                      </div>

                      {review.commentReplies.map((reviewReply: any, index:number) => (
                        <>
                          <div key={index} className="w-full flex 800px:ml-16 my-5 ">
                            <div className="w-[50px] h-[50px] ">
                              <Image
                                src={
                                  reviewReply?.user.avatar
                                    ? reviewReply?.user.avatar.url
                                    : avatar
                                }
                                alt=""
                                width={50}
                                height={50}
                                className="w-[50px] h-[50px] rounded-full object-cover"
                              />
                            </div>

                            <div className="pl-2">
                              <div className="flex items-center">
                                <h5 className="text-[20px]">
                                  {reviewReply.user.name}
                                </h5>{' '}
                                {reviewReply.user.role === 'admin' && (
                                  <MdVerified className="text-[#50c750] ml-2 text-[20px]" />
                                )}
                              </div>

                              <p className="text-black dark:text-white">
                                {reviewReply.comment}
                              </p>

                              <small className="dark:text-[#ffffff83] text-black ">
                                {format(reviewReply.createdAt)}
                              </small>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                )
              )}
            </div>
          </div>

          <div className="w-full 800px:w-[35%] relative ">
            <div className="sticky top-[100px] left-0 z-50 w-full ">
              <CoursePlayer videoUrl={course?.demoUrl} title={course?.title} />

              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white ">
                  {course.price === 0 ? 'Free' : course.price + '$'}
                </h1>

                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white ">
                  {course.estimatedPrice}$
                </h5>

                <h4 className="pl-3 text-[20px]  mt-2 opacity-80 text-black dark:text-white ">
                  {discountPercentagePrice}% off
                </h4>
              </div>

              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !text-[18px] !w-[180px] mt-3 font-Poppins cursor-pointer !bg-gradient-to-r from-green-300 to-green-500`}
                    href={`/course-access/${course._id}`}
                  >
                    View Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !text-[18px] !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] `}
                    onClick={handleOrder}
                  >
                    Buy Now {course.price}$
                  </div>
                )}
              </div>

              <br />

              <p className="pb-1 text-black dark:text-white">
                * Full time life access
              </p>
              <p className="pb-1 text-black dark:text-white">
                * Certificate of completion{' '}
              </p>
              <p className="pb-1 text-black dark:text-white">
                * Premium support
              </p>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="w-full h-screen bg-[#0000008a] fixed top-0 left-0 z-50 flex items-center justify-center ">
          <div className="w-[90%] 800px:w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3 ">
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={40}
                className="text-black cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm setOpen={setOpen} course={course} user={user} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
