import { UserRecord } from "firebase-admin/auth";
import { TCardData, TCardTransaction } from "./card";

export enum DB_PATHS {
  CARDS = "cards",
  TRANSACTIONS = "transactions",
}

type TFetchCard = {
  relPath: DB_PATHS.CARDS;
  orderByChild?: keyof TCardData;
};

type TFetchTransaction = {
  relPath: DB_PATHS.TRANSACTIONS;
  orderByChild?: keyof TCardTransaction;
};

export type TFetch = {
  relPath: string;
  user: UserRecord;
  equalTo?: string;
} & (TFetchCard | TFetchTransaction);