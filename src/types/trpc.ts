import { UserRecord } from "firebase-admin/auth";

export interface ITRPCContext {
  user: UserRecord | null;
}
