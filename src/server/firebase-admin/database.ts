import { getDatabase, Query } from "firebase-admin/database";
import { firebaseAdmin } from ".";
import { UserRecord } from "firebase-admin/auth";
import { TFetch } from "@/types/database";

const database = getDatabase(firebaseAdmin);

const getUserPath = (path: string, user: UserRecord) => `${user.uid}/${path}`;

export const fetch = async ({
  relPath,
  user,
  orderByChild,
  equalTo,
}: TFetch): Promise<unknown> => {
  const dbPath = getUserPath(relPath, user);
  let query: Query = database.ref(dbPath);
  if (orderByChild) {
    query = query.orderByChild(orderByChild);
  }
  if (equalTo) {
    query = query.equalTo(equalTo);
  }
  const snapshot = await query.once("value");
  return snapshot.exists() ? snapshot.val() : {};
};
