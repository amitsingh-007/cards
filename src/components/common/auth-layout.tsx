'use client';

import { useUser } from '@/app/contexts/user-context';
import { Loader2 } from 'lucide-react';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const AuthLayout = ({ children }: Props) => {
  const { user } = useUser();

  return user ? (
    children
  ) : (
    <div className="pt-20">
      <Loader2 className="animate-spin mx-auto h-12 w-12" />
    </div>
  );
};

export default AuthLayout;
