import { UserRecord } from 'firebase-admin/auth';
import { OrderByDirection, WhereFilterOp } from 'firebase-admin/firestore';
import { CardSchema, CardTransactionSchema } from './firestore';
import { z } from 'zod';

export enum COLLECTION {
  CARDS = 'cards',
  TRANSACTIONS = 'transactions',
}

export const CollectionSchema = {
  [COLLECTION.CARDS]: CardSchema,
  [COLLECTION.TRANSACTIONS]: CardTransactionSchema,
};

export type QuerySchema<T extends COLLECTION> = z.infer<
  (typeof CollectionSchema)[T]
>;

export type TCondition<T extends COLLECTION> = {
  fieldPath: Extract<keyof QuerySchema<T>, string>;
  opStr: WhereFilterOp;
  value: unknown;
};

export type TQuery<T extends COLLECTION> = {
  collection: T;
  userId: string;
  conditions?: Array<TCondition<T>>;
  orderBy?: Extract<keyof QuerySchema<T>, string>;
  orderDir?: OrderByDirection;
  startAfter?: unknown;
  limit?: number;
};
