import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '../../../redux/features/layout/layoutApi';
import React, { useState, useEffect } from 'react';
import { styles } from '../styles/styles';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import toast from 'react-hot-toast';
import Loader from '../Loader';

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery('FAQ', {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq);
    }

    if (isSuccess) {
      toast.success('FAQ updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;

        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((prevQtn) =>
        prevQtn._id === id ? { ...prevQtn, active: !prevQtn.active } : prevQtn
      )
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((prevQtn) =>
        prevQtn._id === id ? { ...prevQtn, question: value } : prevQtn
      )
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((prevQtn) =>
        prevQtn._id === id ? { ...prevQtn, answer: value } : prevQtn
      )
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        answer: '',
      },
    ]);
  };

  // Checking if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) =>
    questions.some((q) => q.question === '' || q.answer === '');

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: 'FAQ',
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] ">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions?.map((question: any) => (
                <div
                  key={question._id}
                  className={`${
                    question._id !== questions[0]?._id && 'border-t'
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg ">
                    <button
                      className="flex items-start text-black dark:text-white justify-between w-full text-left focus:outline-none "
                      onClick={() => toggleQuestion(question._id)}
                    >
                      <input
                        type="text"
                        className={`${styles.input} border-none`}
                        value={question.question}
                        onChange={(e: any) =>
                          handleQuestionChange(question._id, e.target.value)
                        }
                        placeholder="Add your question..."
                      />

                      <span className="ml-6 flex-shrink-0">
                        {question.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>

                  {question.active && (
                    <dd className="mt-2 pr-12">
                      <input
                        type="text"
                        className={`${styles.input} border-none`}
                        value={question.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(question._id, e.target.value)
                        }
                        placeholder="Add your answer..."
                      />

                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          className="text-black dark:text-white text-[18px] cursor-pointer "
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter(
                                (prevQuestion) =>
                                  prevQuestion._id !== question._id
                              )
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>

            <br />
            <br />
            <br />

            <IoMdAddCircleOutline
              className="text-black dark:text-white text-[25px] cursor-pointer "
              onClick={newFaqHandler}
            />
          </div>

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] text-black dark:text-white bg-[#cccccc34] ${
              areQuestionsUnchanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? 'cursor-not-allowed'
                : 'cursor-pointer !bg-[#42d383]'
            } !rounded absolute bottom-12 rigth-12`}
            onClick={
              areQuestionsUnchanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
