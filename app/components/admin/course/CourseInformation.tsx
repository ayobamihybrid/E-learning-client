/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from 'react';
import { styles } from '../../styles/styles';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data } = useGetHeroDataQuery('Categories');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            required
            value={courseInfo.name}
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            className={`${styles.input}`}
          />
        </div>

        <br />

        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>

        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>
              Discount price (optional)
            </label>
            <input
              type="text"
              required
              id="price"
              placeholder="49"
              className={`${styles.input}`}
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
            />
          </div>

          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Course price</label>
            <input
              type="text"
              required
              id="estimatedPrice"
              placeholder="79"
              className={`${styles.input}`}
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
            />
          </div>
        </div>

        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Tags</label>
            <input
              type="text"
              required
              id="tags"
              placeholder="MERN, Next13,Socket io, Tailwind css, LMS "
              className={`${styles.input}`}
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
            />
          </div>

          <div className="w-[50%]">
            <label className={`${styles.label}`}>Course Categories</label>
            <select
              name=""
              id=""
              value={courseInfo.category}
              className={`${styles.input}`}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, category: e.target.value });
                console.log(courseInfo.category, 'category');
              }}
            >
              <option value="">Select Category</option>
              {categories?.map((cat: any) => (
                <option
                  value={cat.title}
                  key={cat._id}
                  className="text-black"
                >
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course level</label>
            <input
              type="text"
              required
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
            />
          </div>

          <div className="w-[50%]">
            <label className={`${styles.label}`}>Demo Url</label>
            <input
              type="text"
              required
              id="demoUrl"
              placeholder="ere774fd"
              className={`${styles.input}`}
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
            />
          </div>
        </div>

        <br />

        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] border-[#00000026] dark:border-white p-3 border flex items-center justify-center cursor-pointer ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="course thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>

        <br />
        <br />

        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>

        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
