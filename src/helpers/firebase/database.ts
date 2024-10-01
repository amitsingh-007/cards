import { getDatabase, ref, push, get, child, set } from "firebase/database";
import { CardDataSchema, TCardData } from "@/types/card";
import firebaseApp from ".";
import { getCurrentUser } from "./auth";

const database = getDatabase(firebaseApp);

const getUserPath = (path: string) => {
  const user = getCurrentUser();
  return `${user.uid}/${path}`;
};

const fetchData = async <T>(path: string): Promise<T | null> => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, getUserPath(path)));
  return snapshot.exists() ? snapshot.val() : null;
};

const addToList = async <T extends Record<string, any>>(
  path: string,
  data: T
) => {
  const listRef = ref(database, getUserPath(path));
  const newCardRef = push(listRef);
  await set(newCardRef, data);
};

export const getCards = async () => {
  return fetchData<Record<string, TCardData>>("cards");
};

export const saveCard = async (card: TCardData) => {
  CardDataSchema.parse(card);
  await addToList("cards", card);
};
