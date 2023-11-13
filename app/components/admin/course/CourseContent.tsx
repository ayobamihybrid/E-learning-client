import React, { FC, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import { styles } from '../../styles/styles';
import toast from 'react-hot-toast';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: '', url: '' });
    setCourseContentData(updatedData);
  };

  const handleAddNewContent = (item: any) => {
    if (
      item.title === '' ||
      item.description === '' ||
      item.videoUrl === '' ||
      item.links[0].title === '' ||
      item.links[0].url === ''
    ) {
      toast.error('Please fill out all the fields');
    } else {
      let newVideoSection = '';

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: newVideoSection,
        links: [{ title: '', url: '' }],
        suggestion: '',
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addnewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error('Please fill all fields');
    } else {
      setActiveSection(activeSection + 1);

      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: '', url: '' }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleNext = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error("Section can't be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-[70px] p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? 'mt-10' : 'mt-0'
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="w-full flex items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === 'Untitled Section'
                            ? 'w-[170px]'
                            : 'w-max'
                        } font-Poppins cursor-pointer text-black dark:text-white bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />

                      <BsPencil className="cursor-pointer text-black dark:text-white" />
                    </div>

                    <br />
                  </>
                )}

                <div className="flex w-full items-center justify-between">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-poppins text-black dark:text-white">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <div>
                          <p>{}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`text-black dark:text-white text-[20px] mr-2 ${
                        index > 0 ? 'cursor-pointer' : 'cursor-no-drop'
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />

                  {/* Arrow button to collapse video content */}
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="text-black dark:text-white"
                      style={{
                        transform: isCollapsed[index]
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>

                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video title</label>
                      <input
                        type="text"
                        placeholder="Project plan..."
                        className={styles.input}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="Ptpa2354"
                        className={styles.input}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="27"
                        className={styles.input}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder=""
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />

                      <br />
                      <br />

                      {item?.links.map((link: any, linkIndex: number) => (
                        <>
                          <div className="mb-3 block">
                            <div className="w-full flex items-center justify-between">
                              <label className={styles.label}>
                                Link {linkIndex + 1}
                              </label>

                              <AiOutlineDelete
                                classname={`${
                                  linkIndex === 0
                                    ? 'cursor-no-drop'
                                    : 'cursor-pointer'
                                } text-black dark:text-white text-[20px] `}
                                onClick={() =>
                                  linkIndex === 0
                                    ? null
                                    : handleRemoveLink(index, linkIndex)
                                }
                              />
                            </div>

                            <input
                              type="text"
                              placeholder="Source code... (Link title)"
                              className={`${styles.input}`}
                              value={link.title}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].links[linkIndex].title =
                                  e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />

                            <input
                              type="text"
                              placeholder="Source Code Url... (Link URL)"
                              className={`${styles.input} mt-6`}
                              value={link.url}
                              onChange={(e) => {
                                const updatedData = [...courseContentData];
                                updatedData[index].links[linkIndex].url =
                                  e.target.value;
                                setCourseContentData(updatedData);
                              }}
                            />
                          </div>
                        </>
                      ))}

                      <br />

                      <div className="inline-block mb-4">
                        <p
                          className="flex items-center text-[18px] text-black dark:text-white cursor-pointer"
                          onClick={() => handleAddLink(index)}
                        >
                          <BsLink45Deg className="mr-2" /> Add link
                        </p>
                      </div>

                      <br />

                      {index === courseContentData.length - 1 && (
                        <div>
                          <p
                            className="flex items-center text-[18px] text-black dark:text-white cursor-pointer"
                            onClick={(e: any) => handleAddNewContent(item)}
                          >
                            <AiOutlinePlusCircle className="mr-2" /> Add New
                            Content
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          );
        })}

        <br />

        <div
          className="flex items-center text-[20px] text:black dark:text-white cursor-pointer"
          onClick={() => addnewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </div>
      </form>

      <br />

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>

        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleNext()}
        >
          Next
        </div>
      </div>

      <br />
    </div>
  );
};

export default CourseContent;
