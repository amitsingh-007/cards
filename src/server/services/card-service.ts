import { CardDataRecordSchema } from "@/types/card";
import { UserRecord } from "firebase-admin/auth";
import { fetch } from "../firebase-admin/database";
import { DB_PATHS } from "@/types/database";

export const getAllCards = async (user: UserRecord) => {
  const cards = await fetch({ relPath: DB_PATHS.CARDS, user });
  return CardDataRecordSchema.parse(cards);
};
