import React, { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { styles } from '../styles/styles';
import { useActivationMutation } from '../../../redux/features/auth/authApi';
import { useSelector } from 'react-redux';

type Props = {
  setRoute: (route: string) => void;
};

type VerificationNumbers = {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [activation, { isSuccess, error }] = useActivationMutation();

  const { token } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Verification successful');
      setRoute('Login');
    }

    if (error) {
      setInvalidError(true);
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        toast.error('An error occured');
      }
    }
  }, [error, isSuccess, setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [VerificationNumbers, setVerificationNumbers] =
    useState<VerificationNumbers>({
      '0': '',
      '1': '',
      '2': '',
      '3': '',
    });

  const verificationHandler = async () => {
    const activationCode = Object.values(VerificationNumbers).join('');

    if (activationCode.length !== 4) {
      setInvalidError(true);
      return;
    }

    await activation({
      activation_code: activationCode,
      activation_token: token,
    });
  };

  const HandleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerificationNumber = { ...VerificationNumbers, [index]: value };
    setVerificationNumbers(newVerificationNumber);

    if (value === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>

      <br />

      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497df2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>

      <br />
      <br />

      <div className="m-auto flex items-center justify-around">
        {Object.keys(VerificationNumbers).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? 'shake border-red-500'
                : isSuccess
                ? 'border-green-400'
                : 'dark:border-white border-[#0000004a]'
            }`}
            placeholder=""
            maxLength={1}
            value={VerificationNumbers[key as keyof VerificationNumbers]}
            onChange={(e) => HandleInputChange(index, e.target.value)}
          />
        ))}
      </div>

      <br />
      <br />

      <button className={`${styles.button}`} onClick={verificationHandler}>
        Verify OTP
      </button>

      <br />

      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to sign in?{' '}
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute('Login')}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;
