import { getAuth } from 'firebase-admin/auth';
import { firebaseAdmin } from '.';

const auth = getAuth(firebaseAdmin);

export const getFirebaseUser = (uid: string) => auth.getUser(uid);

export const verifyAuthToken = (idToken: string, checkRevoked?: boolean) =>
  auth.verifyIdToken(idToken, checkRevoked);
