import { DB_PATHS } from "@/types/database";
import { UserRecord } from "firebase-admin/auth";
import { fetch } from "../firebase-admin/database";

export const getTransactionsByMonthYear = async (
  user: UserRecord,
  month: number,
  year: number
) => {
  return fetch({
    relPath: DB_PATHS.TRANSACTIONS,
    user,
    orderByChild: "__shortKey",
    equalTo: `${year}-${month}`,
  });
};

export const getPaginatedTransactions = async (
  user: UserRecord,
  cursor: number
) => {
  return fetch({
    relPath: DB_PATHS.TRANSACTIONS,
    user,
    orderByChild: "date",
    endBefore: cursor,
    limitToLast: 5,
  });
};
