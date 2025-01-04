import { COLLECTION } from '@/types/database';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  revalidateTag,
} from 'next/cache';
import { monthFilter } from '../utils/transaction-filters';
import { aggregateSum, fetch } from '../firebase-admin/firestore';

/**
 * Cache keys
 */
const getTxnByMonthYearKey = (userId: string, month: number, year: number) =>
  `transactions-month-year-${userId}-${month}-${year}`;

const getMontlyTxnSumKey = (userId: string, month: number, year: number) =>
  `monthly-sum-${userId}-${month}-${year}`;

/**
 * Cache flush methods
 */
export const clearMonthYearTxnCache = (
  userId: string,
  month: number,
  year: number
) => {
  revalidateTag(getTxnByMonthYearKey(userId, month, year));
  revalidateTag(getMontlyTxnSumKey(userId, month, year));
};

/**
 * Cache methods
 */
export const getTxnByMonthYearCache = async (
  userId: string,
  month: number,
  year: number
) => {
  'use cache';
  cacheTag(getTxnByMonthYearKey(userId, month, year));
  cacheLife('max');

  return fetch({
    userId,
    collection: COLLECTION.TRANSACTIONS,
    conditions: monthFilter(month, year),
  });
};

export const getMonthTotalSumCache = async (
  userId: string,
  month: number,
  year: number
) => {
  'use cache';
  cacheTag(getMontlyTxnSumKey(userId, month, year));
  cacheLife('max');

  return await aggregateSum({
    userId,
    collection: COLLECTION.TRANSACTIONS,
    conditions: monthFilter(month, year),
  });
};
