import { getDatabase } from "firebase-admin/database";
import { firebaseAdmin } from ".";
import { UserRecord } from "firebase-admin/auth";

const database = getDatabase(firebaseAdmin);

const getUserPath = (path: string, user: UserRecord) => `${user.uid}/${path}`;

export enum DB_PATHS {
  CARDS = "cards",
}

export const fetch = async (
  relPath: string,
  user: UserRecord
): Promise<unknown> => {
  const dbPath = getUserPath(relPath, user);
  const snapshot = await database.ref(dbPath).once("value");
  return snapshot.exists() ? snapshot.val() : {};
};
