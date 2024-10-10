import env from "../env.mjs";
import { cert, getApps, getApp, initializeApp } from "firebase-admin/app";

/**
 * We split the credentials json that we get from firebase admin because:
 * Vercel stringifies the json and JSON.parse fails on the private key.
 *
 * SERVICE_ACCOUNT_KEY: contains the credentials json except the private_key
 * FIREBASE_PRIVATE_KEY: contains the private key
 */
const getFirebaseCredentials = () => {
  const serviceAccountKey = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);

  return cert({
    ...serviceAccountKey,
    private_key: env.FIREBASE_PRIVATE_KEY,
  });
};

export const firebaseAdmin =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: getFirebaseCredentials(),
        databaseURL: env.FIREBASE_DATABASE_URL,
        storageBucket: env.FIREBASE_STORAGE_BUCKET,
      });
