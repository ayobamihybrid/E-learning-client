'use client';
import Image from 'next/image';
import React, { FC } from 'react';
import defaultAvatar from '../../../public/assets/avatar3.png';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? 'bg-red-400 dark:bg-slate-800' : 'bg-transparent'
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar
          }
          alt="user's avatar"
          width={20}
          height={20}
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />

        <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
          My Account
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? 'dark:bg-slate-800 bg-red-400' : 'bg-transparent'
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} fill="gray" />
        <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
          Change password
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? 'dark:bg-slate-800 bg-red-400' : 'bg-transparent'
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} fill="gray" />
        <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
          Enrolled courses
        </h5>
      </div>

      {user.role === 'admin' && (
        <Link
          href={'/admin'}
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 4 ? 'dark:bg-slate-800 bg-red-400' : 'bg-transparent'
          }`}
          onClick={() => setActive(4)}
        >
          <MdOutlineAdminPanelSettings size={20} fill="gray" />
          <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
            Admin Dashboard
          </h5>
        </Link>
      )}

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} fill="gray" />
        <h5 className="hidden 800px:block pl-2 font-Poppins text-black dark:text-white">
          Log out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
