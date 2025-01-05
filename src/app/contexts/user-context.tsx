'use client';

import { onAuthStateChange } from '@/helpers/firebase/auth';
import { User } from 'firebase/auth';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type IUserContext = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isAuthLoading: boolean;
};

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => {},
  isAuthLoading: true,
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    onAuthStateChange((user) => {
      setUser(user ?? undefined);
      setIsAuthLoading(false);
    });
  }, []);

  const ctx = useMemo(
    () => ({ user, setUser, isAuthLoading }),
    [user, isAuthLoading]
  );

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
