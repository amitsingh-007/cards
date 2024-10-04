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
  orderByKey,
  startAfter,
  startAt,
  endBefore,
  limitToLast,
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

const checkIfKeyDataExists = async (
  path: string,
  key: string,
  value: string
) => {
  const cardTxnQuery = query(
    ref(database, getUserPath(path)),
    orderByChild(key),
    equalTo(value),
    limitToFirst(1)
  );
  const snapshot = await get(cardTxnQuery);
  return snapshot.exists();
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
    orderByChild("__shortKey"),
    equalTo(`${year}-${month}`)
  );
  const snapshot = await get(cardTxnQuery);
  return snapshot.exists() ? snapshot.val() : null;
};

export const getCardTransactionsInfinite = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<Record<string, TCardTransaction> | null> => {
  const cardTxnQuery = query(
    ref(database, getUserPath("transactions")),
    orderByChild("date"),
    endBefore(pageParam),
    limitToLast(2)
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
    __shortKey: `${date.getFullYear()}-${date.getMonth()}`,
    __fullKey: `${date.getFullYear()}-${date.getMonth()}-${
      cardTransactionData.cardId
    }`,
    cardId: cardTransactionData.cardId,
    amount: cardTransactionData.amount,
    date: date.getTime(),
  };

  const alreadyExists = await checkIfKeyDataExists(
    "transactions",
    "__fullKey",
    `${date.getFullYear()}-${date.getMonth()}-${cardTransactionData.cardId}`
  );
  if (alreadyExists) {
    throw new Error("Transaction already exists");
  }
  await addToList("transactions", cardTransaction);
};
