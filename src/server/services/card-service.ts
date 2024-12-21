import { COLLECTION } from '@/types/database';
import { UserRecord } from 'firebase-admin/auth';
import { appendToList, fetch } from '../firebase-admin/database';
import { TCardData } from '@/types/firestore';

export const getAllCards = async (user: UserRecord) => {
  return fetch({ relPath: COLLECTION.CARDS, user });
};

export const addCard = async (user: UserRecord, card: TCardData) => {
  await appendToList(user, COLLECTION.CARDS, card);
};
