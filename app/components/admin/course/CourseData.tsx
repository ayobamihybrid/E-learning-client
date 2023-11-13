'use client';
import React, { FC } from 'react';
import { styles } from '../../styles/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast from 'react-hot-toast';

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitsChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: '' }]);
  };

  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisite = [...prerequisites];
    updatedPrerequisite[index].title = value;
    setPrerequisites(updatedPrerequisite);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: '' }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleNext = () => {
    if (
      benefits[benefits.length - 1]?.title !== '' &&
      prerequisites[prerequisites.length - 1]?.title !== ''
    ) {
      setActive(active + 1);
    } else {
      toast.error('Please fill all the fields');
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px] `}>
          What are the benefits for students in this course?
        </label>

        <br />

        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="benefits"
            placeholder="You will be able to build a full stack LMS platform..."
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitsChange(index, e.target.value)}
          />
        ))}

        <AddCircleIcon
          style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
          onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px] `}>
          What are the prerequisites for starting this course?
        </label>

        <br />

        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You need a basic knowledge of React, Node"
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => {
              handlePrerequisiteChange(index, e.target.value);
              console.log(prerequisite.title, 'prerequisite');
            }}
          />
        ))}

        <AddCircleIcon
          style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
          onClick={handleAddPrerequisite}
        />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] h-[40px] flex items-center justify-center bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] h-[40px] flex items-center justify-center bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleNext()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
