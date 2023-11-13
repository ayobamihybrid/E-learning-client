import React, { FC, useState, useEffect } from 'react';
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '../../../redux/features/layout/layoutApi';
import { styles } from '../styles/styles';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import toast from 'react-hot-toast';
import Loader from '../Loader';

type Props = {};

const EditCategories: FC<Props> = ({}) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery('Categories', {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }

    if (isSuccess) {
      refetch();
      toast.success('Categories updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess]);

  const handleAddCategories = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((cat: any) =>
        cat._id === id ? { ...cat, title: value } : cat
      )
    );
  };

  const newCategoriesHandler = () => {
    if (categories) {
      if (categories[categories?.length - 1]?.title === '') {
        toast.error('Category title cannot be empty');
      } else {
        setCategories((prevCategory: any) => [...prevCategory, { title: '' }]);
      }
    } else {
      setCategories([{ title: '' }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) =>
    categories.some((cat) => cat.title === '');

  const handleEditCategories = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: 'Categories',
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((category: any, index: number) => {
              return (
                <div key={index} className="p-3">
                  <div className="flex items-center w-full justify-center">
                    <input
                      type="text"
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={category.title}
                      onChange={(e) =>
                        handleAddCategories(category._id, e.target.value)
                      }
                      placeholder="Enter category title"
                    />

                    <AiOutlineDelete
                      className="text-black dark:text-white text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter(
                            (cat: any) => cat._id !== category._id
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}

          <br />
          <br />

          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="text-[25px] text-black dark:text-white cursor-pointer "
              onClick={newCategoriesHandler}
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <div
              className={`${
                styles.button
              } !w-[100px] !min-h-[50px] !h-[50px] text-black dark:text-white bg-[#cccccc34] !block ${
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? '!cursor-not-allowed'
                  : '!cursor-pointer !bg-[#42d383]'
              } !rounded absolute bottom-12 rigth-12 `}
              onClick={
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => null
                  : handleEditCategories
              }
            >
              Save
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
