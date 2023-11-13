import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import defaultAvatar from '../../../public/assets/avatar3.png';
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../styles/styles';
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from '../../../redux/features/user/userApi';
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';
import toast from 'react-hot-toast';

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const [editProfile, { isSuccess: success, error: isError }] =
    useEditProfileMutation();

  const imageHandler = (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }

    if (error || isError) {
      console.log(error);
    }

    if (success) {
      toast.success('Profile updated successfully');
    }
  }, [isSuccess, error, success, isError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name !== '') {
      await editProfile({ name: name });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative ">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar
            }
            alt="User's avatar"
            width={140}
            height={140}
            className="w-[140px] h-[140px] cursor-pointer rounded-full border-[3px] border-[#37a39a]"
          />

          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />

          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera />
            </div>
          </label>
        </div>
      </div>

      <br />
      <br />

      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="block m-auto 800px:w-[50%]">
            <div className="w-[100%]">
              <label htmlFor="name" className="block">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                required
                placeholder={user.name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-3`}
              />
            </div>

            <div className="w-[100%]">
              <label htmlFor="name" className="block">
                Email Address
              </label>

              <input
                type="text"
                value={email}
                placeholder={user.email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles.input} !w-[95%] mb-3 800px:mb-0`}
              />
            </div>

            <input
              type="submit"
              value="Update"
              className={`w-[95%] 800px:w-[50%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
