'use client';

import BillingDate from '@/components/common/billing-date';
import CardName from '@/components/common/card-name';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/trpc-client/api';
import { Nfc } from 'lucide-react';
import { useMemo } from 'react';
import { getCardBrand } from '../add-card/constants';
import { useUser } from '../contexts/user-context';
import CardChip from './card-chip';

export default function MyCards() {
  const { user } = useUser();

  const { data: cards, isLoading } = trpc.card.getAll.useQuery();

  const sortedCards = useMemo(() => {
    if (!cards) {
      return [];
    }
    return cards.sort((a, b) => a.cardName.localeCompare(b.cardName));
  }, [cards]);

  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Saved cards
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <Card key={index} className="max-w-md">
                <Skeleton className="rounded-xl h-[210px]" />
              </Card>
            ))
          : sortedCards.map((card) => {
              const cardBrand = getCardBrand(card.cardBrand);

              return (
                <Card key={card.id} className="max-w-md">
                  <CardHeader className="pb-4">
                    <CardTitle>
                      <CardName
                        cardBrandId={cardBrand?.id}
                        cardName={card.cardName}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between pb-4">
                    <CardChip className="h-9" />
                    <Nfc className="h-6" />
                  </CardContent>
                  <CardContent className="flex items-center gap-1 tracking-[5px] text-lg font-medium pb-4">
                    **** **** **** {card.cardLastDigits}
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <p className="uppercase text-lg font-semibold tracking-widest">
                      {user?.displayName}
                    </p>
                    <BillingDate
                      billingDate={card.cardBillingDate}
                      ordinalClassName="font-medium"
                    />
                  </CardFooter>
                </Card>
              );
            })}
      </div>
    </>
  );
}
