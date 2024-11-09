import { TCardData, TCardTransaction } from '@/types/card';
import { InfiniteData } from '@tanstack/react-query';

export const getMergedCardsData = (
  cardsData: Record<string, TCardData> | undefined,
  cardTransactions: Record<string, TCardTransaction> | undefined
) => {
  if (!cardsData) {
    return { monthCardsData: [], total: 0 };
  }
  const cardTransactionMap = cardTransactions
    ? Object.entries(cardTransactions).reduce<Map<string, TCardTransaction>>(
        (map, [, transaction]) => {
          map.set(transaction.cardId, transaction);
          return map;
        },
        new Map()
      )
    : new Map<string, TCardTransaction>();

  let total = 0;
  const monthCardsData = Object.entries(cardsData)
    .map(([cardId, cardDetails]) => {
      const transaction = cardTransactionMap.get(cardId);
      total += transaction?.amount || 0;

      return {
        cardId: cardId,
        cardDetails,
        transaction,
      };
    })
    .sort(
      (a, b) => a.cardDetails.cardBillingDate - b.cardDetails.cardBillingDate
    );
  return { monthCardsData, total };
};

export const getMergedTxnData = (
  cardsData: Record<string, TCardData> | undefined,
  cardTransactions:
    | InfiniteData<Record<string, TCardTransaction> | undefined>
    | undefined
) => {
  if (!cardsData || !cardTransactions) {
    return [];
  }

  return cardTransactions.pages
    .flatMap((page) => {
      return Object.entries(page || {}).map(([transactionId, transaction]) => {
        return {
          transactionId,
          cardDetails: cardsData[transaction.cardId],
          transaction,
        };
      });
    })
    .sort((a, b) => b.transaction.date - a.transaction.date);
};

export const getFormattedPrice = (price: number | undefined) =>
  price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
      }).format(price)
    : '-';
