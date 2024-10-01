"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "./contexts/user-context";
import { getCardTransactions } from "@/helpers/firebase/database";

export default function Home() {
  const { user } = useUser();

  const { data: cardTransactions } = useQuery({
    queryKey: ["card-transactions", 9, 2024],
    queryFn: () => getCardTransactions(9, 2024),
    enabled: !!user,
  });

  if (!user) {
    return null;
  }

  if (!cardTransactions) {
    return null;
  }

  return (
    <div>
      {Object.entries(cardTransactions).map(([id, txn]) => (
        <div key={id}>
          {txn.cardId} - {txn.amount} - {new Date(txn.date).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
