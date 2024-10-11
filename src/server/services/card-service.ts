import { DB_PATHS } from "@/types/database";
import { UserRecord } from "firebase-admin/auth";
import { appendToList, fetch } from "../firebase-admin/database";
import { TCardData } from "@/types/card";

export const getAllCards = async (user: UserRecord) => {
  return fetch({ relPath: DB_PATHS.CARDS, user });
};

export const addCard = async (user: UserRecord, card: TCardData) => {
  await appendToList(user, DB_PATHS.CARDS, card);
};
