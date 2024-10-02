import { TCardData, TCardTransaction } from "@/types/card";

export const getMergedCardsData = (
  cardsData: Record<string, TCardData> | undefined | null,
  cardTransactions: Record<string, TCardTransaction> | undefined
) => {
  if (!cardsData) {
    return [];
  }
  const cardTransactionMap = !cardTransactions
    ? new Map<string, TCardTransaction>()
    : Object.entries(cardTransactions).reduce<Map<string, TCardTransaction>>(
        (map, [transactionId, transaction]) => {
          map.set(transaction.cardId, transaction);
          return map;
        },
        new Map()
      );

  return Object.entries(cardsData).map(([cardId, cardDetails]) => {
    const transaction = cardTransactionMap.get(cardId);

    return {
      cardId: cardId,
      cardDetails,
      transaction,
    };
  });
};
