import { TCardData, TCardTransaction } from '@/types/firestore';
import { InfiniteData } from '@tanstack/react-query';

export const getMergedCardsData = (
  cardsData: Record<string, TCardData> | undefined,
  cardTransactions: TCardTransaction[] | undefined
) => {
  if (!cardsData) {
    return { monthCardsData: [], total: 0 };
  }
  const cardTransactionMap = cardTransactions?.length
    ? new Map(cardTransactions.map((txn) => [txn.cardId, txn]))
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
  cardTransactions: InfiniteData<TCardTransaction[] | undefined> | undefined
) => {
  if (!cardsData || !cardTransactions) {
    return [];
  }

  return cardTransactions.pages
    .flatMap((page) => {
      if (!page?.length) {
        return [];
      }
      return page.map((transaction) => {
        return {
          transactionId: transaction.id,
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
