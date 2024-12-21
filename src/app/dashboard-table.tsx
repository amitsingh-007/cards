'use client';

import CardName from '@/components/common/card-name';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { getCardBrand } from './add-card/constants';
import { MONTHS, YEARS } from './constants';
import { useUser } from './contexts/user-context';
import { getFormattedPrice, getMergedCardsData } from './utils';
import BillingDate from '@/components/common/billing-date';
import { trpc } from '@/trpc-client/api';
import { Skeleton } from '@/components/ui/skeleton';

const JANUARY = MONTHS[0];
const DECEMBER = MONTHS[11];
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const DahsboardTable = () => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: cardsData, isInitialLoading: isInitialCardLoading } =
    trpc.card.getAll.useQuery();
  const { data: cardTransactions, isInitialLoading: isInitialTxnLoading } =
    trpc.transaction.getByMonthYear.useQuery(
      { month: selectedMonth, year: selectedYear },
      { enabled: !!user, refetchOnMount: true }
    );

  const handlePrevMonthClick = () => {
    setSelectedMonth((prevMonth) => Math.max(prevMonth - 1, JANUARY.value));
  };

  const handleNextMonthClick = () => {
    setSelectedMonth((prevMonth) => Math.min(prevMonth + 1, DECEMBER.value));
  };

  const { monthCardsData, total } = useMemo(
    () => getMergedCardsData(cardsData, cardTransactions),
    [cardsData, cardTransactions]
  );

  const isInitialLoading = isInitialCardLoading || isInitialTxnLoading;
  return (
    <div className="sm:w-[1000px] mx-auto">
      <div className="flex justify-end items-center gap-4 mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={selectedMonth === JANUARY.value}
            onClick={handlePrevMonthClick}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={selectedMonth === DECEMBER.value}
            onClick={handleNextMonthClick}
          >
            <ChevronRight />
          </Button>
        </div>
        <Select
          value={selectedMonth.toString()}
          onValueChange={(newMonth) => setSelectedMonth(Number(newMonth))}
          disabled={isInitialLoading}
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
          disabled={isInitialLoading}
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
          {isInitialLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="p-0">
                  <Skeleton className="rounded-none h-60 sm:h-96" />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {monthCardsData.map(({ card, transaction }) => {
                const cardBrand = getCardBrand(card.cardBrand);

                return (
                  <TableRow key={card.id}>
                    <TableCell className="font-medium">
                      <CardName
                        cardBrandId={cardBrand?.id}
                        cardName={card.cardName}
                      />
                    </TableCell>
                    <TableCell>
                      <BillingDate billingDate={card.cardBillingDate} />
                    </TableCell>
                    <TableCell>
                      {getFormattedPrice(transaction?.amount)}
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
                              router.push(`/add-transaction?cardId=${card.id}`);
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
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold py-3 pl-9" colSpan={2}>
                  Total
                </TableCell>
                <TableCell colSpan={2}> {getFormattedPrice(total)}</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default DahsboardTable;
