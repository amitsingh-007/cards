import { COLLECTION, TCondition } from '@/types/database';

export const monthFilter = (
  month: number,
  year: number
): TCondition<COLLECTION.TRANSACTIONS>[] => {
  const startDate = new Date(year, month, 1).getTime();
  const endDate = new Date(year, month + 1, 1).getTime();
  return [
    {
      fieldPath: 'date',
      opStr: '>=',
      value: startDate,
    },
    {
      fieldPath: 'date',
      opStr: '<',
      value: endDate,
    },
  ];
};

export const cardFilter = (
  cardId: string
): TCondition<COLLECTION.TRANSACTIONS> => ({
  fieldPath: 'cardId',
  opStr: '==',
  value: cardId,
});
