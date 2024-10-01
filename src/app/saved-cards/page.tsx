"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getCards } from "@/helpers/firebase/database";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getCardBrand } from "../add-card/constants";
import { useUser } from "../contexts/user-context";
import { ordinalBillingDate } from "./utils";
import Image from "next/image";

export default function MyCards() {
  const { user } = useUser();

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
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {Object.entries(cardData).map(([id, card]) => {
            const cardBrand = getCardBrand(card.cardBrand);

            return (
              <Card key={id} className="max-w-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={`/brands/${cardBrand?.name}.png`} />
                    </Avatar>
                    <p>{card.cardName}</p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Image
                    src="/card-chip.png"
                    width={40}
                    height={40}
                    alt="Card chip"
                  />
                  <Image
                    src="/wireless.png"
                    width={35}
                    height={35}
                    alt="Card chip"
                    className="rotate-90"
                  />
                </CardContent>
                <CardContent className="flex items-center gap-1 tracking-[5px] text-lg font-medium">
                  <p>**** **** ****</p>
                  <p>{card.cardLastDigits}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <p className="uppercase text-lg font-semibold tracking-widest">
                    {user?.displayName}
                  </p>
                  <div className="flex gap-1 items-baseline">
                    <p className="font-medium">
                      {ordinalBillingDate(card.cardBillingDate)}
                    </p>
                    <p className="text-xs">of every month</p>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
