import { getDatabase, ref, push, set } from "firebase/database";
import { CardDataSchema, TCardData } from "@/types/card";
import firebaseApp from ".";
import { getCurrentUser } from "./auth";

const database = getDatabase(firebaseApp);

const getUserPath = (path: string) => {
  const user = getCurrentUser();
  return `${user.uid}/${path}`;
};

const addToList = async <T extends Record<string, any>>(
  path: string,
  data: T
) => {
  const listRef = ref(database, getUserPath(path));
  const newCardRef = push(listRef);
  await set(newCardRef, data);
};

export const saveCard = (card: TCardData) => {
  CardDataSchema.parse(card);
  addToList("cards", card);
};
