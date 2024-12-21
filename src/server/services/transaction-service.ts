import { COLLECTION, TCondition } from '@/types/database';
import { TCardTransactionForm } from '@/types/form';
import { TRPCError } from '@trpc/server';
import { UserRecord } from 'firebase-admin/auth';
import {
  addToCollection,
  fetch,
  fetchExists,
} from '../firebase-admin/firestore';

const monthFilter = (
  month: number,
  year: number
): TCondition<COLLECTION.TRANSACTIONS>[] => {
  const startDate = new Date(year, month, 1).getTime();
  const endDate = new Date(year, month + 1, 1).getTime();
  return [
    {
      fieldPath: 'date',
      opStr: '>=',
      value: startDate,
    },
    {
      fieldPath: 'date',
      opStr: '<',
      value: endDate,
    },
  ];
};

const cardFilter = (cardId: string): TCondition<COLLECTION.TRANSACTIONS> => ({
  fieldPath: 'cardId',
  opStr: '==',
  value: cardId,
});

export const getTransactionsByMonthYear = async (
  user: UserRecord,
  month: number,
  year: number
) => {
  return fetch({
    user,
    collection: COLLECTION.TRANSACTIONS,
    conditions: monthFilter(month, year),
  });
};

export const getPaginatedTransactions = async (
  user: UserRecord,
  cursor: number
) => {
  return fetch({
    user,
    collection: COLLECTION.TRANSACTIONS,
    orderBy: 'date',
    orderDir: 'desc',
    startAfter: cursor,
    limit: 5,
  });
};

export const saveTransaction = async (
  user: UserRecord,
  transaction: TCardTransactionForm
) => {
  const date = new Date(transaction.date);

  const sameMonthTxnExists = await fetchExists({
    user,
    collection: COLLECTION.TRANSACTIONS,
    conditions: [
      ...monthFilter(date.getMonth(), date.getFullYear()),
      cardFilter(transaction.cardId),
    ],
    limit: 1,
  });
  if (sameMonthTxnExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Transaction already exists for this month',
    });
  }

  await addToCollection(user, COLLECTION.TRANSACTIONS, transaction);
};
