import { DB_PATHS } from "@/types/database";
import { UserRecord } from "firebase-admin/auth";
import { fetch } from "../firebase-admin/database";

export const getAllCards = async (user: UserRecord) => {
  return fetch({ relPath: DB_PATHS.CARDS, user });
};
