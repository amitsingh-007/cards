import { CardDataRecordSchema } from "@/types/card";
import { UserRecord } from "firebase-admin/auth";
import { DB_PATHS, fetch } from "../firebase-admin/database";

export const getAllCards = async (user: UserRecord) => {
  const cards = await fetch(DB_PATHS.CARDS, user);

  return CardDataRecordSchema.parse(cards);
};
