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
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { getCardBrand } from './add-card/constants';
import { MONTHS, YEARS } from './constants';
import { useUser } from './contexts/user-context';
import { getFormattedPrice, getMergedCardsData } from './utils';
import BillingDate from '@/components/common/billing-date';
import { trpc } from '@/trpc-client/api';
import { Skeleton } from '@/components/ui/skeleton';

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

  const monthCardsData = useMemo(
    () => getMergedCardsData(cardsData, cardTransactions),
    [cardsData, cardTransactions]
  );

  const isInitialLoading = isInitialCardLoading || isInitialTxnLoading;
  return (
    <div className="sm:w-[1000px] mx-auto">
      <div className="flex justify-end items-center gap-4 mt-6">
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
                  <Skeleton className="rounded-none h-32 sm:h-96" />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {monthCardsData.map(({ cardId, cardDetails, transaction }) => {
                const cardBrand = getCardBrand(cardDetails.cardBrand);

                return (
                  <TableRow key={cardId}>
                    <TableCell className="font-medium">
                      <CardName
                        cardBrandId={cardBrand?.id}
                        cardName={cardDetails.cardName}
                      />
                    </TableCell>
                    <TableCell>
                      <BillingDate billingDate={cardDetails.cardBillingDate} />
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
          )}
        </Table>
      </div>
    </div>
  );
};

export default DahsboardTable;
