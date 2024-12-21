import { UserRecord } from 'firebase-admin/auth';
import { firebaseAdmin } from '.';
import { getFirestore, Query } from 'firebase-admin/firestore';
import { COLLECTION, TFetch1, CollectionSchema } from '@/types/database';
import { z } from 'zod';

const firestore = getFirestore(firebaseAdmin);

export const fetch = async <T extends COLLECTION>({
  user,
  collection,
  conditions,
  orderBy,
  orderDir = 'asc',
  startAfter,
  limit,
}: TFetch1<T>): Promise<z.infer<(typeof CollectionSchema)[T]>[]> => {
  let ref: Query = firestore
    .collection('users')
    .doc(user.uid)
    .collection(collection);

  if (conditions) {
    conditions.forEach(({ fieldPath, opStr, value }) => {
      ref = ref.where(fieldPath, opStr, value);
    });
  }
  if (orderBy) {
    ref = ref.orderBy(orderBy, orderDir);
  }
  if (startAfter) {
    ref = ref.startAfter(startAfter);
  }
  if (limit && limit > 0) {
    ref = ref.limit(limit);
  }

  const result = await ref.get();
  const Schema = CollectionSchema[collection];
  return result.docs.map((doc) => Schema.parse(doc.data()));
};

export const addToCollection = async <T extends COLLECTION>(
  user: UserRecord,
  collection: T,
  // TODO: create utility
  data: Omit<z.infer<(typeof CollectionSchema)[T]>, 'id'>
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
