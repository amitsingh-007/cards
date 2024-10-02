"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCards, getCardTransactions } from "@/helpers/firebase/database";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getCardBrand } from "./add-card/constants";
import { MONTHS, YEARS } from "./constants";
import { useUser } from "./contexts/user-context";
import { ordinalBillingDate } from "./saved-cards/utils";
import { getMergedCardsData } from "./utils";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: cardsData } = useQuery({
    queryKey: ["saved-cards"],
    queryFn: getCards,
    enabled: !!user,
  });
  const { data: cardTransactions } = useQuery({
    queryKey: ["card-transactions", selectedMonth, selectedYear],
    queryFn: () => getCardTransactions(selectedMonth, selectedYear),
    enabled: !!user,
  });

  const mergedCardData = useMemo(
    () => getMergedCardsData(cardsData, cardTransactions),
    [cardsData, cardTransactions]
  );

  if (!user) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Dashboard
      </h2>
      <div className="flex justify-end items-center gap-4 mt-6">
        <Select
          value={selectedMonth.toString()}
          onValueChange={(newMonth) => setSelectedMonth(Number(newMonth))}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month) => (
              <SelectItem key={month.label} value={month.value.toString()}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedYear.toString()}
          onValueChange={(newYear) => setSelectedYear(Number(newYear))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Card</TableHead>
              <TableHead>Billing date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mergedCardData.map(({ cardId, cardDetails, transaction }) => {
              const cardBrand = getCardBrand(cardDetails.cardBrand);

              return (
                <TableRow key={cardId}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={`/brands/${cardBrand?.id}.png`} />
                      </Avatar>
                      <span className="accent">{cardDetails.cardName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 items-baseline">
                      {ordinalBillingDate(cardDetails.cardBillingDate)}
                      <p className="text-xs hidden sm:block">of every month</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {transaction
                      ? `${new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "INR",
                        }).format(transaction.amount)}`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          disabled={!!transaction}
                          onClick={() => {
                            router.push(`/add-transaction?cardId=${cardId}`);
                          }}
                        >
                          Record transaction
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
