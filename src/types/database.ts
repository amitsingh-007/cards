import { UserRecord } from 'firebase-admin/auth';
import { OrderByDirection, WhereFilterOp } from 'firebase-admin/firestore';
import { CardSchema, CardTransactionSchema, TCard } from './firestore';
import { z } from 'zod';

export enum COLLECTION {
  CARDS = 'cards',
  TRANSACTIONS = 'transactions',
}

export const CollectionSchema = {
  [COLLECTION.CARDS]: CardSchema,
  [COLLECTION.TRANSACTIONS]: CardTransactionSchema,
};

type TFetchCard = {
  relPath: COLLECTION.CARDS;
  orderByChild?: keyof TCard;
};

export type TFetch = {
  user: UserRecord;
  equalTo?: string;
  endBefore?: number;
  limitToFirst?: number;
  limitToLast?: number;
} & TFetchCard;

export type TCondition<T extends COLLECTION> = {
  fieldPath: Extract<keyof z.infer<(typeof CollectionSchema)[T]>, string>;
  opStr: WhereFilterOp;
  value: unknown;
};

// TODO: rename and file also
export type TFetch1<T extends COLLECTION> = {
  collection: T;
  user: UserRecord;
  conditions?: Array<TCondition<T>>;
  orderBy?: Extract<keyof z.infer<(typeof CollectionSchema)[T]>, string>;
  orderDir?: OrderByDirection;
  startAfter?: unknown;
  limit?: number;
};
