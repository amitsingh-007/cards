import { getDatabase, Query } from 'firebase-admin/database';
import { firebaseAdmin } from '.';
import { UserRecord } from 'firebase-admin/auth';
import { TFetch } from '@/types/database';

const database = getDatabase(firebaseAdmin);

const getUserPath = (path: string, user: UserRecord) => `${user.uid}/${path}`;

export const fetch = async ({ relPath, user, ...filters }: TFetch) => {
  const dbPath = getUserPath(relPath, user);

  let query: Query = database.ref(dbPath);
  if (filters.orderByChild) {
    query = query.orderByChild(filters.orderByChild);
  }
  if (filters.equalTo) {
    query = query.equalTo(filters.equalTo);
  }
  if (filters.endBefore) {
    query = query.endBefore(filters.endBefore);
  }
  if (filters.limitToFirst) {
    query = query.limitToFirst(filters.limitToFirst);
  }
  if (filters.limitToLast) {
    query = query.limitToLast(filters.limitToLast);
  }

  const snapshot = await query.once('value');
  return snapshot.exists() ? snapshot.val() : undefined;
};

export const appendToList = async (
  user: UserRecord,
  relPath: string,
  data: Record<string, unknown>
) => {
  const dbPath = getUserPath(relPath, user);
  await database.ref(dbPath).push(data);
};
