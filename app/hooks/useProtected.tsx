import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  return user ? children : redirect('/');
}
