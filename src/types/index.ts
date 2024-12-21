import { z } from 'zod';

export const CardBrandEnum = z.enum([
  'icici',
  'hdfc',
  'sbi',
  'kotak',
  'axis',
  'indusind',
  'hsbc',
  'niyo',
  'onecard',
]);
export type TCardBrand = z.infer<typeof CardBrandEnum>;
