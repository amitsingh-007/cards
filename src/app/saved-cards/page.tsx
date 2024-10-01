"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getCards } from "@/helpers/firebase/database";
import { useQuery } from "@tanstack/react-query";

export default function MyCards() {
  const { data: cardData } = useQuery({
    queryKey: ["saved-cards"],
    queryFn: getCards,
  });

  if (!cardData) {
    return (
      <div className="flex flex-col gap-4 mt-8">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Saved cards
        </h2>
        {Object.entries(cardData).map(([id, card]) => (
          <div key={id}>{card.cardName}</div>
        ))}
      </div>
    </>
  );
}
