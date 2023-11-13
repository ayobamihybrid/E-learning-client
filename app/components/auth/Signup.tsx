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
import { useRegisterMutation } from '../../../redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .email('Email address is not valid!')
    .required('Please enter your email address'),
  password: Yup.string().required('Please enter your password!').min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, { data, isSuccess, error }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Registration successful';
      toast.success(message);
      setRoute('Verification');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };

      await register(data);

    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-[80%] mx-auto 800px:w-full ">
      <h1 className={`${styles.title} mb-6`}>Join E-learning</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Enter your Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={`${errors.name && touched.name && 'border-red-500'} ${
            styles.input
          }`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block"> {errors.name} </span>
        )}

        <div className="w-full mt-5">
          <label htmlFor="email"> Enter your Email</label>
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
        </div>

        <div className="w-full mt-5 relative">
          <label htmlFor="password">Enter your Password</label>
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
          <input
            type="submit"
            value="Sign up"
            className={`${styles.button}`}
          />
        </div>

        <br />

        <h2 className="text-center font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h2>

        <div className="flex items-center justify-center my-3 gap-3">
          <FcGoogle size={30} className="cursor-pointer" />
          <AiFillGithub size={30} className="cursor-pointer" />
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already got an account?{' '}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute('Login')}
          >
            Sign in
          </span>
        </h5>

        <br />
      </form>
    </div>
  );
};

export default Signup;
