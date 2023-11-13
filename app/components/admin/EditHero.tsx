/* eslint-disable @next/next/no-img-element */
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '../../../redux/features/layout/layoutApi';
import React, { useState, useEffect, FC } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../styles/styles';
import toast from 'react-hot-toast';

type Props = {};

const EditHero: FC<Props> = ({}) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  const { data, refetch } = useGetHeroDataQuery('Banner', {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: success, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }

    if (success) {
      toast.success('Hero updated successfully!');
      refetch();
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, success, error]);

  const handleUpdateImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (e: any) => {
    await editLayout({
      type: 'Banner',
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      <div className="w-[95%] mx-auto min-h-screen flex flex-col items-center 800px:flex-row 800px:items-center 800px:justify-between 800px:gap-10 800px:mt-[-72px] 800px:w-[95%] 800px:mx-auto">
        <div className="h-[50vh] w-[50vh] mt-[100px] rounded-full hero_animation 800px:h-[400px] 800px:w-[590px] 1100px:h-[500px] 1100px:w-[640px] 1500px:w-[650px] 1500px:h-[500px] 1500px:ml-14 " />
        <div className="absolute pt-[110px] 800px:w-[40%] pl-8 800px:left-[170px] 1500px:left-[255px]">
          <div className="relative">
            <img
              src={image}
              alt=""
              className="h-[300px] w-[300px] object-contain 800px:h-[500px] 800px:w-[500px] 800px:ml-14 1500px:mt-[-30px]"
            />

            <input
              type="file"
              id="banner"
              accept="image/*"
              onChange={handleUpdateImage}
              className="hidden"
            />

            <label
              htmlFor="banner"
              className="absolute bottom-6 1500px:bottom-10 right-[45px] 800px:right-[100px] 1500px:right-[120px] z-20"
            >
              <AiOutlineCamera className="text-black dark:text-white text-[18px] cursor-pointer " />
            </label>
          </div>
        </div>

        <div className="mt-14 800px:mt-[115px] w-[90%] 800px:w-[60%] 1500px:ml-[95px] 1500px:mt-[155px]">
          <textarea
            rows={4}
            className="text-[#000000c7] dark:text-white resize-none text-[35px] 800px:text-[45px] 1100px:text-[55px] px-3 w-full 1000px:text-[30px] 1500px:text-[60px] font-[600] font-Josefin outline-none bg-transparent"
            placeholder="Enhance your online learning experience instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={4}
            className="text-[#000000c7] dark:text-white resize-none text-[14px] px-3 w-full 1000px:text-[17px] 1500px:text-[18px] font-Josefin font-[600] !outline-none bg-transparent "
            placeholder="We offer over 40,000 online courses and have more than 500,000 registered online students. Discover your preferred courses from them."
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />

          <br />
          <br />

          <div className="relative w-full border rounded-[5px] dark:border-none">
            <div
              className={`${
                styles.button
              } !text-[15px] !w-[60px] !min-h-[30px] !h-[30px] text-black dark:text-white bg-[#cccccc34] ${
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? '!cursor-pointer !bg-[#42d383] '
                  : '!cursor-not-allowed '
              } !rounded absolute bottom-[-10px] right-4 `}
              onClick={
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save
            </div>
          </div>

          <br />
        </div>
      </div>
    </>
  );
};

export default EditHero;
