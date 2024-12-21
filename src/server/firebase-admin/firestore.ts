import { UserRecord } from 'firebase-admin/auth';
import { firebaseAdmin } from '.';
import { getFirestore, Query } from 'firebase-admin/firestore';
import {
  COLLECTION,
  TQuery,
  CollectionSchema,
  QuerySchema,
} from '@/types/database';

const firestore = getFirestore(firebaseAdmin);

const getQuery = <T extends COLLECTION>({
  user,
  collection,
  conditions,
  orderBy,
  orderDir = 'asc',
  startAfter,
  limit,
}: TQuery<T>): Query => {
  let query: Query = firestore
    .collection('users')
    .doc(user.uid)
    .collection(collection);

  if (conditions) {
    conditions.forEach(({ fieldPath, opStr, value }) => {
      query = query.where(fieldPath, opStr, value);
    });
  }
  if (orderBy) {
    query = query.orderBy(orderBy, orderDir);
  }
  if (startAfter) {
    query = query.startAfter(startAfter);
  }
  if (limit && limit > 0) {
    query = query.limit(limit);
  }

  return query;
};

export const fetch = async <T extends COLLECTION>(
  args: TQuery<T>
): Promise<QuerySchema<T>[]> => {
  const result = await getQuery(args).get();
  const Schema = CollectionSchema[args.collection];
  return result.docs.map((doc) => Schema.parse(doc.data()));
};

export const fetchExists = async <T extends COLLECTION>(
  args: TQuery<T>
): Promise<boolean> => {
  const result = await getQuery(args).count().get();
  return result.data().count > 0;
};

export const addToCollection = async <T extends COLLECTION>(
  user: UserRecord,
  collection: T,
  data: Omit<QuerySchema<T>, 'id'>
) => {
  const docRef = firestore
    .collection('users')
    .doc(user.uid)
    .collection(collection)
    .doc();

  const Schema = CollectionSchema[collection];
  const dataWithId = Schema.parse({ id: docRef.id, ...data });
  await docRef.set(dataWithId);
};
