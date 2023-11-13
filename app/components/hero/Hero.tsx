import React, { FC, useState } from 'react';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import { useGetHeroDataQuery } from '../../../redux/features/layout/layoutApi';
import Loader from '../Loader';
import { useRouter } from 'next/navigation';

type Props = {};

const Hero: FC<Props> = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery('Banner');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (search.length === 0) {
      return;
    } else {
      router.push(`/courses?title=$${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[95%] mx-auto min-h-screen flex flex-col items-center 800px:flex-row 800px:items-center 800px:justify-between 800px:gap-10 800px:mt-[-72px] 800px:w-[95%] 800px:mx-auto">
          <div className="h-[50vh] w-[50vh] mt-[100px] rounded-full hero_animation 800px:h-[400px] 800px:w-[490px] 1100px:h-[500px] 1100px:w-[550px] 1500px:w-[500px] 1500px:h-[500px] 1500px:ml-14 " />
          <div className="absolute pt-[110px] 800px:w-[40%] pl-8 800px:left-[-10px] 1500px:left-[20px]">
            <Image
              src={data?.layout?.banner?.image?.url}
              width={400}
              height={400}
              alt="A girl working on her computer"
              className="h-[300px] w-[300px] object-contain 800px:h-[500px] 800px:w-[500px] 800px:ml-14 1500px:mt-[-30px]"
            />
          </div>

          <div className="mt-14 800px:mt-[95px] w-[90%] 800px:w-[55%] 1500px:ml-[95px]">
            <h2 className="text-[30px] font-[600] font-Josefin text-black dark:text-white 800px:text-[35px] 1100px:text-[45px] 1500px:text-[55px] 1500px:leading-[75px]">
              {data?.layout?.banner?.title}
            </h2>

            <br />

            <p className="text-[14px] font-Josefin text-black dark:text-white 1500px:text-[18px]">
              {data?.layout?.banner?.subTitle}
            </p>

            <br />
            <br />

            <div className="relative w-full border rounded-[5px] dark:border-none">
              <input
                type="search"
                placeholder="Search courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 rounded-[5px] outline-none"
              />
              <div className="absolute right-0 top-0 bg-[#39c1f3] h-full w-[50px] flex items-center justify-center rounded-r-[5px]">
                <BiSearch
                  className="text-white size={30} cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </div>

            <br />

            <div className="flex items-center pb-5">
              <Image
                src={require('../../../public/assets/client-1.jpg')}
                alt="clients"
                className="rounded-full"
              />
              <Image
                src={require('../../../public/assets/client-2.jpg')}
                alt="clients"
                className="rounded-full ml-[-20px]"
              />
              <Image
                src={require('../../../public/assets/client-3.jpg')}
                alt="clients"
                className="rounded-full ml-[-20px]"
              />
              <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] text-[15px] ml-2 1500px:text-[17px]">
                500k+ people already trusted us.{' '}
                <Link
                  href={'/courses'}
                  className="dark:text-[#46e256] text-[crimson] text-[15px] 800px:text-[18px]"
                >
                  View courses
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
