import { useGetHeroDataQuery } from '../../../redux/features/layout/layoutApi';
import React, { useState, useEffect } from 'react';
import { styles } from '../styles/styles';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery('FAQ', {});

  const [activeQuestion, setActiveQuestion] = useState(null);

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto ">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
          Frequently Asked Questions
        </h1>

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
                    <span className="font-medium text-black dark:text-white ">
                      {question.question}
                    </span>

                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === question._id ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>

                {activeQuestion === question._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base font-Poppin bg-gradient-to-r from-blue-500 to-orange-600 bg-clip-text text-transparent">
                      {question.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
