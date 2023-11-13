/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import NavItems from './NavItems';
import { ThemeSwitcher } from '../../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModal from '../../utils/CustomModal';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Verification from '../auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from '../../../public/assets/avatar3.png';
import { useSession } from 'next-auth/react';
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  const [logout, setLogout] = useState(false);

  const {} = useLogoutQuery(undefined, {
    skip: logout ? false : true,
  });

  useEffect(() => {
    if (!userData) {
      if (data) {
        socialAuth({
          email: data.user?.email,
          name: data.user?.name,
          avatar: data.user?.image,
        });
        refetch();
      }
    }

    if (data === null) {
      if (isSuccess) {
        toast.success('Login successful');
      }
    }

    if (data === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [data, userData, isLoading, isSuccess]);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'screen') {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? 'dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500'
            : 'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={'/'}
                className={`text-28px font-Poppins font-[600] text-black dark:text-white`}
              >
                <span className="text-[20px] font-[600]">E</span>-learning
              </Link>
            </div>

            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              {/* For mobile screen */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </div>

              {userData ? (
                <Link href={'/profile'}>
                  <Image
                    src={
                      userData.user.avatar ? userData.user.avatar.url : avatar
                    }
                    width={30}
                    height={30}
                    alt="user avatar"
                    className="h-[30px] w-[30px] ml-1 rounded-full cursor-pointer"
                    style={{
                      border: activeItem === 5 ? '2px solid #37a39a' : 'none',
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block ml-1 cursor-pointer dark:text-white text-black"
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {openSidebar && (
        <div
          className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
          id="screen"
          onClick={handleClose}
        >
          <div className="h-screen w-[70%] fixed z-[999999999] top-0 right-0 bg-white dark:bg-slate-900 dark:bg-opacity-90">
            <div className="mt-20 px-6">
              <NavItems activeItem={activeItem} isMobile={true} />

              {userData ? (
                <Link href={'/profile'}>
                  <Image
                    src={
                      userData.user.avatar ? userData.user.avatar.url : avatar
                    }
                    width={30}
                    height={30}
                    alt="user avatar"
                    className="h-[30px] w-[30px] ml-[20px] rounded-full cursor-pointer"
                    style={{
                      border: activeItem === 5 ? '2px solid #37a39a' : 'none',
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block ml-1 cursor-pointer dark:text-white text-black"
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                />
              )}

              <br />
              <br />

              <p className="dark:text-white text-black text-[16px]">
                Copyrigtht © 2023 E-learning{' '}
              </p>
            </div>
          </div>
        </div>
      )}

      {route === 'Login' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              component={Login}
              setRoute={setRoute}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === 'Signup' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              component={Signup}
              setRoute={setRoute}
            />
          )}
        </>
      )}

      {route === 'Verification' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              component={Verification}
              setRoute={setRoute}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
