/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import CoursePlayer from '../admin/course/CoursePlayer';
import { styles } from '../styles/styles';
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from 'react-icons/ai';
import Image from 'next/image';
import avatar from '../../../public/assets/avatar3.png';
import toast from 'react-hot-toast';
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useAddReplyToReviewMutation,
  useAddReviewMutation,
  useGetCourseDetailsQuery,
} from '../../../redux/features/courses/coursesApi';
import { format } from 'timeago.js';
import { BiMessage } from 'react-icons/bi';
import { MdVerified } from 'react-icons/md';
import Ratings from '../admin/Ratings';
import socketIO from 'socket.io-client';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch?: any;
};

const CourseContentMedia: FC<Props> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  const [activeBar, setActiveBar] = useState(0);

  const [question, setQuestion] = useState('');

  const [questionId, setQuestionId] = useState('');

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState('');

  const [answer, setAnswer] = useState('');

  const [isReviewReply, setIsReviewReply] = useState(false);

  const [reviewReply, setReviewReply] = useState('');

  const [reviewId, setReviewId] = useState('');

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const course = courseData?.course;

  const [
    addQuestion,
    { isSuccess, error, isLoading: creatingQuestionLoading },
  ] = useAddQuestionMutation({});

  const [
    addAnswer,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: creatingAnswerLoading,
    },
  ] = useAddAnswerMutation({});

  const [
    addReview,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: creatingReviewLoading,
    },
  ] = useAddReviewMutation({});

  const [
    addReplyToReview,
    {
      isSuccess: reviewReplySuccess,
      error: reviewReplyError,
      isLoading: creatingReviewReplyLoading,
    },
  ] = useAddReplyToReviewMutation({});

  const alreadyReviewed = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleSubmitQuestion = () => {
    if (question.length === 0) {
      toast.error('Question cannot be empty!');
    } else {
      addQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
    }
  };

  const handleSubmitAnswer = () => {
    addAnswer({
      answer,
      questionId,
      courseId: id,
      contentId: data[activeVideo]._id,
    });
  };

  const handleSubmitReview = () => {
    if (!creatingReviewReplyLoading) {
      if (review.length === 0) {
        toast.error('Review cannot be empty!');
      } else {
        addReview({ review, rating, courseId: id });
      }
    }
  };

  const handleReviewReply = () => {
    if (reviewReply.length === 0) {
      toast.error('Reply cannot be empty');
    } else {
      addReplyToReview({ comment: reviewReply, courseId: id, reviewId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion('');
      refetch();

      
      toast.success('Question added');

      socketId.emit('notification', {
        title: 'New Question received',
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }

    if (answerSuccess) {
      setAnswer('');
      refetch();

      toast.success('Reply added');

      if (user.role !== 'admin') {
        socketId.emit('notification', {
          title: 'New Reply received',
          message: `You have a new reply to your post in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }

    if (reviewSuccess) {
      setReview('');
      setRating(1);
      courseRefetch();

      toast.success('Your review has been added');

      socketId.emit('notification', {
        title: 'New Review received',
        message: `You have a new review in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }

    if (reviewReplySuccess) {
      setReviewReply('');
      courseRefetch();

      toast.success('Reply has been added');
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error?.data as any;
        toast.error(errorMessage.data?.message);
      }
    }

    if (answerError) {
      if ('data' in answerError) {
        const errorMessage = answerError?.data as any;
        toast.error(errorMessage.data?.message);
      }
    }

    if (reviewError) {
      if ('data' in reviewError) {
        const errorMessage = reviewError?.data as any;
        toast.error(errorMessage.data?.message);
      }
    }

    if (reviewReplyError) {
      if ('data' in reviewReplyError) {
        const errorMessage = reviewReplyError?.data as any;
        toast.error(errorMessage.data?.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewReplySuccess,
    reviewError,
    reviewReplyError,
  ]);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto ">
      <CoursePlayer
        title={data && data[activeVideo] ? data[activeVideo].title : ''}
        videoUrl={data && data[activeVideo] ? data[activeVideo].videoUrl : ''}
      />

      <div className="w-full flex items-center justify-between my-3 ">
        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px] !py-[unset] text-white ${
            activeVideo === 0 && '!cursor-no-drop opacity-[0.8]'
          } `}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>

        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px] !py-[unset] text-white ${
            activeVideo === 0 && '!cursor-no-drop opacity-[0.8]'
          } `}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <AiOutlineArrowRight className="mr-2" />
          Next Lesson
        </div>
      </div>

      <h1 className="pt-2 text-[25px] font-[600] text-black dark:text-white">
        {data && data[activeVideo] ? data[activeVideo].title : ''}
      </h1>

      <br />

      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner ">
        {['Overview', 'Resources', 'Q&A', 'Reviews'].map((text, index) => (
          <>
            <h5
              key={index}
              className={`800px:text-[20px] cursor-pointer ${
                activeBar === index
                  ? 'text-red-500'
                  : 'text-black dark:text-white'
              } `}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          </>
        ))}
      </div>

      <br />

      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data &&
            data[activeVideo] &&
            data[activeVideo]?.links.map((item: any, index: number) => (
              <>
                <div key={index} className="mb-5">
                  <h2 className="800px:text-[20px] 800px:inline-block text-black dark:text-white ">
                    {item.title && item.title + ' :'}
                  </h2>

                  <a
                    href={item.url}
                    className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2 "
                  >
                    {item.url}
                  </a>
                </div>
              </>
            ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatar}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />

            <textarea
              name=""
              id=""
              cols={40}
              rows={5}
              value={question}
              placeholder="Write your question"
              onChange={(e) => setQuestion(e.target.value)}
              className="outline-none bg-transparent ml-3 border border-[#fffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins "
            ></textarea>
          </div>

          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 $${
                creatingQuestionLoading && 'cursor-no-drop'
              } `}
              onClick={
                creatingQuestionLoading ? () => {} : handleSubmitQuestion
              }
            >
              Submit
            </div>
          </div>

          <br />
          <br />

          <div className="w-full h-[1px] bg-[#ffffff3b] "></div>

          <div>
            <CommentReplies
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleSubmitAnswer={handleSubmitAnswer}
              user={user}
              setQuestionId={setQuestionId}
              creatingAnswerLoading={creatingAnswerLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!alreadyReviewed && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    alt=""
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />

                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black ">
                      Give a rating <span className="text-red-500"></span>
                    </h5>

                    <div className="w-full flex ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((number) =>
                        rating >= number ? (
                          <AiFillStar
                            key={number}
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0"
                            size={25}
                            onClick={() => setRating(number)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={number}
                            className="mr-1 cursor-pointer"
                            color="rgb(246, 186, 0"
                            size={25}
                            onClick={() => setRating(number)}
                          />
                        )
                      )}
                    </div>

                    <textarea
                      name=""
                      id=""
                      cols={40}
                      rows={5}
                      value={review}
                      placeholder="Write a review"
                      onChange={(e) => setReview(e.target.value)}
                      className="outline-none bg-transparent ml-3 border border-[#fffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins "
                    ></textarea>
                  </div>
                </div>

                <div className="w-full flex justify-end ">
                  <div
                    className={`${
                      styles.button
                    } !w-[140px] !text-[18px] mt-5 mr-2 800px:mr-0 ${
                      creatingReviewLoading && 'cursor-no-drop'
                    }
                    `}
                    onClick={
                      creatingReviewLoading ? () => {} : handleSubmitReview
                    }
                  >
                    Add review
                  </div>
                </div>
              </>
            )}

            <br />

            <div className="w-full h-[1px] bg-[#ffffff3b]">
              <div className="w-full pt-3">
                {(course?.reviews && [...course.reviews].reverse()).map(
                  (review: any, index: number) => (
                    <>
                      <div key={index} className="w-full my-5 text-black dark:text-white">
                        <div className="w-full flex">
                          <div>
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

                          <div className="ml-2">
                            <h1 className="text-[18px] ">{review.user.name}</h1>

                            <Ratings rating={review.rating} />

                            <p>{review.comment}</p>

                            <small className="dark:text-[#ffffff83] text-black ">
                              {format(review.createdAt)}{' '}
                            </small>
                          </div>
                        </div>

                        {user.role === 'admin' && review?.commentReplies.length === 0 && (
                          <span
                            className={`${styles.label} !ml-[55px] text-[15px] cursor-pointer`}
                            onClick={() => {
                              setIsReviewReply(!isReviewReply);
                              setReviewId(review._id);
                            }}
                          >
                            Add reply
                          </span>
                        )}

                        {isReviewReply && reviewId === review._id (
                          <>
                            <div className="w-full flex relative">
                              <input
                                type="text"
                                placeholder="Send a reply..."
                                value={reviewReply}
                                onChange={(e: any) =>
                                  setReviewReply(e.target.value)
                                }
                                className="block 800px:ml-12 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%] "
                              />

                              <button
                                type="submit"
                                className="absolute right-0 bottom-1"
                                onClick={() => handleReviewReply()}
                              >
                                Add reply
                              </button>
                            </div>
                          </>
                        )}

                        {review.commentReplies.map((reviewReply: any, index: number) => (
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

                                <p>{reviewReply.comment}</p>

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
          </>
        </div>
      )}
    </div>
  );
};

const CommentReplies = ({
  user,
  data,
  activeVideo,
  answer,
  setAnswer,
  handleSubmitAnswer,
  setQuestionId,
  creatingAnswerLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo]?.questions?.map((question: any, index: any) => (
          <CommentItem
            user={user}
            key={index}
            data={data}
            activeVideo={activeVideo}
            question={question}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleSubmitAnswer={handleSubmitAnswer}
            creatingAnswerLoading={creatingAnswerLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  user,
  question,
  answer,
  setAnswer,
  setQuestionId,
  handleSubmitAnswer,
  creatingAnswerLoading,
}: any) => {
  const [activeReply, setActiveReply] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={question.user.avatar ? question.user.avatar.url : avatar}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>

          <div className="pl-3 text-black dark:text-white">
            <h5 className="text-[20px]">{question.user.name}</h5>
            <p>{question?.question}</p>
            <small className="text-[#000000b8] dark:text-[#ffffff83]">
              {format(question?.createdAt)}
            </small>
          </div>
        </div>

        <div className="w-full flex items-end">
          <span
            className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2 "
            onClick={() => {
              setActiveReply(!activeReply);
              setQuestionId(question._id);
            }}
          >
            {!activeReply
              ? question.questionReplies.length !== 0
                ? 'All replies'
                : 'Add reply'
              : 'Hide replies'}
          </span>

          <BiMessage
            size={20}
            className=" text-[#000000b8] dark:text-[#ffffff83] cursor-pointer"
          />

          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]  ">
            {question.questionReplies.length}
          </span>
        </div>

        {activeReply && setQuestionId === question._id (
          <>
            {question.questionReplies.map((qr: any, index:number) => (
              <>
                <div key={index} className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                  <div>
                    <Image
                      src={qr.user.avatar ? qr.user.avatar.url : avatar}
                      alt=""
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                  </div>

                  <div className="pl-2 text-black dark:text-white">
                    <div className="flex items-center">
                      <h5 className="text-[20px]">{qr.user.name}</h5>{' '}
                      {qr.user.role === 'admin' && (
                        <MdVerified className="text-[#50c750] ml-2 text-[20px]" />
                      )}
                    </div>
                    <p>{qr?.answer}</p>
                    <small className="text-[#000000b8] dark:text-[#ffffff83]">
                      {format(answer?.createdAt)}
                    </small>
                  </div>
                </div>
              </>
            ))}

            <div className="w-full flex relative">
              <input
                type="text"
                placeholder="Reply with an answer..."
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className={`block text-black dark:text-white 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] ${
                  answer === '' ||
                  (creatingAnswerLoading && 'cursor-not-allowed')
                }  `}
              />

              <button
                type="submit"
                className="absolute right-0 bottom-1 text-black dark:text-white"
                onClick={handleSubmitAnswer}
                disabled={answer === '' || creatingAnswerLoading}
              >
                Add a reply
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
