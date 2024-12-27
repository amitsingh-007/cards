import { COLLECTION } from '@/types/database';
import { TCardTransactionForm } from '@/types/form';
import { TRPCError } from '@trpc/server';
import { UserRecord } from 'firebase-admin/auth';
import {
  addToCollection,
  fetch,
  fetchExists,
} from '../firebase-admin/firestore';
import { MONTHS } from '@/app/constants';
import { cardFilter, monthFilter } from '../utils/transaction-filters';
import {
  clearMonthYearTxnCache,
  getMonthTotalSumCache,
  getTxnByMonthYearCache,
} from '../cache/transaction-cache';

export const getTransactionsByMonthYear = async (
  user: UserRecord,
  month: number,
  year: number
) => {
  return getTxnByMonthYearCache(user.uid, month, year);
};

export const getPaginatedTransactions = async (
  user: UserRecord,
  cursor: number
) => {
  return fetch({
    userId: user.uid,
    collection: COLLECTION.TRANSACTIONS,
    orderBy: 'date',
    orderDir: 'desc',
    startAfter: cursor,
    limit: 5,
  });
};

export const getAnnualSummary = async (user: UserRecord, year: number) => {
  const promises = MONTHS.map(async (month) => {
    const sum = await getMonthTotalSumCache(user.uid, month.value, year);
    return { month: month.label, sum };
  });
  return await Promise.all(promises);
};

export const saveTransaction = async (
  user: UserRecord,
  transaction: TCardTransactionForm
) => {
  const date = new Date(transaction.date);

  const sameMonthTxnExists = await fetchExists({
    userId: user.uid,
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

  clearMonthYearTxnCache(user.uid, date.getMonth(), date.getFullYear());
};
