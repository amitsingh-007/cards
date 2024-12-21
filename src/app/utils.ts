import { TCard, TCardTransaction } from '@/types/firestore';
import { InfiniteData } from '@tanstack/react-query';

export const getMergedCardsData = (
  cards: TCard[] | undefined,
  cardTransactions: TCardTransaction[] | undefined
) => {
  if (!cards?.length) {
    return { monthCardsData: [], total: 0 };
  }
  const cardTransactionMap = cardTransactions?.length
    ? new Map(cardTransactions.map((txn) => [txn.cardId, txn]))
    : new Map<string, TCardTransaction>();

  let total = 0;
  const monthCardsData = cards
    .map((card) => {
      const transaction = cardTransactionMap.get(card.id);
      total += transaction?.amount || 0;

      return { card, transaction };
    })
    .sort((a, b) => a.card.cardBillingDate - b.card.cardBillingDate);
  return { monthCardsData, total };
};

export const getMergedTxnData = (
  cards: TCard[] | undefined,
  cardTransactions: InfiniteData<TCardTransaction[] | undefined> | undefined
) => {
  if (!cards?.length || !cardTransactions) {
    return [];
  }

  const cardsMap = Object.fromEntries(cards.map((card) => [card.id, card]));

  return cardTransactions.pages
    .flatMap((page) => {
      if (!page?.length) {
        return [];
      }
      return page.map((transaction) => {
        return {
          cardDetails: cardsMap[transaction.cardId],
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
