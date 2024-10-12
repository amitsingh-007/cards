'use client';

import { useUser } from '@/app/contexts/user-context';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useUser();

  return user ? children : null;
};

export default AuthLayout;
