/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { ThemeSwitcher } from '../../../utils/ThemeSwitcher';
import socketIO from 'socket.io-client';
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from '../../../../redux/features/notifications/notificationsApi';
import { format } from 'timeago.js';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(
    null
    // new Audio(
    //   'https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3'
    // )
  );

  const playNotificationSound = () => {
    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter(
          (notification: any) => notification.status === 'unread'
        )
      );
    }

    if (isSuccess) {
      refetch();
    }
    if (audio) {
      audio.load();
    }
  }, [data, isSuccess]);

  useEffect(() => {
    // Check if running on the client side before creating the Audio object
    if (typeof window !== 'undefined') {
      setAudio(
        new Audio(
          'https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3'
        )
      );
    }
  }, []);

  useEffect(() => {
    socketId.on('newNotification', (data) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />

      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-white" />
        <span className="absolute -top-2 -rigth-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>

      {open && (
        <div className="w-[420px] dark:bg-[#1213145a] bg-white bg-opacity-100 shadow-xl absolute top-16 rounded ">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>

          <div className='max-h-[500px] overflow-y-auto rounded-sm'>
            {notifications &&
              notifications.map((notification: any, index: number) => (
                <>
                  <div
                    key={index}
                    className="bg-[#0000002a] dark:bg-[#070707a4] bg-opacity-100 p-3 font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#000000f] z-999999999999999999 "
                  >
                    <div className="w-full flex items-center justify-between p-2">
                      <p className="text-black dark:text-white">
                        {notification.title}
                      </p>

                      <p
                        className="text-black dark:text-white cursor-pointer text-[14px]"
                        onClick={() =>
                          handleNotificationStatusChange(notification._id)
                        }
                      >
                        Mark as read
                      </p>
                    </div>

                    <p className="text-black dark:text-white ml-2 py-2">
                      {notification.message}
                    </p>

                    <p className="p-2 text-black dark:text-white text-[14px]">
                      {format(notification.createdAt)}
                    </p>
                  </div>
                </>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
