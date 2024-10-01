import {
  getDatabase,
  ref,
  push,
  get,
  child,
  set,
  query,
  equalTo,
  orderByChild,
  limitToFirst,
} from "firebase/database";
import {
  CardDataSchema,
  CardTransactionFormSchema,
  TCardData,
  TCardTransaction,
  TCardTransactionForm,
} from "@/types/card";
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

export const getCardTransactions = async (
  month: number,
  year: number
): Promise<Record<string, TCardTransaction>> => {
  const cardTxnQuery = query(
    ref(database, getUserPath("transactions")),
    orderByChild("__key"),
    equalTo(`${year}-${month}`)
  );
  const snapshot = await get(cardTxnQuery);
  return snapshot.exists() ? snapshot.val() : null;
};

export const saveCardTransaction = async (
  cardTransactionData: TCardTransactionForm
) => {
  CardTransactionFormSchema.parse(cardTransactionData);

  const date = new Date(cardTransactionData.date);
  const cardTransaction: TCardTransaction = {
    __key: `${date.getFullYear()}-${date.getMonth()}`,
    cardId: cardTransactionData.cardId,
    amount: cardTransactionData.amount,
    date: date.getTime(),
  };
  await addToList("transactions", cardTransaction);
};
