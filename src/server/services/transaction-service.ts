import { CardTransactionRecordSchema } from "@/types/card";
import { UserRecord } from "firebase-admin/auth";
import { fetch } from "../firebase-admin/database";
import { DB_PATHS } from "@/types/database";

export const getTransactionsByMonthYear = async (
  user: UserRecord,
  month: number,
  year: number
) => {
  const transactions = await fetch({
    relPath: DB_PATHS.TRANSACTIONS,
    user,
    orderByChild: "__shortKey",
    equalTo: `${year}-${month}`,
  });
  return CardTransactionRecordSchema.parse(transactions);
};
