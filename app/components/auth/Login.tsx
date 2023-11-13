import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../styles/styles';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email address is not valid!')
    .required('Please enter your email address'),
  password: Yup.string().required('Please enter your password!').min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      const data = {
        email,
        password,
      };
      await login(data);
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successful');
      setOpen(false);
      refetch();
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        toast.error('An error occurred');
      }
    }
  }, [isSuccess, error, setOpen]);

  return (
    <div className="w-[70%] mx-auto 800px:w-full ">
      <h1 className={`${styles.title} mb-6`}>Login with E-learning</h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="text-black dark:text-white text-[16px]"
        >
          {' '}
          Enter your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && 'border-red-500'} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block"> {errors.email} </span>
        )}

        <div className="w-full mt-5 relative">
          <label
            htmlFor="password"
            className="text-black dark:text-white text-[16px]"
          >
            Enter your Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder=""
            className={`${errors.email && touched.email && 'border-red-500'} ${
              styles.input
            }`}
          />

          {showPassword ? (
            <AiOutlineEye
              className="absolute right-2 bottom-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-2 bottom-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>

        <div className="mt-5 w-full">
          <input type="submit" value="login" className={`${styles.button}`} />
        </div>

        <br />

        <h2 className="text-center font-Poppins text-[14px] text-black dark:text-white">
          Log in with
        </h2>

        <div className="flex items-center justify-center my-3 gap-3">
          <FcGoogle
            size={30}
            className="text-black dark:text-white cursor-pointer"
            onClick={() => signIn('google')}
          />
          <AiFillGithub
            size={30}
            className="text-black dark:text-white cursor-pointer"
            onClick={() => signIn('github')}
          />
        </div>

        <h5 className="text-black dark:text-white text-center pt-4 font-Poppins text-[14px]">
          Don&apos;t have an account?{' '}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute('Signup')}
          >
            Sign up
          </span>
        </h5>

        <br />
      </form>
    </div>
  );
};

export default Login;
