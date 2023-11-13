import Link from 'next/link';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="border-t border-[#0000000e] dark:border-[#ffffff3e]  ">
      <br />

      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white ">
              About
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our story
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white ">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white ">
              Social Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/gfuyruy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Youtube
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.youtube.com/gfuyruy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Instagram
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.youtube.com/gfuyruy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-3'>
            <h3 className='className="text-[20px] font-[600] text-black dark:text-white'>
              Contact Info
            </h3>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white">
              Call us: +234-08105829483
            </p>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white">
              Address: Sit amet consectetur adipisicing elit. Ea, est!
            </p>

            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white">
              Send us a mail: hello@e-learning.com
            </p>
          </div>
        </div>

        <br />

        <p className="text-center text-black dark:text-white">
          Copyright © 2023 E-learning | All rights reserved
        </p>
      </div>

      <br />
    </div>
  );
};

export default Footer;
