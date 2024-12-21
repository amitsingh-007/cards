import { COLLECTION } from '@/types/database';
import { UserRecord } from 'firebase-admin/auth';
import { addToCollection, fetch } from '../firebase-admin/firestore';
import { TCardForm } from '@/types/form';

export const getAllCards = async (user: UserRecord) => {
  return fetch({ user, collection: COLLECTION.CARDS });
};

export const addCard = async (user: UserRecord, data: TCardForm) => {
  await addToCollection(user, COLLECTION.CARDS, data);
};
