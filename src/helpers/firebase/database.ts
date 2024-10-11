import {
  CardDataSchema,
  CardTransactionFormSchema,
  TCardData,
  TCardTransaction,
  TCardTransactionForm,
} from "@/types/card";
import {
  equalTo,
  get,
  getDatabase,
  limitToFirst,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import { toast } from "sonner";
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

const addToList = async <T extends Record<string, any>>(
  path: string,
  data: T
) => {
  const listRef = ref(database, getUserPath(path));
  const newCardRef = push(listRef);
  await set(newCardRef, data);
};

export const saveCard = async (card: TCardData) => {
  CardDataSchema.parse(card);
  await addToList("cards", card);
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
    toast("Transaction already exists");
  } else {
    await addToList("transactions", cardTransaction);
  }
};
