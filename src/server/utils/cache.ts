export const getMontlySumCacheKey = (
  userId: string,
  month: number,
  year: number
) => {
  return `monthly-sum-${userId}-${month}-${year}`;
};
