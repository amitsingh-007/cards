"use client";

import { onAuthStateChange } from "@/helpers/firebase/auth";
import { User } from "firebase/auth";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type IUserContext = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChange((user) => {
      setUser(user ?? undefined);
    });
  }, []);

  const ctx = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
