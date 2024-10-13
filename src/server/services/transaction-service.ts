import { TCardTransaction, TCardTransactionForm } from '@/types/card';
import { DB_PATHS } from '@/types/database';
import { TRPCError } from '@trpc/server';
import { UserRecord } from 'firebase-admin/auth';
import { appendToList, fetch } from '../firebase-admin/database';

const getShortKey = (month: number, year: number) => `${year}-${month}`;

const getFullKey = (month: number, year: number, cardId: string) =>
  `${year}-${month}-${cardId}`;

export const getTransactionsByMonthYear = async (
  user: UserRecord,
  month: number,
  year: number
) => {
  const transactions = await fetch({
    relPath: DB_PATHS.TRANSACTIONS,
    user,
    orderByChild: '__shortKey',
    equalTo: getShortKey(month, year),
  });
  return transactions ?? {};
};

export const getPaginatedTransactions = async (
  user: UserRecord,
  cursor: number
) => {
  return fetch({
    relPath: DB_PATHS.TRANSACTIONS,
    user,
    orderByChild: 'date',
    endBefore: cursor,
    limitToLast: 5,
  });
};

export const saveTransaction = async (
  user: UserRecord,
  transaction: TCardTransactionForm
) => {
  const date = new Date(transaction.date);
  const month = date.getMonth();
  const year = date.getFullYear();
  const fullKey = getFullKey(month, year, transaction.cardId);

  const sameMonthTransaction = await fetch({
    user,
    relPath: DB_PATHS.TRANSACTIONS,
    orderByChild: '__fullKey',
    equalTo: fullKey,
    limitToFirst: 1,
  });
  if (sameMonthTransaction) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Transaction already exists for this month',
    });
  }

  const cardTransaction: TCardTransaction = {
    __shortKey: getShortKey(month, year),
    __fullKey: fullKey,
    cardId: transaction.cardId,
    amount: transaction.amount,
    date: date.getTime(),
  };
  await appendToList(user, DB_PATHS.TRANSACTIONS, cardTransaction);
};
